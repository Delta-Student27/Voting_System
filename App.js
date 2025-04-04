import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import fs from 'fs-extra';
import User from './Models/User.js';
import faceapi from 'face-api.js';
import canvas from 'canvas';
import MongoStore from 'connect-mongo';
import path from 'path';

dotenv.config();

const app = express();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

// Session and Passport setup with MongoDB session store
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGO_URL })
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to DB:", error.message);
        process.exit(1);
    }
}

// Multer Storage (for image uploads)
const upload = multer({ dest: 'uploads/' });

// Routes
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the voting system API" });
});

// 📌 Face Recognition-based Registration
app.post('/register', upload.none(), async (req, res) => {
    const { username, password, faceImage } = req.body;
    if (!username || !password || !faceImage) {
        return res.status(400).send("All fields are required.");
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send("Username already exists. Please choose a different one.");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const newUser = new User({ username, password: hashedPassword, faceImage });
        await newUser.save();

        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).send("Error creating user: " + error.message);
    }
});

// 📌 Face Authentication-based Login
app.post('/login', upload.none(), async (req, res) => {
    const { username, password, faceImage } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send("Invalid credentials.");
    }

    // Load Face API Models
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(path.resolve('models'));
    await faceapi.nets.faceRecognitionNet.loadFromDisk(path.resolve('models'));
    await faceapi.nets.faceLandmark68Net.loadFromDisk(path.resolve('models'));

    // Convert Base64 images to Canvas
    const img1 = await canvas.loadImage(faceImage);
    const img2 = await canvas.loadImage(user.faceImage);

    const face1 = await faceapi.detectSingleFace(img1).withFaceLandmarks().withFaceDescriptor();
    const face2 = await faceapi.detectSingleFace(img2).withFaceLandmarks().withFaceDescriptor();

    if (!face1 || !face2) {
        return res.status(400).send("Face not recognized. Try again.");
    }

    // Compare Faces
    const distance = faceapi.euclideanDistance(face1.descriptor, face2.descriptor);
    if (distance > 0.6) { // Adjust threshold if needed
        return res.status(400).send("Face authentication failed.");
    }

    req.session.user = user;
    res.json({ message: "Login successful", user });
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logged out successfully" });
    });
});

// ✅ New Route to Fetch Users Data
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start Server
async function startServer() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}...`);
    });
}

startServer();

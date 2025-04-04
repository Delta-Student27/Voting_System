import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    faceImage: { type: String, required: true } // Store base64 image
});

const User = mongoose.model('User', UserSchema);
export default User;

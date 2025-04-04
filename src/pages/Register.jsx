import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";

function Register() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
    };
    loadModels();
  }, []);
  
  const startCamera = async () => {
    setIsCapturing(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };
  
  const captureFace = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.width, height: video.height };
    
    faceapi.matchDimensions(canvas, displaySize);
    const detections = await faceapi.detectSingleFace(video).withFaceLandmarks().withFaceDescriptor();
    
    if (detections) {
      localStorage.setItem("registeredFace", JSON.stringify(detections.descriptor));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setIsCapturing(false);
    } else {
      alert("No face detected. Try again.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/dashboard"); // Redirect to Dashboard after registration
  };

  return (
    <div 
      className="relative flex items-center justify-center min-h-screen p-6"
      style={{
        backgroundImage: "url('/images/voting-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/40 via-blue-500/30 to-white/20"></div>

      <div className="relative z-10 bg-white/90 p-8 shadow-lg rounded-2xl w-96 transform transition-all hover:scale-105">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required 
            />
          </div>
          
          <div className="mb-4 text-center">
            <video ref={videoRef} autoPlay muted className="mx-auto w-40 h-40 border border-gray-300 rounded-lg" />
            <canvas ref={canvasRef} className="hidden" />
            {!isCapturing ? (
              <button type="button" onClick={startCamera} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Start Face Capture
              </button>
            ) : (
              <button type="button" onClick={captureFace} className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Save Captured Face
              </button>
            )}
          </div>

          {showSuccess && (
            <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md flex items-center">
              <span className="mr-2">✅</span> Face captured successfully!
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold transition-all">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

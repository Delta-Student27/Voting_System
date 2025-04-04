import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div 
      className="relative flex flex-col items-center justify-center min-h-screen text-center p-6"
      style={{
        backgroundImage: "url('/images/voting-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Faint Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/40 via-blue-500/30 to-white/20"></div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-5xl font-extrabold text-white drop-shadow-lg">
          "Your Vote, Your Voice, Your Power!"
        </h2>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl drop-shadow-sm ">
          Every vote counts in shaping the future. Be a responsible citizen, 
          make your voice heard, and participate in building a better democracy.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;

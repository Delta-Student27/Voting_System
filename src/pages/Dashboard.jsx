function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 text-white p-6">
      
      {/* Welcome Message */}
      <h2 className="text-5xl font-extrabold mb-6 drop-shadow-md">
        Welcome to the Voting Dashboard 🗳️
      </h2>
      
      <p className="text-lg max-w-2xl text-center text-black font-medium drop-shadow-sm">
        Stay updated with the latest election information. Cast your vote and shape the future!
      </p>

      {/* Election Info Section */}
      <div className="mt-8 w-3/4 text-white">
        
        <h3 className="text-3xl font-semibold text-center mb-4">
          🏛️ Current Elections
        </h3>

        <ul className="mt-4 space-y-4">
          <li className="flex items-center p-4 bg-green-500 bg-opacity-80 rounded-lg shadow-sm">
            <span className="text-white text-lg font-semibold">✔️ Presidential Elections</span>
            <span className="ml-auto bg-green-700 text-white px-4 py-1 rounded-full text-sm">Ongoing</span>
          </li>

          <li className="flex items-center p-4 bg-yellow-500 bg-opacity-80 rounded-lg shadow-sm">
            <span className="text-white text-lg font-semibold">✔️ Local Body Elections</span>
            <span className="ml-auto bg-yellow-700 text-white px-4 py-1 rounded-full text-sm">Upcoming</span>
          </li>

          <li className="flex items-center p-4 bg-gray-400 bg-opacity-80 rounded-lg shadow-sm">
            <span className="text-white text-lg font-semibold">✔️ Referendum Voting</span>
            <span className="ml-auto bg-gray-700 text-white px-4 py-1 rounded-full text-sm">Completed</span>
          </li>
        </ul>
      </div>

      {/* Call to Action */}
      <button className="mt-8 px-6 py-3 bg-blue-700 text-white font-semibold rounded-full shadow-lg hover:bg-blue-800 transition duration-300">
        Cast Your Vote Now!
      </button>
    </div>
  );
}

export default Dashboard;

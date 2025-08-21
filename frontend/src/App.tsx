export default function App() {

  const handlePlay = () => {
    window.location.href = ("/play");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="bg-gray-900 p-16 rounded-3xl shadow-2xl w-full max-w-lg text-center border border-gray-700">
        <h1 className="text-6xl font-extrabold text-white mb-10 tracking-wide">Give Answer First</h1>
        <p className="text-gray-400 text-lg mb-10">
          Challenge yourself and play against other players.
        </p>
        <button
          onClick={handlePlay}
          className="px-12 py-5 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-2xl shadow-md transition transform hover:-translate-y-1 hover:scale-105"
        >
          Play Now
        </button>
      </div>
    </div>
  );
}

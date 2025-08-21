export default function NoPage() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-white mb-6">404</h1>
        <p className="text-gray-400 text-xl mb-8">
          Oops! Page not found.
        </p>
        <button
          onClick={() => window.location.href = ("/")}
          className="px-10 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-2xl shadow-md transition transform hover:-translate-y-1 hover:scale-105"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
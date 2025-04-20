const ComingSoonCard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-transparent transition-colors duration-300">
      {/* Coming Soon Card */}
      <div className="w-96 p-8 rounded-lg shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        {/* Icon or Badge */}
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900">
            <svg
              className="w-8 h-8 text-blue-600 dark:text-blue-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
          Coming Soon
        </h2>

        {/* Description */}
        <p className="text-center mb-6 text-slate-600 dark:text-slate-300">
          We're working on something awesome. Stay tuned for updates!
        </p>

        {/* Subscribe/Notify Button */}
        <button className="w-full py-3 rounded-lg text-white font-medium transition-colors duration-300 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
          Keep Checking Out
        </button>

        {/* Optional: Coming Soon Badge */}
        <div className="mt-6 flex justify-center">
          <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
            Launching Soon
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonCard;

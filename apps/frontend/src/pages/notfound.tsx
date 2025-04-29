import { useState } from "react";
import { motion } from "motion/react";

const NotFoundPage = () => {
  const [blame, setBlame] = useState<null | "backend" | "frontend">(null);

  const blameBackend = () => {
    setBlame("backend");
  };

  const blameFrontend = () => {
    setBlame("frontend");
  };

  const resetBlame = () => {
    setBlame(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-6xl font-bold text-red-500 mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
        >
          404
        </motion.h1>

        <motion.div
          initial={{ rotateZ: 0 }}
          animate={{ rotateZ: [0, -2, 2, -2, 0] }}
          transition={{ repeat: Infinity, repeatType: "loop", duration: 5 }}
        >
          <h2 className="text-3xl font-semibold mb-6">Oops! Page Not Found</h2>
        </motion.div>

        {blame === null && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xl mb-6">
              We looked everywhere but couldn't find that page! Who should we
              blame?
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              <motion.button
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
                whileTap={{ scale: 0.95 }}
                onClick={blameBackend}
              >
                Blame Backend Dev
              </motion.button>

              <motion.button
                className="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: "#7e22ce" }}
                whileTap={{ scale: 0.95 }}
                onClick={blameFrontend}
              >
                Blame Frontend Dev
              </motion.button>
            </div>
          </motion.div>
        )}

        {blame === "backend" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <motion.p
              className="text-xl mb-6"
              animate={{ x: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-blue-600 font-bold">
                Definitely the backend's fault!
              </span>
              <br />
              They probably deleted the API endpoint or misconfigured the
              server.
              <br />
              Classic backend move.
            </motion.p>

            <motion.div
              className="mx-auto w-64 h-64 bg-blue-100 rounded-full flex items-center justify-center mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="text-6xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💻
              </motion.div>
            </motion.div>

            <motion.button
              className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium shadow-lg"
              whileHover={{ scale: 1.05, backgroundColor: "#374151" }}
              whileTap={{ scale: 0.95 }}
              onClick={resetBlame}
            >
              Go Back
            </motion.button>
          </motion.div>
        )}

        {blame === "frontend" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <motion.p
              className="text-xl mb-6"
              animate={{ x: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-purple-600 font-bold">
                Frontend developers are to blame!
              </span>
              <br />
              They probably coded a broken link or messed up the routing.
              <br />
              Typical frontend oversight.
            </motion.p>

            <motion.div
              className="mx-auto w-64 h-64 bg-purple-100 rounded-full flex items-center justify-center mb-6"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <motion.div
                className="text-6xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🎨
              </motion.div>
            </motion.div>

            <motion.button
              className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium shadow-lg"
              whileHover={{ scale: 1.05, backgroundColor: "#374151" }}
              whileTap={{ scale: 0.95 }}
              onClick={resetBlame}
            >
              Go Back
            </motion.button>
          </motion.div>
        )}

        <motion.a
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-green-500 text-white rounded-lg font-medium shadow-lg"
          whileHover={{ scale: 1.05, backgroundColor: "#059669" }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Home
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;

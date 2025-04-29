import { Video } from "lucide-react";

const YoutubeComingSoon = () => {
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-red-600 dark:bg-red-700 p-6 text-center">
        <Video className="mx-auto text-white" size={60} />
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-black dark:text-white">
          YouTube Feature Coming Soon!
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          We're working hard to bring you an amazing YouTube integration. Stay
          tuned for video playback, channel subscriptions, and more!
        </p>

        {/* Button removed as per updated code */}
      </div>

      <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4">
        <p className="text-sm text-gray-500 dark:text-gray-300 text-center">
          Coming Soon
        </p>
      </div>
    </div>
  );
};

export default YoutubeComingSoon;

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react"; 
import { FilesTab } from "@/pages/sources/sourcesComponents/content-tabs/files-tab";
import { ImagesTab } from "@/pages/sources/sourcesComponents/content-tabs/images-tab";
import { TextNoteTab } from "@/pages/sources/sourcesComponents/content-tabs/text-node-tab";
import { TweetsTab } from "@/pages/sources/sourcesComponents/content-tabs/tweets-tab";
import { WebsitesTab } from "@/pages/sources/sourcesComponents/content-tabs/websites-tab";
import { YouTubeTab } from "@/pages/sources/sourcesComponents/content-tabs/youtube-tab";
import {
  ArrowLeftIcon,
  FileIcon,
  FileTextIcon,
  ImageIcon,
  LinkIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";

const LinkSection2 = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: "youtube",
      title: "YouTube Videos",
      icon: <YoutubeIcon className="h-6 w-6" />,
      color: "bg-red-100 hover:bg-red-200",
      iconColor: "text-red-500",
      component: <YouTubeTab />,
    },
    {
      id: "files",
      title: "Files",
      icon: <FileIcon className="h-6 w-6" />,
      color: "bg-blue-100 hover:bg-blue-200",
      iconColor: "text-blue-500",
      component: <FilesTab />,
    },
    {
      id: "images",
      title: "Images",
      icon: <ImageIcon className="h-6 w-6" />,
      color: "bg-green-100 hover:bg-green-200",
      iconColor: "text-green-500",
      component: <ImagesTab />,
    },
    {
      id: "tweets",
      title: "Tweets",
      icon: <TwitterIcon className="h-6 w-6" />,
      color: "bg-sky-100 hover:bg-sky-200",
      iconColor: "text-sky-500",
      component: <TweetsTab />,
    },
    {
      id: "notes",
      title: "Text Notes",
      icon: <FileTextIcon className="h-6 w-6" />,
      color: "bg-amber-100 hover:bg-amber-200",
      iconColor: "text-amber-500",
      component: <TextNoteTab />,
    },
    {
      id: "websites",
      title: "Websites & Articles",
      icon: <LinkIcon className="h-6 w-6" />,
      color: "bg-purple-100 hover:bg-purple-200",
      iconColor: "text-purple-500",
      component: <WebsitesTab />,
    },
  ];

  const handleCardClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleBack = () => {
    setActiveSection(null);
  };

  return (
    <motion.div layout className="h-full w-full p-5">
      <AnimatePresence mode="wait">
        {activeSection === null ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {sections.map((section) => (
              <motion.div
                key={section.id}
                className={`cursor-pointer rounded-lg p-6 ${section.color} shadow-md flex flex-col items-center justify-center text-center`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCardClick(section.id)}
              >
                <motion.div 
                  className={`mb-3 ${section.iconColor}`}
                  layoutId={`icon-${section.id}`}
                >
                  {section.icon}
                </motion.div>
                <motion.h3 
                  className="font-medium" 
                  layoutId={`title-${section.id}`}
                >
                  {section.title}
                </motion.h3>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4 flex items-center gap-2 rounded-lg px-3 py-2 bg-gray-100 hover:bg-gray-200"
              onClick={handleBack}
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to all sources
            </motion.button>
            
            <div className="flex items-center mb-6 gap-3">
              <motion.div 
                layoutId={`icon-${activeSection}`} 
                className={sections.find(s => s.id === activeSection)?.iconColor}
              >
                {sections.find(s => s.id === activeSection)?.icon}
              </motion.div>
              <motion.h2 
                layoutId={`title-${activeSection}`}
                className="text-xl font-semibold"
              >
                {sections.find(s => s.id === activeSection)?.title}
              </motion.h2>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="h-[calc(100%-6rem)]"
            >
              {sections.find((section) => section.id === activeSection)?.component}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LinkSection2;
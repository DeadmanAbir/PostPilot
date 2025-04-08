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
      icon: <YoutubeIcon className="size-14" />,
      color: "bg-red-50 hover:bg-red-100 border-dotted border-red-700 border-2",
      iconColor: "text-red-500",
      component: <YouTubeTab />,
    },
    {
      id: "files",
      title: "Files",
      icon: <FileIcon className="size-14" />,
      color: "bg-blue-50 hover:bg-blue-100 border-dotted border-blue-700 border-2",
      iconColor: "text-blue-500",
      component: <FilesTab />,
    },
    {
      id: "images",
      title: "Images",
      icon: <ImageIcon className="size-14" />,
      color: "bg-green-50 hover:bg-green-100 border-dotted border-green-700 border-2",
      iconColor: "text-green-500",
      component: <ImagesTab />,
    },
    {
      id: "tweets",
      title: "Tweets",
      icon: <TwitterIcon className="size-14" />,
      color: "bg-sky-50 hover:bg-sky-100 border-dotted border-sky-700 border-2",
      iconColor: "text-sky-500",
      component: <TweetsTab />,
    },
    {
      id: "notes",
      title: "Text Notes",
      icon: <FileTextIcon className="size-14" />,
      color: "bg-amber-50 hover:bg-amber-100 border-dotted border-amber-700 border-2",
      iconColor: "text-amber-500",
      component: <TextNoteTab />,
    },
    {
      id: "websites",
      title: "Websites & Articles",
      icon: <LinkIcon className="size-14" />,
      color: "bg-purple-50 hover:bg-purple-100 border-dotted border-purple-700 border-2",
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
            className="grid grid-cols-2 md:grid-cols-3 gap-4 h-[80vh]"
          >
            {sections.map((section) => (
              <motion.div
                key={section.id}
                className={`cursor-pointer rounded-xl p-6 ${section.color} shadow-inner h-full flex flex-col items-center justify-center text-center`}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCardClick(section.id)}
              >
                <motion.div 
                  className={`mb-3 ${section.iconColor} `}
                  layoutId={`icon-${section.id}`}
                >
                  {section.icon}
                </motion.div>
                <motion.h3 
                  className="font-medium text-2xl" 
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
              className="mb-4 flex items-center gap-2 rounded-lg px-3 py-2 "
              onClick={handleBack}
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
                className="text-3xl font-semibold"
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
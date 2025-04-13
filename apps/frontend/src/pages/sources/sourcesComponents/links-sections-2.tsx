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
import { CardStack } from "./cards/stacking-cards";
import { Highlight } from "@/utils/highlight";

const LinkSection2 = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: "youtube",
      title: "YouTube Videos",
      icon: <YoutubeIcon className="size-14" />,
      iconColor: "text-red-500",
      component: <YouTubeTab />,
      cards : [
        {
          id: 0,
          name: "Manu Arora",
          designation: "Senior Software Engineer",
          content: (
            <p>
              These cards are amazing, <Highlight>I want to use them</Highlight> in my
              project. Framer motion is a godsend ngl tbh fam 🙏
            </p>
          ),
        },
        {
          id: 1,
          name: "Elon Musk",
          designation: "Senior Shitposter",
          content: (
            <p>
              I dont like this Twitter thing,{" "}
              <Highlight>deleting it right away</Highlight> because yolo. Instead, I
              would like to call it <Highlight>X.com</Highlight> so that it can easily
              be confused with adult sites.
            </p>
          ),
        },
        {
          id: 2,
          name: "Tyler Durden",
          designation: "Manager Project Mayhem",
          content: (
            <p>
              The first rule of
              <Highlight>Fight Club</Highlight> is that you do not talk about fight
              club. The second rule of
              <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
              club.
            </p>
          ),
        },
      ]
    },
    {
      id: "files",
      title: "Files",
      icon: <FileIcon className="size-14" />,
      iconColor: "text-blue-500",
      component: <FilesTab />,
      cards : [
        {
          id: 0,
          name: "Manu Arora",
          designation: "Senior Software Engineer",
          content: (
            <p>
              These cards are amazing, <Highlight>I want to use them</Highlight> in my
              project. Framer motion is a godsend ngl tbh fam 🙏
            </p>
          ),
        },
        {
          id: 1,
          name: "Elon Musk",
          designation: "Senior Shitposter",
          content: (
            <p>
              I dont like this Twitter thing,{" "}
              <Highlight>deleting it right away</Highlight> because yolo. Instead, I
              would like to call it <Highlight>X.com</Highlight> so that it can easily
              be confused with adult sites.
            </p>
          ),
        },
        {
          id: 2,
          name: "Tyler Durden",
          designation: "Manager Project Mayhem",
          content: (
            <p>
              The first rule of
              <Highlight>Fight Club</Highlight> is that you do not talk about fight
              club. The second rule of
              <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
              club.
            </p>
          ),
        },
      ]
    },
    {
      id: "images",
      title: "Images",
      icon: <ImageIcon className="size-14" />,
      iconColor: "text-green-500",
      component: <ImagesTab />,
      cards : [
        {
          id: 0,
          name: "Manu Arora",
          designation: "Senior Software Engineer",
          content: (
            <p>
              These cards are amazing, <Highlight>I want to use them</Highlight> in my
              project. Framer motion is a godsend ngl tbh fam 🙏
            </p>
          ),
        },
        {
          id: 1,
          name: "Elon Musk",
          designation: "Senior Shitposter",
          content: (
            <p>
              I dont like this Twitter thing,{" "}
              <Highlight>deleting it right away</Highlight> because yolo. Instead, I
              would like to call it <Highlight>X.com</Highlight> so that it can easily
              be confused with adult sites.
            </p>
          ),
        },
        {
          id: 2,
          name: "Tyler Durden",
          designation: "Manager Project Mayhem",
          content: (
            <p>
              The first rule of
              <Highlight>Fight Club</Highlight> is that you do not talk about fight
              club. The second rule of
              <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
              club.
            </p>
          ),
        },
      ]
    },
    {
      id: "tweets",
      title: "Tweets",
      icon: <TwitterIcon className="size-14" />,
      iconColor: "text-sky-500",
      component: <TweetsTab />,
      cards : [
        {
          id: 0,
          name: "Manu Arora",
          designation: "Senior Software Engineer",
          content: (
            <p>
              These cards are amazing, <Highlight>I want to use them</Highlight> in my
              project. Framer motion is a godsend ngl tbh fam 🙏
            </p>
          ),
        },
        {
          id: 1,
          name: "Elon Musk",
          designation: "Senior Shitposter",
          content: (
            <p>
              I dont like this Twitter thing,{" "}
              <Highlight>deleting it right away</Highlight> because yolo. Instead, I
              would like to call it <Highlight>X.com</Highlight> so that it can easily
              be confused with adult sites.
            </p>
          ),
        },
        {
          id: 2,
          name: "Tyler Durden",
          designation: "Manager Project Mayhem",
          content: (
            <p>
              The first rule of
              <Highlight>Fight Club</Highlight> is that you do not talk about fight
              club. The second rule of
              <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
              club.
            </p>
          ),
        },
      ]
    },
    {
      id: "notes",
      title: "Text Notes",
      icon: <FileTextIcon className="size-14" />,
      iconColor: "text-amber-500",
      component: <TextNoteTab />,
      cards : [
        {
          id: 0,
          name: "Manu Arora",
          designation: "Senior Software Engineer",
          content: (
            <p>
              These cards are amazing, <Highlight>I want to use them</Highlight> in my
              project. Framer motion is a godsend ngl tbh fam 🙏
            </p>
          ),
        },
        {
          id: 1,
          name: "Elon Musk",
          designation: "Senior Shitposter",
          content: (
            <p>
              I dont like this Twitter thing,{" "}
              <Highlight>deleting it right away</Highlight> because yolo. Instead, I
              would like to call it <Highlight>X.com</Highlight> so that it can easily
              be confused with adult sites.
            </p>
          ),
        },
        {
          id: 2,
          name: "Tyler Durden",
          designation: "Manager Project Mayhem",
          content: (
            <p>
              The first rule of
              <Highlight>Fight Club</Highlight> is that you do not talk about fight
              club. The second rule of
              <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
              club.
            </p>
          ),
        },
      ]
    },
    {
      id: "websites",
      title: "Websites & Articles",
      icon: <LinkIcon className="size-14" />,
      iconColor: "text-purple-500",
      component: <WebsitesTab />,
      cards : [
        {
          id: 0,
          name: "Manu Arora",
          designation: "Senior Software Engineer",
          content: (
            <p>
              These cards are amazing, <Highlight>I want to use them</Highlight> in my
              project. Framer motion is a godsend ngl tbh fam 🙏
            </p>
          ),
        },
        {
          id: 1,
          name: "Elon Musk",
          designation: "Senior Shitposter",
          content: (
            <p>
              I dont like this Twitter thing,{" "}
              <Highlight>deleting it right away</Highlight> because yolo. Instead, I
              would like to call it <Highlight>X.com</Highlight> so that it can easily
              be confused with adult sites.
            </p>
          ),
        },
        {
          id: 2,
          name: "Tyler Durden",
          designation: "Manager Project Mayhem",
          content: (
            <p>
              The first rule of
              <Highlight>Fight Club</Highlight> is that you do not talk about fight
              club. The second rule of
              <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
              club.
            </p>
          ),
        },
      ]
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
                className={`cursor-pointer rounded-xl p-6 border shadow-[0_3px_10px_rgb(0,0,0,0.1)] hover:shadow-[0_6px_10px_rgb(0,0,0,0.2)] bg-gradient-to-br from-white to-blue-100   h-full flex flex-col items-center justify-center text-center`}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCardClick(section.id)}
              >
                <motion.div 
                  className={`mb-3 p-5 text-black rounded-full bg-gradient-to-t from-white to-blue-200`}
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
              className="h-[calc(100%-6rem)] w-full  flex "
            >
              <div className="w-2/3 ">
              {sections.find((section) => section.id === activeSection)?.component}

              </div>
              <div className="w-1/2 flex items-center justify-center">
              <CardStack items={sections.find((section) => section.id === activeSection)?.cards} />

              </div>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LinkSection2;


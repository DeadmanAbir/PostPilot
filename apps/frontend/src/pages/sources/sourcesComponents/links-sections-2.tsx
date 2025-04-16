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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const LinkSection2 = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: "youtube",
      title: "YouTube Videos",
      icon: <YoutubeIcon className="size-10" />,
      iconColor: "text-red-500",
      component: <YouTubeTab />,
      protip: "LOrem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cards: [
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
      icon: <FileIcon className="size-10" />,
      iconColor: "text-blue-500",
      component: <FilesTab />,
      protip: "LOrem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

      cards: [
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
      icon: <ImageIcon className="size-10" />,
      iconColor: "text-green-500",
      component: <ImagesTab />,
      protip: "LOrem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

      cards: [
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
      icon: <TwitterIcon className="size-10" />,
      iconColor: "text-sky-500",
      component: <TweetsTab />,
      protip: "LOrem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

      cards: [
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
      icon: <FileTextIcon className="size-10" />,
      iconColor: "text-amber-500",
      component: <TextNoteTab />,
      protip: "LOrem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

      cards: [
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
      icon: <LinkIcon className="size-10" />,
      iconColor: "text-purple-500",
      component: <WebsitesTab />,
      protip: "LOrem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

      cards: [
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

    <>

      <motion.div layout className="h-full w-full p-5 ">
        <AnimatePresence mode="wait">
          {activeSection === null ? (
            <div className="h-full w-full flex flex-col  space-y-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-[15vh] bg-gradient-to-r text-center from-blue-500 to-blue-600 rounded-xl p-3 flex flex-col text-white items-center justify-center">
                <div className="text-4xl font-bold">
                  Welcome to Post Pilot
                </div>
                <p>
                  Select your content source to get started
                </p>

              </motion.div>
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-6 h-[55vh]  "
              >
                {sections.map((section) => (
                  <motion.div
                    key={section.id}
                    className={`cursor-pointer rounded-xl p-6 border dark:border-gray-700 shadow-[0_3px_10px_rgb(0,0,0,0.1)] hover:shadow-[0_6px_10px_rgb(0,0,0,0.2)] dark:shadow-[0_3px_10px_rgb(255,255,255,0.05)] dark:hover:shadow-[0_6px_10px_rgb(255,255,255,0.1)] bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 h-full flex flex-col items-center justify-center text-center dark:text-white`}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleCardClick(section.id)}
                  >
                    <motion.div
                      className={`mb-3 p-4 text-black dark:text-white rounded-full bg-gradient-to-t from-blue-50 to-blue-200 dark:from-gray-700 dark:to-blue-800`}
                      layoutId={`icon-${section.id}`}
                    >
                      {section.icon}
                    </motion.div>
                    <motion.h3
                      className="font-medium md:text-2xl text-lg  text-transparent bg-clip-text bg-gradient-to-r from-blue-500 dark:from-blue-200 to-blue-600 dark:to-blue-400"
                      layoutId={`title-${section.id}`}
                    >
                      {section.title}
                    </motion.h3>
                  </motion.div>
                ))}
              </motion.div>
            </div>

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
                  className={`mb-3 p-3 text-black dark:text-white rounded-full bg-gradient-to-b from-white to-blue-200 dark:from-gray-700 dark:to-blue-800`}
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
                className="h-[calc(100%-6rem)] w-full  flex md:flex-row flex-col   md:space-x-6 space-y-3 "
              >
                <div className="md:w-2/3 w-full ">
                  {sections.find((section) => section.id === activeSection)?.component}

                </div>
                <Card className="md:w-1/2 w-full flex h-full items-center justify-center cursor-pointer rounded-xl p-1 border dark:border-gray-700 shadow-[0_3px_10px_rgb(0,0,0,0.1)] hover:shadow-[0_6px_10px_rgb(0,0,0,0.2)] dark:shadow-[0_3px_10px_rgb(255,255,255,0.05)] dark:hover:shadow-[0_6px_10px_rgb(255,255,255,0.1)] bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900  flex-col  text-center dark:text-white">
                  <CardHeader className="flex flex-row items-center justify-start  w-full     space-x-2 ">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    <CardTitle className="text-lg">Pro Tip</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 text-left">
                    {sections.find((section) => section.id === activeSection)?.protip}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </>

  );
};

export default LinkSection2;

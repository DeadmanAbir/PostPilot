import CustomButton from "@/components/custom-button";
import { motion } from 'motion/react'

import Dots from "./dot";

const HeroSection = () => {
  return (
    <div className=" w-full border-b-2 border-dotted relative overflow-hidden">
              <motion.div
          className="absolute -right-20 size-[200px] mt-20 z-20"
          initial={{ scale: 0 }}
          animate={{
            scale: 1
          }}
          transition={{
        
            scale: {
              type: "spring",
              stiffness: 100,
              damping: 10
            }
          }}
        >
          <img
            src="/polygon.svg"
            alt=""
            className="w-full h-full object-contain"
          />
        </motion.div>
        <motion.div
          className="absolute -left-28 bottom-0 size-[300px] mt-20 z-20"
          initial={{ scale: 0 }}
          animate={{
            scale: 1
          }}
          transition={{
           
            scale: {
              type: "spring",
              stiffness: 100,
              damping: 10
            }
          }}
        >
          <img
            src="/polygon.svg"
            alt=""
            className="w-full h-full object-contain"
          />
        </motion.div>
      <section className="container mx-auto py-20 text-center  min-h-[98vh] bg-black flex items-center justify-center relative overflow-hidden border-r-[2px] border-l-2 border-dotted">
        <motion.div
          className="absolute size-[400px] mt-20"
          initial={{ scale: 0 }}
          animate={{
            rotate: 360,
            scale: 1
          }}
          transition={{
            rotate: {
              duration: 8,
              ease: "linear",
              repeat: Infinity
            },
            scale: {
              type: "spring",
              stiffness: 100,
              damping: 10
            }
          }}
        >
          <img
            src="/nugget.avif"
            alt=""
            className="w-full h-full object-contain"
          />
        </motion.div>


        <div className="flex flex-col items-center justify-center">
          <div className="absolute inset-0">
            <Dots />
          </div>

          <h1 className="text-transparent bg-clip-text bg-gradient-to-b font-mono tracking-widest from-white to-zinc-600  md:text-9xl text-8xl z-20">
            Post Pilot
          </h1>
          <div className="w-full max-w-80  mt-10">
            <CustomButton
              href="/dashboard"
              className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              Dashboard
            </CustomButton>
          </div>
        </div>


      </section>
    </div>
  );
};

export default HeroSection;

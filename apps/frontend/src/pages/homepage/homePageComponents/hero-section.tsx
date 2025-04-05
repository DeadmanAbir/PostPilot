import CustomButton from "@/components/custom-button";
import { motion, useInView } from 'motion/react'

import Dots from "./dot";
import { useRef } from "react";

const HeroSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  return (
    <div className=" w-full  relative overflow-hidden">
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
          src="/round.svg"
          alt=""
          className="w-full h-full object-contain"
        />
      </motion.div>
      <section className="container mx-auto py-20 text-center  min-h-[100vh] bg-black flex items-center justify-center relative overflow-hidden ">
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

          <h1 className="text-4xl md:text-4xl lg:text-7xl font-medium max-w-[90rem] text-center relative z-[10] text-white tracking-wide ">
            <span className="relative inline-block">
              AI Agents,
              <div className="absolute inset-0 flex items-center justify-center">
                <svg ref={ref} viewBox="0 0 286 73" fill="none" className="w-full h-full stroke-secondary" preserveAspectRatio="none">
                  <motion.path d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1" stroke-width="2" pathLength="1" stroke-dashoffset="0px" stroke-dasharray="1px 1px" initial={{ pathLength: 0, pathOffset: 1, stroke: "#000" }}
                    animate={inView
                      ? { pathLength: 1, pathOffset: 0, stroke: "#FFA500" }
                      : { pathLength: 0, pathOffset: 1, stroke: "#000" }
                    }

                    transition={{
                      duration: 1,
                      ease: "easeInOut"
                    }}
                  ></motion.path>
                </svg></div>
            </span>
            <span>
              built for speed, scale, <br /> and quality

            </span>
          </h1>
          <p className="text-center mt-6 text-base md:text-xl text-gray-300 max-w-[60rem] mx-auto relative z-[10] flex flex-col items-center">
          Handling complex queries, boosting efficiency, and streamlining support, so your business scales faster with precision
          </p>
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

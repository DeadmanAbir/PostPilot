"use client";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const HeroSection = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden">
      <section className="flex flex-col items-center text-center mt-32 z-20 relative">
        {/* Version Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center px-1 py-0.5 pl-2 pr-1 rounded-full bg-blue-900/70 text-blue-500 mb-5 border border-blue-500"
        >
           <span className="text-xs mr-1 text-white/70">Trending🔥</span>
           <ArrowRight size={12} />
        
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 0, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.4 }}
          className="md:text-7xl text-5xl font-bold md:leading-[1.4] max-w-7xl mx-auto tracking-tight text-balance"
        >
          AI-Driven Content Automation
          <br /> Welcome to{" "}
          <span className="inline-flex items-center px-4 my-2 md:my-0  bg-blue-700/20 rounded-lg text-blue-500 mx-2">
            PostPilot 
            <img src="/logo.png" alt="Loogo"  className="size-28"/>
          </span>
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 max-w-2xl mx-auto text-lg text-white/70 leading-relaxed px-5  text-pretty"
        >
          Transform your LinkedIn engagement with PostPilot. AI-powered content
          creation and automated scheduling to amplify your brand and save you
          time.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white rounded-full font-medium px-5 py-2.5 flex items-center justify-center"
          >
            Get Started <ArrowRight size={16} className="ml-2" />
          </Link>
        </motion.div>

        <div className="bottom-[-10rem] md:bottom-[-29rem] left-[50%] z-[-1] absolute bg-gradient-to-t opacity-50 dark:opacity-100 from-primary to-blue-900/50 blur-[8em] rounded-xl transition-all translate-x-[-50%] duration-700 w-[10rem] md:w-[30rem] h-[20rem] md:h-[30rem] rotate-[54deg] "></div>
      </section>
    </div>
  );
};

export default HeroSection;

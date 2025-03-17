import CustomButton from "@/components/custom-button";

import Dots from "./dot";
import { PulseBeam, } from "./beams";

const HeroSection = () => {
  return (
    <div className=" w-full border-b-2 border-dotted">
      <section className="container mx-auto py-20 text-center  min-h-[95vh] bg-black grid grid-cols-2 items-center justify-center relative overflow-hidden border-r-[2px] border-l-2 border-dotted">
       
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
        <div className="h-[98vh]  ">
        <PulseBeam />
        </div>
    
      </section>
    </div>
  );
};

export default HeroSection;

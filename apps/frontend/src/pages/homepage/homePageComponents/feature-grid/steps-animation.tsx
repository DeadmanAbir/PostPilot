"use client";

import { AnimatedList } from "@/components/animates-list";
import { cn } from "@/lib/utils";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
}

let notifications = [
  {
    name: "New Post Created",
    description: " Powered by PostPilot AI",

    icon: "📝",
    color: "#00C9A7",
  },
  {
    name: "AI-Generated Content Ready",
    description: "Crafted using your inputs and source materials ",
    icon: "🤖",
    color: "#FFB800",
  },
  {
    name: "LinkedIn Post Published",
    description: "Successfully posted from the dashboard",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "File or Media Uploaded",
    description: "Added to your content library for AI use",
    icon: "📂",
    color: "#1E86FF",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full  cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-blue-400/10 backdrop-blur-3xl  border-2 border-blue-950 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

const StepsAnimation = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative flex h-[400px] w-full flex-col overflow-hidden px-10 mt-10",
        className,
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div> */}
    </div>
  );
};

export default StepsAnimation;

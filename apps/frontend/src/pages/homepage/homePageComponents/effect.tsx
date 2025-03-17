import { motion } from "motion/react";

const Effect = () => {


  return (
    <div className="absolute inset-0 mt-20  ">
      
      <div className="flex">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="flex flex-col items-start justify-center w-60">
            <div className="flex items-center justify-center">
              <div className="h-6 w-6 bg-neutral-800 flex items-center justify-center rounded-full">
                <div className="h-2 w-2 bg-neutral-600 rounded-full"></div>
              </div>

              <svg
                width="300"
                height="1"
                viewBox="0 0 300 1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-neutral-700"
              >
                <motion.path d="M0.5 0.5H479" stroke="currentColor" />
                <motion.path
                  d="M0.5 0.5H479"
                  stroke={`url(#gradient-horizontal-${i})`}
                  strokeWidth="1"
                />
                <defs>
                  <motion.linearGradient
                    initial={{
                      x1: -200,
                      x2: 100,
                    }}
                    animate={{
                      x1: 400,
                      x2: 400,
                    }}
                    transition={{
                      duration: 2 + i * 0.3, // Small variation in duration
                      ease: "easeInOut", // Smoother easing
                      repeat: Infinity,
                      delay: i * 0.5, // Stagger the start time
                    }}
                    id={`gradient-horizontal-${i}`}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="white" />
                    <stop offset="100%" stopColor="transparent" />
                  </motion.linearGradient>
                </defs>
              </svg>
            </div>

            <svg
              width="1"
              height="140"
              viewBox="0 0 1 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-neutral-700 ml-3"
            >
              <motion.path d="M0.5 0.5V479" stroke="currentColor" strokeWidth="2" />
              <motion.path
                d="M0.5 0.5V479"
                stroke={`url(#gradient-vertical-${i})`}
                strokeWidth="2"
              />
              <defs>
                <motion.linearGradient
                  initial={{
                    y1: -200,
                    y2: 100,
                  }}
                  animate={{
                    y1: 200,
                    y2: 200,
                  }}
                  transition={{
                    duration: 2 + i * 0.4, // Small variation in duration
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: i * 0.3, // Stagger the start time
                  }}
                  id={`gradient-vertical-${i}`}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="white" />
                  <stop offset="100%" stopColor="transparent" />
                </motion.linearGradient>
              </defs>
            </svg>
          </div>
        ))}
      </div>
         <div className="flex">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="flex flex-col items-start justify-center w-60">
            <div className="flex items-center justify-center">
              <div className="h-6 w-6 bg-neutral-800 flex items-center justify-center rounded-full">
                <div className="h-2 w-2 bg-neutral-600 rounded-full"></div>
              </div>

              <svg
                width="300"
                height="1"
                viewBox="0 0 300 1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-neutral-700"
              >
                <motion.path d="M0.5 0.5H479" stroke="currentColor" />
                <motion.path
                  d="M0.5 0.5H479"
                  stroke={`url(#gradient-horizontal-${i})`}
                  strokeWidth="1"
                />
                <defs>
                  <motion.linearGradient
                    initial={{
                      x1: -200,
                      x2: 100,
                    }}
                    animate={{
                      x1: 400,
                      x2: 400,
                    }}
                    transition={{
                      duration: 2 + i * 0.3, // Small variation in duration
                      ease: "easeInOut", // Smoother easing
                      repeat: Infinity,
                      delay: i * 0.5, // Stagger the start time
                    }}
                    id={`gradient-horizontal-${i}`}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="white" />
                    <stop offset="100%" stopColor="transparent" />
                  </motion.linearGradient>
                </defs>
              </svg>
            </div>

            <svg
              width="1"
              height="140"
              viewBox="0 0 1 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-neutral-700 ml-3"
            >
              <motion.path d="M0.5 0.5V479" stroke="currentColor" strokeWidth="2" />
              <motion.path
                d="M0.5 0.5V479"
                stroke={`url(#gradient-vertical-${i})`}
                strokeWidth="2"
              />
              <defs>
                <motion.linearGradient
                  initial={{
                    y1: -200,
                    y2: 100,
                  }}
                  animate={{
                    y1: 200,
                    y2: 200,
                  }}
                  transition={{
                    duration: 2 + i * 0.4, // Small variation in duration
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: i * 0.3, // Stagger the start time
                  }}
                  id={`gradient-vertical-${i}`}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="white" />
                  <stop offset="100%" stopColor="transparent" />
                </motion.linearGradient>
              </defs>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Effect;

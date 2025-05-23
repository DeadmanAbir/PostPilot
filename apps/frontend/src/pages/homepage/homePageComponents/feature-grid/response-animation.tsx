import { motion, useAnimate } from 'motion/react';
import { useState } from 'react';

import { TextShimmer } from '@/components/generate-text';
import { TextEffect } from '@/components/text-effect';

const ResponseEffect = () => {
  const [scope, animate] = useAnimate();
  const [trigger, setTrigger] = useState(true);
  const [triggerAns, setTriggerAns] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [, setCallCount] = useState(0);
  const [showGenerate, setShowGenerate] = useState(false);

  const runAnimation = async () => {
    await animate('.enter-button', { scale: 0.9 }, { duration: 0.1 });
    await animate('.enter-button', { scale: 1 }, { duration: 0.1 });
    setTimeout(() => {
      setShowGenerate(true);
    }, 1000);
  };

  const handleQuestionComplete = () => {
    if (hasCompleted) {
      return;
    }
    setHasCompleted(true);
    runAnimation();
    setTimeout(() => {
      setTrigger(false);
    }, 1000);
    setTimeout(() => {
      setTriggerAns(true);
    }, 1500);
  };

  const handleComplete = () => {
    setCallCount((prev) => {
      if (prev === 1) {
        setCallCount(0);
        setHasCompleted(false);
        setTrigger(true);
        setShowGenerate(false);
      }
      if (prev === 0) {
        setTriggerAns(false);
      }

      return prev + 1;
    });
  };

  const blurSlideVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.01 },
      },
      exit: {
        transition: { staggerChildren: 0.01, staggerDirection: 1 },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        filter: 'blur(10px) brightness(0%)',
        y: 0,
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px) brightness(100%)',
        transition: {
          duration: 0.4,
        },
      },
      exit: {
        opacity: 0,
        y: -30,
        filter: 'blur(10px) brightness(0%)',
        transition: {
          duration: 0.4,
        },
      },
    },
  };
  return (
    <div ref={scope} className="absolute inset-0 mt-10">
      <div className="max-w-2xl mx-auto p-6">
        {/* Input section */}
        <div className="flex flex-col items-center gap-3 mb-6 bg-neutral-900 p-4 rounded-lg h-40">
          <div className="relative flex-1 h-40 bg-neutral-800 rounded overflow-hidden p-3 w-full">
            <TextEffect
              per="char"
              variants={blurSlideVariants}
              trigger={trigger}
              onAnimationComplete={handleQuestionComplete}
            >
              Create a linkedin post for me.
            </TextEffect>
          </div>

          <motion.div
            className="enter-button px-4 py-1 bg-neutral-700 rounded text-sm "
            layout
            initial={{ width: 'auto' }}
            animate={{ width: 'auto' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {showGenerate ? (
              <TextShimmer className="font-mono text-sm" duration={1}>
                Generating Post...
              </TextShimmer>
            ) : (
              <span>Enter ↵</span>
            )}
          </motion.div>
        </div>
        <div className="   bg-neutral-800 rounded h-full p-3 w-full min-h-60 ">
          <TextEffect
            per="char"
            preset="fade"
            trigger={triggerAns}
            onAnimationComplete={handleComplete}
          >
            Thrilled to announce that I've joined 100xdevs as a mentor! I'm
            eager to contribute my skills in MERN and learn from the talented
            team here. Looking forward to this new chapter! #NewBeginnings
            #CareerGoals
          </TextEffect>
        </div>
      </div>
    </div>
  );
};

export default ResponseEffect;

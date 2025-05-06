import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

const contentTypes = ['YouTube', 'Files', 'Tweet', 'Website'];

const SelectAnimation = () => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setSelected((prev) => {
        const current = contentTypes[currentIndex];

        // If current type is already selected, remove it
        if (prev.includes(current)) {
          return prev.filter((type) => type !== current);
        }

        // Add current type
        return [...prev, current];
      });

      // Move to next content type
      currentIndex = (currentIndex + 1) % contentTypes.length;
    }, 2000); // Change selection every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <motion.div
        className="flex flex-wrap gap-3 overflow-visible"
        layout
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
          mass: 0.5,
        }}
      >
        {contentTypes.map((content) => {
          const isSelected = selected.includes(content);
          return (
            <motion.button
              key={content}
              layout
              initial={false}
              animate={{
                backgroundColor: isSelected
                  ? '#2a1711'
                  : 'rgba(39, 39, 42, 0.5)',
              }}
              whileHover={{
                backgroundColor: isSelected
                  ? '#2a1711'
                  : 'rgba(39, 39, 42, 0.8)',
              }}
              whileTap={{
                backgroundColor: isSelected
                  ? '#1f1209'
                  : 'rgba(39, 39, 42, 0.9)',
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 0.5,
                backgroundColor: { duration: 0.1 },
              }}
              className={`
                  inline-flex items-center px-4 py-2 rounded-full text-base font-medium
                  whitespace-nowrap overflow-hidden ring-1 ring-inset
                  ${
                    isSelected
                      ? 'text-[#ff9066] ring-[hsla(0,0%,100%,0.12)]'
                      : 'text-zinc-400 ring-[hsla(0,0%,100%,0.06)]'
                  }
                `}
            >
              <motion.div
                className="relative flex items-center"
                animate={{
                  width: isSelected ? 'auto' : '100%',
                  paddingRight: isSelected ? '1.5rem' : '0',
                }}
                transition={{
                  ease: [0.175, 0.885, 0.32, 1.275],
                  duration: 0.3,
                }}
              >
                <span>{content}</span>
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                        mass: 0.5,
                      }}
                      className="absolute right-0"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#ff9066] flex items-center justify-center">
                        <Check
                          className="w-3 h-3 text-[#2a1711]"
                          strokeWidth={1.5}
                        />
                      </div>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SelectAnimation;

import { motion } from 'motion/react';
import { FileIcon, ImageIcon, YoutubeIcon, LinkIcon, FileTextIcon } from 'lucide-react';

const Rotate = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="relative">
                <svg width="400" height="400" viewBox="-50 -50 359 343" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.rect
                        x="0.5" y="0.5" width="268" height="252" rx="50"
                        stroke="#ed8936" strokeWidth="1" opacity="0.4"
                        style={{ transformOrigin: "134.5px 126.5px" }}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />

                    <motion.rect
                        x="15" y="17" width="238" height="222" rx="50"
                        stroke="#ed8936" strokeWidth="1.1" opacity="0.4"
                        style={{ transformOrigin: "134px 128px" }}
                        animate={{ rotate: [0, -360] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />

                    <motion.rect
                        x="36.25" y="30.25" width="193.5" height="189.5" rx="50"
                        stroke="#ed8936" strokeWidth="1.2" opacity="0.4"
                        style={{ transformOrigin: "133px 125px" }}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    />

                    <motion.rect
                        x="58.5" y="52.5" width="150" height="144" rx="50"
                        stroke="#ed8936" strokeWidth="1.3" opacity="0.4"
                        style={{ transformOrigin: "133.5px 124.5px" }}
                        animate={{ rotate: [0, -360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
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
                            src="/sphere.svg"
                            alt="Sphere"
                            className="size-24 saturate-150 hue-rotate-15"
                        />
                    </motion.div>
                </div>
                <div className='absolute inset-0 flex items-center justify-center text-xl font-semibold' >
                    Post Pilot
                </div>

                {/* YouTube Icon */}
                <motion.div 
                    className='absolute top-28 -left-4 bg-black/80 backdrop-blur-sm py-2 rounded-xl border border-zinc-500/50 px-2 hover:bg-black/90 hover:scale-110 transition-all duration-300 cursor-pointer'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                >
                    <YoutubeIcon className="size-8 text-red-500" />
                </motion.div>

                {/* File Icon */}
                <motion.div 
                    className='absolute bottom-28 left-0 bg-black/80 backdrop-blur-sm py-2 rounded-xl border border-zinc-500/50 px-2 hover:bg-black/90 hover:scale-110 transition-all duration-300 cursor-pointer'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                >
                    <FileIcon className="size-8 text-blue-500" />
                </motion.div>

                {/* Image Icon */}
                <motion.div 
                    className='absolute top-10 right-8 bg-black/80 backdrop-blur-sm py-2 rounded-xl border border-zinc-500/50 px-2 hover:bg-black/90 hover:scale-110 transition-all duration-300 cursor-pointer'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                >
                    <ImageIcon className="size-8 text-green-500" />
                </motion.div>

                {/* Website Icon */}
                <motion.div 
                    className='absolute top-28 right-0 bg-black/80 backdrop-blur-sm py-2 rounded-xl border border-zinc-500/50 px-2 hover:bg-black/90 hover:scale-110 transition-all duration-300 cursor-pointer'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                >
                    <LinkIcon className="size-8 text-purple-500" />
                </motion.div>

                {/* Text Note Icon */}
                <motion.div 
                    className='absolute bottom-28 right-0 bg-black/80 backdrop-blur-sm py-2 rounded-xl border border-zinc-500/50 px-2 hover:bg-black/90 hover:scale-110 transition-all duration-300 cursor-pointer'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                >
                    <FileTextIcon className="size-8 text-amber-500" />
                </motion.div>
            </div>
        </div>
    );
};

export default Rotate;
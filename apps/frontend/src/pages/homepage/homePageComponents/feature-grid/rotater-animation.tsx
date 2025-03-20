import { motion } from 'motion/react';

const Rotate = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="relative ">
                <svg width="600" height="600" viewBox="-50 -50 359 343" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                            className="size-32 saturate-150 hue-rotate-15"
                        />
                    </motion.div>
                </div>
                <div className='absolute inset-0 flex items-center justify-center' >
                    Post Pilot
                </div>
                <div className='absolute top-44 left-32 bg-black py-3 rounded-xl border border-zinc-500 px-5 ' >
                    <svg viewBox="0 0 24 24" className="size-10 text-[#FF0000]">
                        <path
                            fill="currentColor"
                            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                        />
                    </svg>
                </div>
                <div className='absolute bottom-44 left-32 bg-black py-3 rounded-xl border border-zinc-500 px-5 ' >
                    <svg viewBox="0 0 24 24" className="size-10 text-[#FF0000]">
                        <path
                            fill="currentColor"
                            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                        />
                    </svg>
                </div>
                <div className='absolute top-20 right-64 bg-black py-3 rounded-xl border border-zinc-500 px-5 ' >
                    <svg viewBox="0 0 24 24" className="size-10 text-[#FF0000]">
                        <path
                            fill="currentColor"
                            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                        />
                    </svg>
                </div>
                <div className='absolute top-44 right-32 bg-black py-3 rounded-xl border border-zinc-500 px-5 ' >
                    <svg viewBox="0 0 24 24" className="size-10 text-[#1DA1F2]">
                        <path
                            fill="currentColor"
                            d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                        />
                    </svg>
                </div>
                <div className='absolute bottom-44 right-32 bg-black py-3 rounded-xl border border-zinc-500 px-5 ' >
                    <svg viewBox="0 0 24 24" className="size-10 text-[#4285F4]">
                        <path
                            fill="currentColor"
                            d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Rotate;
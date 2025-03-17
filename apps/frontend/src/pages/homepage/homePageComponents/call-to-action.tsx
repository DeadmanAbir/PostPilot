import { Link } from "@tanstack/react-router";

const CallToAction = () => {
  return (
    <div className="w-full border-b-2 border-dotted">
      <section className="container mx-auto border-r-[2px] border-l-2 border-dotted overflow-hidden ">
        <div className=" relative items-center justify-center z-40 md:p-20 p-5 bg-gradient-to-br from-slate-800  to-zinc-900   w-full ">
          <div className="absolute rounded-md inset-0 w-full h-full opacity-10  [mask-image:radial-gradient(#fff,transparent,75%)]  bg-[url('/noise.webp')]  bg-contain z-0"></div>

          <div className="z-40 flex flex-col items-center justify-center gap-3  ">
            <div className="text-center z-40 text-balance mx-auto text-3xl md:text-5xl font-semibold tracking-[-0.015em] text-white ">
              Contact
            </div>
            <span className="mt-1 md:text-xl text-md max-w-[26rem] text-center mx-auto z-40  text-neutral-200">
              Looking for specific use cases and support?
            </span>
            <Link
              to=""
              className="bg-neutral-900 relative z-40 hover:bg-black/90 border border-transparent text-white text-sm md:text-sm transition font-medium duration-200 rounded-full px-4 py-2 flex items-center justify-center shadow-[0px_-1px_0px_0px_#FFFFFF40_inset,_0px_1px_0px_0px_#FFFFFF40_inset] "
            >
              Lets Chat
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CallToAction;

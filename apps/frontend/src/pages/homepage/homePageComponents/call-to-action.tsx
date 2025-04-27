import { Button } from "@/components/ui/button";
const randomImages = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/id/227/200/300",
  "https://picsum.photos/id/217/200/300",

];

const CallToAction = () => {
  return (
    <div className="w-full py-20 px-4 md:px-0">
      <section className="max-w-6xl mx-auto overflow-hidden ">
        <div className=" relative grid md:grid-cols-2 grid-cols-1 z-40 md:p-10 p-5 bg-gradient-to-br from-blue-900 to-black   w-full rounded-xl border-blue-900 border-2 ">
          <div className="absolute rounded-md inset-0 w-full h-full opacity-10   [mask-image:radial-gradient(#fff,transparent,75%)]  bg-[url('/noise.webp')]  bg-contain z-0"></div>

          <div className="z-40 flex flex-col items-start justify-center gap-3  ">
            <div className="text-left w-full z-40 text-balance mx-auto text-3xl md:text-5xl font-semibold tracking-[-0.015em] text-white ">
              Contact
            </div>
            <span className="mt-1 md:text-xl text-md  text-left  w-full  mx-auto z-40  text-white">
              Looking for specific use cases and support?
            </span>
            <Button
          onClick={() => { window.location.href = "mailto:abirdutta90990@gmail.com" }}
              className="bg-neutral-900 relative z-40 hover:bg-black/90 border border-transparent text-white text-sm md:text-sm transition font-medium duration-200 rounded-full px-4 py-2 flex items-center justify-center shadow-[0px_-1px_0px_0px_#FFFFFF40_inset,_0px_1px_0px_0px_#FFFFFF40_inset] "
            >
              Lets Chat
            </Button>
          </div>
          <div className="z-40 flex flex-col items-start justify-center gap-3 pt-5">
            <div className="grid grid-cols-2 gap-2 w-full md:pl-60">
              {randomImages.map((img, index) => (
                <div
                  key={index}
                  className="bg-neutral-800 size-28  rounded-xl flex items-center justify-center overflow-hidden w-full aspect-square shadow-lg text-white hover:scale-[1.02] transition-transform duration-300"
                >
                  <img
                    src={img}
                    alt={`card-${index}`}
                    className="w-full h-full size-20 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default CallToAction;

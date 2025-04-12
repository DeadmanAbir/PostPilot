import ResponseEffect from "./feature-grid/response-animation";
import SelectAnimation from "./feature-grid/select-animation";
import StaggerFeatures from "./feature-grid/stagger-features";
import OrbitAnimation from "./feature-grid/rotate-animation";
import StepsAnimation from "./feature-grid/steps-animation";
import Rotate from "./feature-grid/rotater-animation";

const FeatureGrid = () => {
  return (
    <div className=" w-full h-full flex flex-col space-y-10 pb-10  ">
      <div className="w-full ">

        <div className="md:text-9xl text-6xl flex items-center justify-center pt-10">

          Features
        </div>
      </div>

      <section className="max-w-7xl mx-auto  p-5 md:px-14   flex flex-col items-center justify-center  ">
        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2 ">
          {/* first bento grid element */}
          <div className="relative lg:row-span-2 group overflow-hidden">
            <div className="absolute inset-px rounded-lg  bg-blue-400/10 backdrop-blur-3xl  border-2 border-blue-950 lg:rounded-tl-[2rem] " />
            <div className="absolute -bottom-40 left-5 rounded-full size-96 blur-3xl 
    bg-blue-500 opacity-0 group-hover:opacity-100 
    transition-all duration-500 ease-in-out will-change-transform saturate-100" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8  pt-6 sm:px-10 sm:pb-0 ">
                <p className="mt-2 md:text-3xl text-lg font-medium tracking-tight text-white max-lg:text-center">
                  Real-time notifications
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                  Get notified about critical events the moment they happen, no
                  matter if you&apos;re at home or on the go.
                </p>
              </div>

              <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-zinc-700 bg-black shadow-2xl">
                  <div className="absolute left-1/2 -translate-x-1/2 top-4">
                    <div className="bg-zinc-800 rounded-full px-8 py-1.5 flex items-center justify-center gap-2 shadow-lg">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <ResponseEffect />
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]" />
          </div>

          {/* second bento grid element */}
          <div className="relative max-lg:row-start-1  bg-blue-400/10 backdrop-blur-3xl  border-2 border-blue-950 group overflow-hidden">
            <div className="absolute inset-px rounded-lg  max-lg:rounded-t-[2rem] " />
            <div className="absolute -bottom-80 left-5 rounded-full size-96 blur-3xl 
    bg-blue-500 opacity-0 group-hover:opacity-100 
    transition-all duration-500 ease-in-out will-change-transform z-[-1]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-6 sm:px-10 ">
                <p className="mt-2 md:text-3xl text-lg font-medium tracking-tight text-white max-lg:text-center">
                  Track Any Event
                </p>
                <p className="my-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  From new user signups to successful payments,
                </p>
              </div>
              <div className="h-40  ">
                <OrbitAnimation />
          
              </div>
            </div>

            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]" />
          </div>

          {/* third bento grid element */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2 bg-blue-400/10 backdrop-blur-3xl  border-2 border-blue-950 group overflow-hidden">
            <div className="absolute inset-px rounded-lg " />
            <div className="absolute -bottom-80 left-5 rounded-full size-96 blur-3xl 
    bg-blue-500 opacity-0 group-hover:opacity-100 
    transition-all duration-500 ease-in-out will-change-transform z-[-1]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
              <div className="px-8 pt-6 sm:px-10 ">
                <p className="mt-2 md:text-3xl text-lg font-medium tracking-tight text-white max-lg:text-center">
                  Track Any Properties
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Add any custom data you like to an event, such as a user
                  email, a purchase amount or an exceeded quota.
                </p>
              </div>

              <div className="flex flex-1  items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                <SelectAnimation />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
          </div>

          {/* fourth bento grid element */}
          <div className="relative lg:row-span-2  group overflow-hidden">
            <div className="absolute inset-px rounded-lg bg-blue-400/10 backdrop-blur-3xl  border-2 border-blue-950 max-lg:rounded-b-[2rem] lg:rounded-tr-[2rem]" />
            <div className="absolute -bottom-80 left-5 rounded-full size-96 blur-3xl 
    bg-blue-500 opacity-0 group-hover:opacity-100 
    transition-all duration-500 ease-in-out will-change-transform " />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-6 sm:px-10 sm:pb-0 ">
                <p className="mt-2 md:text-3xl text-lg font-medium tracking-tight text-white max-lg:text-center">
                  Easy Integration
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Connect PingBot with your existing workflows in minutes and
                  call our intuitive logging API from any language.
                </p>
              </div>

              <div className="relative max-h-[30rem] w-full grow flex items-center justify-center mt-4">
                <StaggerFeatures />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
          </div>

        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-[16px] w-full">
          <div className="relative  group overflow-hidden">
            <div className="absolute inset-px rounded-lg bg-blue-400/10 backdrop-blur-3xl  border-2 border-blue-950 lg:rounded-bl-[2rem]" />
            <div className="absolute -bottom-80 left-24 rounded-full size-96 blur-3xl 
    bg-blue-500 opacity-0 group-hover:opacity-100 
    transition-all duration-500 ease-in-out will-change-transform " />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-6 sm:px-10 sm:pb-0 ">
                <p className="mt-2 md:text-3xl text-lg font-medium tracking-tight text-white max-lg:text-center">
                  Real-time notifications
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                  Get notified about critical events the moment they happen, no
                  matter if you&apos;re at home or on the go.
                </p>
              </div>

              <div>
                <StepsAnimation />
              </div>
            </div>

          </div>
          <div className="relative  group overflow-hidden">
            <div className="absolute inset-px rounded-lg  lg:rounded-br-[2rem] bg-blue-400/10 backdrop-blur-3xl  border-2 border-blue-950" />
            <div className="absolute -bottom-80 left-24 rounded-full size-96 blur-3xl 
    bg-blue-500 opacity-0 group-hover:opacity-100 
    transition-all duration-500 ease-in-out will-change-transform " />
            <div className="relative flex items-center justify-center  h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">


              <div>
                <Rotate />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureGrid;

import ResponseEffect from "./feature-grid/response-animation";
import SelectAnimation from "./feature-grid/select-animation";
import StaggerFeatures from "./feature-grid/stagger-features";
import OrbitAnimation from "./feature-grid/rotate-animation";
import StepsAnimation from "./feature-grid/steps-animation";
import Rotate from "./feature-grid/rotater-animation";

const FeatureGrid = () => {
  return (
    <div className="border-b-2 border-dotted w-full h-full ">
      <div className="w-full border-b-2 border-dotted">

        <div className="text-transparent bg-clip-text text-center py-10 bg-gradient-to-b font-mono tracking-widest from-white to-zinc-600  md:text-9xl text-6xl border-r-[2px] border-l-2 border-dotted container mx-auto relative overflow-hidden drop-shadow-[0_0_20px_rgba(34,197,94,0.7)]">
          {/* <div className="absolute inset-0 left-1/2 translate-y-[260px] -translate-x-48  top-0 size-96 bg-green-700 rounded-2xl blur-3xl"></div>        */}

          Features
        </div>
      </div>

      <section className="container mx-auto md:p-14 p-5 border-r-[2px] border-l-2 border-dotted flex flex-col items-center justify-center  ">
        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2 ">
          {/* first bento grid element */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-zinc-900 lg:rounded-tl-[2rem]" />

            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-6 sm:px-10 sm:pb-0 ">
                <p className="mt-2 text-lg/7 font-medium tracking-tight text-white max-lg:text-center">
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
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-zinc-900 max-lg:rounded-t-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-6 sm:px-10 ">
                <p className="mt-2 text-lg/7 font-medium tracking-tight text-white max-lg:text-center">
                  Track Any Event
                </p>
                <p className="my-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  From new user signups to successful payments,
                </p>
              </div>
              <div className="h-40">
                <OrbitAnimation />

              </div>
            </div>

            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]" />
          </div>

          {/* third bento grid element */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-zinc-900" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
              <div className="px-8 pt-6 sm:px-10 ">
                <p className="mt-2 text-lg/7 font-medium tracking-tight text-white max-lg:text-center">
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
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-zinc-900 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />

            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-6 sm:px-10 sm:pb-0 ">
                <p className="mt-2 text-lg/7 font-medium tracking-tight text-white max-lg:text-center">
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
          <div className="relative ">
            <div className="absolute inset-px rounded-lg bg-zinc-900 lg:rounded-bl-[2rem]" />

            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-6 sm:px-10 sm:pb-0 ">
                <p className="mt-2 text-lg/7 font-medium tracking-tight text-white max-lg:text-center">
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
          <div className="relative ">
            <div className="absolute inset-px rounded-lg bg-zinc-900 lg:rounded-br-[2rem]" />

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

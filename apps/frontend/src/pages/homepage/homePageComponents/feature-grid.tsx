

const FeatureGrid = () => {
  return (
    <div className="border-b-2 border-dotted w-full ">
      <div className="w-full border-b-2 border-dotted">
        <div className="text-transparent bg-clip-text text-center py-10 bg-gradient-to-b font-mono tracking-widest from-white to-zinc-600  md:text-9xl text-6xl border-r-[2px] border-l-2 border-dotted container mx-auto">
          Features
        </div>
      </div>

      <section className="container mx-auto p-5 border-r-[2px] border-l-2 border-dotted flex items-center justify-center">

        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2 ">
          {/* first bento grid element */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-zinc-900 lg:rounded-l-[2rem]" />

            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-lg/7 font-medium tracking-tight text-white max-lg:text-center">
                  Real-time notifications
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Get notified about critical events the moment they happen,
                  no matter if you&apos;re at home or on the go.
                </p>
              </div>

              <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                  <img
                    className="size-full object-cover object-top"
                    src="/phone-screen.png"
                    alt="Phone screen displaying app interface"

                  />
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]" />
          </div>

          {/* second bento grid element */}
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-zinc-900 max-lg:rounded-t-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg/7 font-medium tracking-tight text-white max-lg:text-center">
                  Track Any Event
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  From new user signups to successful payments, PingBot
                  notifies you for all critical events in your SaaS.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                <img
                  className="w-full max-lg:max-w-xs"
                  src="/bento-any-event.png"
                  alt="Bento box illustrating event tracking"
                  width={500}
                  height={300}
                />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]" />
          </div>

          {/* third bento grid element */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-zinc-900" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg/7 font-medium tracking-tight text-white max-lg:text-center">
                  Track Any Properties
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Add any custom data you like to an event, such as a user
                  email, a purchase amount or an exceeded quota.
                </p>
              </div>

              <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                <img
                  className="w-full max-lg:max-w-xs"
                  src="/bento-custom-data.png"
                  alt="Bento box illustrating custom data tracking"
                  width={500}
                  height={300}
                />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
          </div>

          {/* fourth bento grid element */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-zinc-900 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />

            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-lg/7 font-medium tracking-tight text-white max-lg:text-center">
                  Easy Integration
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Connect PingBot with your existing workflows in minutes
                  and call our intuitive logging API from any language.
                </p>
              </div>

              <div className="relative min-h-[30rem] w-full grow">
                <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                  <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                    <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                      <div className="border-b border-r border-b-white/20 border-r-white/10 bg-zinc-900/5 px-4 py-2 text-white">
                        Postpilot.js
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
          </div>
        </div>
      </section>
    </div>

  );
}

export default FeatureGrid;
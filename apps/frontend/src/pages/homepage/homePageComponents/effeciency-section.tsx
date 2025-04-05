import { Card } from "@/components/ui/card";
import { Clock, FileCheck, Monitor } from "lucide-react";

const EfficiencySection = () => {
  return (
    <div className="w-full ">
    <div className="w-full ">
      <div className="  py-10 border-dotted container mx-auto flex flex-col items-center justify-center relative overflow-hidden">
      {/* <div className="absolute inset-0 left-1/2 translate-y-[290px] -translate-x-48  top-0 size-96 bg-orange-700 rounded-2xl blur-3xl"></div>      */}
        <h1 className="text-transparent bg-clip-text text-center  bg-gradient-to-b font-mono tracking-widest from-white to-zinc-600  md:text-9xl text-6xl   drop-shadow-[0_0_40px_rgba(251,146,60,0.8)]">
        

        Efficieny
        </h1>
        <p className="mx-auto  max-w-3xl text-muted-foreground text-xl text-center drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
        Optimize workflows, drive faster issue resolutions, and achieve measurable cost reductions
      </p>
      </div>
    </div>
    <section className="container mx-auto p-10 text-center  ">
      

      <div className=" grid gap-6 md:grid-cols-3 text-white">
        {/* 80% Queries Card */}
        <Card className="border-0 bg-zinc-900 p-6 text-left text-white">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-indigo-950 text-purple-400">
            <Monitor className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">80% Queries resolved by AI agents</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Increase bot resolution rates, minimizing customer frustration and repeat interactions
          </p>
        </Card>

        {/* 25% Compliance Card */}
        <Card className="border-0 bg-zinc-900 p-6 text-left text-white">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-amber-950 text-amber-400">
            <FileCheck className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">25% Increase in compliance</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Improve compliance with agent co-pilot, ensuring agents follow best practices
          </p>
        </Card>

        {/* 20% Resolution Time Card */}
        <Card className="border-0 bg-zinc-900 p-6 text-left text-white">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-green-950 text-green-400">
            <Clock className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">20% Reduction in resolution time</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Enhance team efficiency allowing for greater focus on high-value or complex queries
          </p>
        </Card>
      </div>
    </section>
    </div>
  );
}

export default EfficiencySection;
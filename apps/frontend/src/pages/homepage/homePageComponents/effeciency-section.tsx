import { Card } from "@/components/ui/card";
import { Clock, FileCheck, Monitor } from "lucide-react";

const EfficiencySection = () => {
  return (
    <div className="w-full ">
  <div className="w-full ">

<div className="md:text-9xl text-6xl flex items-center justify-center pt-10">

  Effeciency
</div>
</div>
    <section className="max-w-7xl mx-auto p-10 text-center  ">
      

      <div className=" grid gap-6 md:grid-cols-3 text-white">
        {/* 80% Queries Card */}
        <Card className=" bg-blue-700/20 border border-blue-900 backdrop-blur-3xl hover:scale-105 transition-transform duration-200 p-6 text-left text-white ">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md  text-purple-400">
            <Monitor className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">80% Queries resolved by AI agents</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Increase bot resolution rates, minimizing customer frustration and repeat interactions
          </p>
        </Card>

        {/* 25% Compliance Card */}
        <Card className="border border-blue-900 backdrop-blur-3xl hover:scale-105 transition-transform duration-200 p-6 text-left text-white bg-blue-700/20">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md  text-amber-400">
            <FileCheck className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">25% Increase in compliance</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Improve compliance with agent co-pilot, ensuring agents follow best practices
          </p>
        </Card>

        {/* 20% Resolution Time Card */}
        <Card className="border border-blue-900 backdrop-blur-3xl hover:scale-105 transition-transform duration-200 p-6 text-left text-white bg-blue-700/20">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md  text-green-400">
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
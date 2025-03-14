import { Card } from "@/components/ui/card";
import { Clock, FileCheck, Monitor } from "lucide-react";

const EfficiencySection = () => {
    return (      <section className="container mx-auto py-20 text-center">
        <h2 className="text-4xl font-bold">Maximize Efficiency</h2>
        <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
          Optimize workflows, drive faster issue resolutions, and achieve measurable cost reductions
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {/* 80% Queries Card */}
          <Card className="border-0 bg-zinc-900/50 p-6 text-left">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-indigo-950 text-purple-400">
              <Monitor className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">80% Queries resolved by AI agents</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Increase bot resolution rates, minimizing customer frustration and repeat interactions
            </p>
          </Card>

          {/* 25% Compliance Card */}
          <Card className="border-0 bg-zinc-900/50 p-6 text-left">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-amber-950 text-amber-400">
              <FileCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">25% Increase in compliance</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Improve compliance with agent co-pilot, ensuring agents follow best practices
            </p>
          </Card>

          {/* 20% Resolution Time Card */}
          <Card className="border-0 bg-zinc-900/50 p-6 text-left">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-green-950 text-green-400">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">20% Reduction in resolution time</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Enhance team efficiency allowing for greater focus on high-value or complex queries
            </p>
          </Card>
        </div>
      </section> );
}
 
export default EfficiencySection;
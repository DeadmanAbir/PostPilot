import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="container mx-auto py-20 text-center  min-h-screen flex items-center justify-center relative">
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute -top-10 left-1/2 h-20 w-20 -translate-x-1/2 bg-purple-600/20 blur-3xl"></div>
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          The only{" "}
          <span className="relative">
            AI toolbox
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-purple-400"></div>
          </span>{" "}
          you'll ever need
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          From conversational AI agents to co-pilots, unlock endless possibilities to transform your business
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Badge variant="outline" className="flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white">
            <X className="h-4 w-4 text-red-500" />
            No-Code
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500">
              $
            </span>
            Cost-Effective
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500/20 text-blue-500">
              📊
            </span>
            Powerful Analytics
          </Badge>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
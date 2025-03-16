import { Card } from "@/components/ui/card";
import { Check, X, Mic, Search, MessageSquare, } from "lucide-react"

const FeatureGrid = () => {
  return (
    <section className="container mx-auto pb-20">
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {/* Image Classification */}
      <Card className="border-0 bg-zinc-900/50 p-6">
        <h3 className="text-xl font-bold">Accurate Image Classification</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Enhance support by precisely categorizing images for faster resolutions
        </p>
        <div className="mt-6 overflow-hidden rounded-lg">
          <div className="relative">
            <img
              src="/placeholder.svg?height=240&width=320"
              width={320}
              height={240}
              alt="Coffee spill example"
              className="w-full object-cover"
            />
            <div className="absolute right-2 top-2 rounded bg-purple-600 px-2 py-1 text-xs">Analysis Result</div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3 text-xs">
              <div>Beverage (coffee)</div>
              <div>Tilt cup and pooled</div>
              <div>and exposure to</div>
              <div>transport</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Automated Quality Audits */}
      <Card className="border-0 bg-zinc-900/50 p-6">
        <h3 className="text-xl font-bold">Automated Quality Audits</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Ensure complete oversight by automating quality checks across all interactions
        </p>
        <div className="mt-6 space-y-4">
          <div className="rounded-lg bg-zinc-800/70 p-4">
            <div className="flex items-center gap-2 text-orange-400">
              <span className="text-lg">📋</span>
              <span className="font-medium">SOP coverage</span>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2 rounded-md bg-zinc-800 p-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Greeting & Introduction</span>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-zinc-800 p-3">
                <X className="h-5 w-5 text-red-500" />
                <span>Customer Sentiment</span>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-zinc-800 p-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Action</span>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-zinc-800 p-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Closure</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-zinc-800/70 p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <span>
                As a loyal customer, I find this experience very <span className="text-red-500">disappointing</span>
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Intelligent Conversations */}
      <Card className="border-0 bg-zinc-900/50 p-6">
        <h3 className="text-xl font-bold">Intelligent Conversations.</h3>
        <h3 className="text-xl font-bold">Effortless Support</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Seamlessly integrate data sources and SOPs to generate accurate responses and actions
        </p>
        <div className="mt-6">
          <div className="rounded-lg bg-zinc-800 p-4">
            <div className="mb-4 flex justify-end space-x-2">
              <div className="h-3 w-3 rounded-full bg-zinc-700"></div>
              <div className="h-3 w-3 rounded-full bg-zinc-700"></div>
              <div className="h-3 w-3 rounded-full bg-zinc-700"></div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg bg-purple-600 p-3 text-sm">Hello, how can I assist you today?</div>
              <div className="rounded-lg bg-zinc-700 p-3 text-right text-sm">I received a spilled coffee.</div>
              <div className="rounded-lg bg-purple-600 p-3 text-sm">
                Please upload an image of the spilled coffee so that I can assist you better.
              </div>
              <div className="flex justify-end">
                <div className="w-32 rounded-lg bg-zinc-700 p-2">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-zinc-600"></div>
                    <span className="text-xs">Sure, here it is.</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-purple-600 p-3 text-sm">
                Thanks for the image! I was able to verify the spillage. Would you like a replacement or refund?
              </div>
              <div className="rounded-lg bg-zinc-700 p-3 text-right text-sm">A replacement works for me.</div>
              <div className="rounded-lg bg-purple-600 p-3 text-sm">
                Thanks for the confirmation! A replacement order has been placed for you.
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Voice AI Agents */}
      <Card className="border-0 bg-zinc-900/50 p-6">
        <h3 className="text-xl font-bold">Voice AI Agents</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Build and deploy low cost voice AI agents that talk and take actions like humans
        </p>
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 rounded-md bg-zinc-800 p-3">
            <Mic className="h-5 w-5 text-muted-foreground" />
            <span>Low latency audio streaming</span>
          </div>
          <div className="flex items-center gap-3 rounded-md bg-zinc-800 p-3">
            <span className="flex h-5 w-5 items-center justify-center text-muted-foreground">🌐</span>
            <span>Multilingual support</span>
          </div>
          <div className="flex items-center gap-3 rounded-md bg-zinc-800 p-3">
            <X className="h-5 w-5 text-muted-foreground" />
            <span>Function calling</span>
          </div>
        </div>
      </Card>

      {/* AI Powered Analytics */}
      <Card className="border-0 bg-zinc-900/50 p-6">
        <h3 className="text-xl font-bold">AI Powered Analytics</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Identify issues, ask questions and unlock valuable insights from your interactions
        </p>
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2 rounded-md bg-zinc-800 p-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">Type your question</span>
          </div>
          <div className="rounded-md bg-zinc-800 p-3 text-sm">Which issues frequently lead to escalations?</div>
        </div>
      </Card>
    </div>
  </section>
    );
}

export default FeatureGrid;
import { Button } from "@/components/ui/button";

const HeroSection = () => {
    return ( <div>
            <section className="relative min-h-[80vh] overflow-hidden ">
          {/* <GridBackground />
          <GeometricShapes /> */}
  
          <div className="container relative z-10 mx-auto flex min-h-[80vh] flex-col  items-center justify-center text-center">
            <h1
              className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl lg:text-7xl "
             
            >
              AI Agents, built for speed, scale, and quality
            </h1>
            <p
              className="mt-6 max-w-2xl text-lg text-muted-foreground"
            
              
            >
              Handling complex queries, boosting efficiency, and streamlining support, so your business scales faster with
              precision
            </p>
            <Button
              className="mt-8 bg-purple-600 px-8 py-6 text-base hover:bg-purple-700"
              style={{
                animation: "fadeInUp 0.8s ease-out 0.4s forwards",
                opacity: 0,
                transform: "translateY(20px)",
              }}
            >
              Get in touch
            </Button>
          </div>
        </section>
    </div> );
}
 
export default HeroSection;
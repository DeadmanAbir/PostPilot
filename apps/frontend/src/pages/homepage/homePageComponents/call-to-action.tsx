import { Button } from "@/components/ui/button";

const CallToAction  = () => {
    return (         <section className="container mx-auto py-20">
        <div className="rounded-xl bg-zinc-900 px-6 py-16 text-center">
          <h2 className="text-4xl font-bold">Ready to transform your business?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Get started and see how AI can transform your customer interactions—faster, smarter, better.
          </p>
          <Button className="mt-8 bg-purple-600 px-8 py-6 text-base hover:bg-purple-700">Get in touch</Button>
        </div>
      </section> );
}
 
export default CallToAction;
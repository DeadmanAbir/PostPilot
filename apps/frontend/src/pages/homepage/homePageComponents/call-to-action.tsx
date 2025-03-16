import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
  <div className="w-full border-b-2 border-dotted">
 <section className="container mx-auto border-r-[2px] border-l-2 border-dotted ">
    <div className=" bg-zinc-900 px-6 py-16 text-center">
      <h2 className="text-4xl font-bold">Ready to transform your business?</h2>
      <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
        Get started and see how AI can transform your customer interactions—faster, smarter, better.
      </p>
      <Button className="mt-8 bg-purple-600 px-8 py-6 text-base hover:bg-purple-700">Get in touch</Button>
    </div>
  </section>
  </div>
 );
}

export default CallToAction;
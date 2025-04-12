import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Faq = () => {
  return (<div className="z-50 max-w-2xl w-full flex flex-col gap-6 my-20">
    <div className="text-center text-4xl tracking-wider">
    Frequently Asked Questions
    </div>
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-none bg-blue-300/20 backdrop-blur-2xl px-5">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>

  </div>);
}

export default Faq;
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    id: "item-1",
    question: "Is it accessible?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    id: "item-2",
    question: "How do I get started?",
    answer: "Just sign up and follow the onboarding process to get started.",
  },
  {
    id: "item-3",
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial for all new users.",
  },
  {
    id: "item-4",
    question: "Can I cancel anytime?",
    answer:
      "Absolutely! You can cancel your subscription at any time with no additional charges.",
  },
  {
    id: "item-5",
    question: "Do you offer customer support?",
    answer: "Yes, our support team is available 24/7 via email and live chat.",
  },
];

const Faq = () => {
  return (
    <div className="z-50 max-w-2xl w-full flex flex-col gap-6 my-20 ">
      <div className="text-center text-4xl tracking-wider">
        Frequently Asked Questions
      </div>
      <div className="px-4 md:px-0">
      <Accordion type="single" collapsible>
        {faqData.map(({ id, question, answer }) => (
          <AccordionItem
            key={id}
            value={id}
            className="border-none bg-blue-300/20 backdrop-blur-2xl px-5"
          >
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      </div>
   
    </div>
  );
};

export default Faq;

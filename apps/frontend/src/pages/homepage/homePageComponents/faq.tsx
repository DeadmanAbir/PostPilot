import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqData = [
  {
    id: 'item-1',
    question: 'Is it accessible?',
    answer:
      'Yes! PostPilot works across all devices with an intuitive interface designed for professionals at all technical levels.',
  },
  {
    id: 'item-2',
    question: 'How do I get started?',
    answer:
      'Simply create an account, connect your LinkedIn profile, and start creating or enhancing posts immediately with our AI-powered tools.',
  },

  {
    id: 'item-5',
    question: 'Do you offer customer support?',
    answer:
      'Yes, I am available via chat and email to assist with any questions or technical issues you might encounter.',
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
              className="border-none bg-blue-500/20 backdrop-blur-2xl px-5 my-2 rounded-xl"
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

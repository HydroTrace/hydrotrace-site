import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is water allocation?",
    answer: "Answer coming soon.",
  },
  {
    question: "Why does abstraction data matter?",
    answer: "Answer coming soon.",
  },
  {
    question: "What is the status quo?",
    answer: "Answer coming soon.",
  },
];

const FAQ = () => {
  return (
    <section className="py-24 bg-[#faf7ef]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-xl mb-12">Learn more</h2>
          
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-[#21177a]/20"
              >
                <AccordionTrigger className="text-xl font-semibold text-[#21177a] hover:no-underline py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-lg text-muted-foreground leading-relaxed pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

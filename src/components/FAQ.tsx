import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is water allocation?",
    answer: "Understanding HydroTrace begins with understanding water allocation, which is the process of distributing access to finite water resources among competing users.\n\nAcross the world, allocation frameworks take many forms, from government-issued licences and quotas to market-based water rights and trading systems. Each aims to balance equity, efficiency, and sustainability, but the reality is increasingly complex. Climate variability, shifting economic pressures, and rising irrigation demand are placing unprecedented stress on these systems.\n\nEffective allocation depends on transparency, reliable data, and adaptive decision-making. Yet fragmented information systems, manual reporting, and slow feedback loops often make it difficult for regulators to assess compliance or anticipate resource stress.",
  },
  {
    question: "Why does abstraction data matter?",
    answer: "Abstraction data is essential for understanding the balance between how much water is removed from a system and how much is naturally replenished. Groundwater use can remain sustainable only when recharge meets or exceeds extraction. To define sustainable yield, authorities need a clear view of the main inputs and outputs of each aquifer. Because irrigation draws the largest volumes in many regions, reliable abstraction data is a critical part of this balance. Without it, risks to stressed aquifers often remain hidden until they become severe.\n\nAbstraction data also shows how efficiently farms convert water into yield and economic value. Indicators such as crop produced per cubic metre of water, applied water productivity, and economic water productivity all rely on accurate measurement. These metrics reveal differences between irrigation methods, crop choices, and management practices, and they help identify opportunities for improved efficiency, better scheduling, and targeted support.\n\nModern abstraction monitoring closes an important information gap. When data is collected manually or inconsistently, agencies must rely on estimates that cannot capture actual use or quantify consumptive demand, blue-water footprints, or irrigation losses. Reliable, high-frequency monitoring provides the foundation for fair allocation, meaningful compliance, and long-term aquifer protection.\n\nProvable and standardised abstraction volumes are also a prerequisite for any water allocation system that allows trading of entitlements or volumes. Without trustworthy measurements, it is impossible to account for transfers, reconcile use against rights, or maintain confidence in the system.\n\nIn practical terms, good abstraction data shifts water management from reactive crisis response to proactive stewardship. It transforms static records into operational intelligence for both regulators and farmers.",
  },
  {
    question: "What is the status quo?",
    answer: "In most regions, abstraction data is scattered across multiple systems and reporting channels. Farmers often submit readings to different agencies, sometimes through paper forms, spreadsheets, or unstructured emails. Each organisation collects data in its own format, which makes it difficult to assemble a complete picture of water use across a basin.\n\nBecause much of this reporting is manual, the quality of the data varies widely. Readings may be missing, delayed, or inconsistent, and few systems include validation checks that confirm whether a number is realistic or whether it aligns with previous patterns. As a result, regulators spend significant time cleaning data or filling gaps with assumptions, and important trends often remain hidden.\n\nThis fragmented status quo limits the ability of both farmers and regulators to make timely decisions. Without a unified, reliable view of actual abstraction, it is difficult to assess compliance, understand resource pressure, or plan for changing conditions. Modernisation begins with improving the consistency, quality, and accessibility of the data itself.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-[#faf7ef] relative overflow-hidden">
      {/* Left grid pattern fading toward center */}
      <div 
        className="absolute inset-y-0 left-0 w-1/3 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15, 30, 148, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 30, 148, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
        }}
      />
      
      {/* Right grid pattern fading toward center */}
      <div 
        className="absolute inset-y-0 right-0 w-1/3 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15, 30, 148, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 30, 148, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                <AccordionContent className="text-lg text-muted-foreground leading-relaxed pb-6 whitespace-pre-line">
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

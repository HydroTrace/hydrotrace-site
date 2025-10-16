import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import waterGovernanceImage from "@/assets/resource-water-governance.png";
import municipalImage from "@/assets/resource-municipal.jpg";
import industrialImage from "@/assets/resource-industrial.jpg";
import conservationImage from "@/assets/resource-conservation.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const resources = [
  {
    id: "water-governance",
    title: "Accountable and Transparent Water Governance",
    description: "Building confidence between regulators, farmers, and communities through transparent data and accountable systems.",
    image: waterGovernanceImage,
    slug: "water-governance",
    isActive: true
  },
  {
    id: "municipal-water-supply",
    title: "Municipal Water Supply",
    description: "Track and verify urban water distribution for transparent public service delivery",
    image: municipalImage,
    slug: "municipal-water-supply",
    isActive: false
  },
  {
    id: "industrial-water-compliance",
    title: "Industrial Water Compliance",
    description: "Monitor industrial water extraction and maintain regulatory compliance",
    image: industrialImage,
    slug: "industrial-water-compliance",
    isActive: false
  },
  {
    id: "groundwater-conservation",
    title: "Groundwater Conservation",
    description: "Protect aquifer systems through verifiable monitoring and sustainable practices",
    image: conservationImage,
    slug: "groundwater-conservation",
    isActive: false
  }
];

const Resources = ({ className }: { className?: string }) => {
  return (
    <section className={`py-24 ${className || ''}`} style={{ backgroundColor: '#e8f4f8' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative">
          <Carousel 
            className="w-full"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {resources.map((resource, index) => (
                <CarouselItem key={resource.id} className="pl-4 md:basis-4/5 lg:basis-3/4">
                  <div className="p-4">
                    <div 
                      className={`border-2 border-border rounded-2xl overflow-hidden transition-all duration-300 bg-card shadow-lg relative ${
                        resource.isActive 
                          ? '' 
                          : 'opacity-50 blur-[2px] cursor-default'
                      }`}
                    >
                      <div className="grid md:grid-cols-2 gap-0">
                        <div className="p-4 flex items-center">
                          <img
                            src={resource.image}
                            alt={resource.title}
                            className="w-full h-full object-cover aspect-square rounded-xl"
                          />
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center bg-card">
                          <h3 className="text-2xl md:text-3xl font-bold mb-4 font-['DM_Serif_Text'] text-foreground">
                            {resource.title}
                          </h3>
                          <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                            {resource.description}
                          </p>
                          <div className="flex items-center text-foreground font-semibold group hover:gap-2 transition-all">
                            {resource.isActive ? 'Coming soon...' : 'Read the case study'}
                            {resource.isActive && <ArrowRight className="ml-2 h-5 w-5" />}
                          </div>
                        </div>
                      </div>
                      {!resource.isActive && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
                          <div className="bg-card border-2 border-border px-8 py-4 rounded-lg shadow-xl">
                            <p className="text-xl font-semibold text-foreground font-['DM_Serif_Text']">
                              New insights coming soon
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
          
          {/* Blur overlay for side items */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#e8f4f8] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#e8f4f8] to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
};

export default Resources;

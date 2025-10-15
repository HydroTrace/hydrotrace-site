import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import agricultureImage from "@/assets/resource-agriculture.jpg";
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
    id: "agricultural-water-management",
    title: "Agricultural Water Management",
    description: "Optimize irrigation systems and ensure sustainable water use for farming communities",
    image: agricultureImage,
    slug: "agricultural-water-management"
  },
  {
    id: "municipal-water-supply",
    title: "Municipal Water Supply",
    description: "Track and verify urban water distribution for transparent public service delivery",
    image: municipalImage,
    slug: "municipal-water-supply"
  },
  {
    id: "industrial-water-compliance",
    title: "Industrial Water Compliance",
    description: "Monitor industrial water extraction and maintain regulatory compliance",
    image: industrialImage,
    slug: "industrial-water-compliance"
  },
  {
    id: "groundwater-conservation",
    title: "Groundwater Conservation",
    description: "Protect aquifer systems through verifiable monitoring and sustainable practices",
    image: conservationImage,
    slug: "groundwater-conservation"
  }
];

const Resources = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  const handleResourceClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <section className={`py-24 ${className || ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {resources.map((resource) => (
                <CarouselItem key={resource.id}>
                  <div className="p-4">
                    <div 
                      onClick={() => handleResourceClick(resource.slug)}
                      className="border-2 border-border rounded-lg overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-300 bg-card"
                    >
                      <div className="grid md:grid-cols-2 gap-0">
                        <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                          <img
                            src={resource.image}
                            alt={resource.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                          <h3 className="text-2xl md:text-3xl font-bold mb-4 font-['DM_Serif_Text'] text-foreground">
                            {resource.title}
                          </h3>
                          <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                            {resource.description}
                          </p>
                          <div className="flex items-center text-foreground font-medium group hover:gap-2 transition-all">
                            Read the case study
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Resources;

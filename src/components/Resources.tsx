import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import agricultureImage from "@/assets/resource-agriculture.jpg";
import municipalImage from "@/assets/resource-municipal.jpg";
import industrialImage from "@/assets/resource-industrial.jpg";
import conservationImage from "@/assets/resource-conservation.jpg";

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
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-['DM_Serif_Text'] text-foreground">
            Applications & Use Cases
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
            Explore how HydroTrace enables transparent water management across diverse sectors
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource) => (
              <div
                key={resource.id}
                onClick={() => handleResourceClick(resource.slug)}
                className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group border border-border"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 font-['DM_Serif_Text'] text-foreground">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {resource.description}
                  </p>
                  <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;

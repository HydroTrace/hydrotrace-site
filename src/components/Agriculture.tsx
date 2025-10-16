import { cn } from "@/lib/utils";
import grassField from "@/assets/grass-field.png";

const Agriculture = ({ className }: { className?: string }) => {
  return (
    <section 
      className={cn("py-24 relative overflow-hidden", className)}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${grassField})` }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8 font-['DM_Serif_Text']">
            Strengthening Water Transparency in Agriculture
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Agriculture accounts for over 70% of global freshwater use — yet most irrigation systems still rely on manual reporting and outdated records. HydroTrace brings verifiable, digital transparency to water allocation and use, helping farmers and regulators manage water more fairly, efficiently, and sustainably.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Agriculture;

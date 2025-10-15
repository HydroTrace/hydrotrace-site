import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import teamMember1 from "@/assets/team-member-1.jpg";
import teamMember2 from "@/assets/team-member-2.jpg";
import teamMember3 from "@/assets/team-member-3.jpg";
import teamMember4 from "@/assets/team-member-4.jpg";

const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Chief Executive Officer",
    bio: "With over 15 years of experience in water resource management and technology innovation, Sarah leads HydroTrace's vision for transparent water governance.",
    image: teamMember1,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Chief Technology Officer",
    bio: "A blockchain expert and software architect, Michael oversees the development of HydroTrace's cutting-edge water tracking platform.",
    image: teamMember2,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Head of Research",
    bio: "Emily brings extensive expertise in environmental science and data analytics, driving innovation in water monitoring solutions.",
    image: teamMember3,
  },
  {
    id: 4,
    name: "James Williams",
    role: "Director of Operations",
    bio: "James ensures seamless implementation of HydroTrace solutions across agricultural, municipal, and industrial sectors.",
    image: teamMember4,
  },
];

const Team = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Story Section */}
      <section className="pt-32 pb-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-8">Our Story</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            HydroTrace was founded with a vision to revolutionize water management through 
            transparent, blockchain-powered tracking. Our team combines decades of expertise 
            in water resource management, technology innovation, and environmental science 
            to create solutions that ensure sustainable water use for future generations.
          </p>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16">Meet the Team</h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.id} className="group cursor-pointer">
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:blur-sm group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                    <p className="text-white text-center text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-light mb-1">
                  {member.role}
                </p>
                <h3 className="text-xl font-bold">
                  {member.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;

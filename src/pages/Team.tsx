import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const teamMembers = [
  {
    id: 1,
    name: "Dr. Kevin De Vriendt",
    role: "Founder, Groundwater Scientist",
    bio: "Kevin is a groundwater and environmental geoscientist with extensive experience in quantitative hydrogeology and sustainable water management. He has worked on international technical cooperation projects and capacity-building initiatives across Africa and the Middle East, focusing on groundwater scarcity and long-term sustainability challenges.",
  },
  {
    id: 2,
    name: "Dr. Georg Simhandl",
    role: "Co-founder, Software Developer / Systems Architect",
    bio: "Georg is a software engineer, researcher, and entrepreneur with more than 20 years of experience in software architecture, IoT, and distributed systems. He bridges academia and industry to drive innovation in data ecosystems, security, and sustainable technologies such as water management and the circular economy. He has led high-impact projects, founded a successful startup, and published extensively while teaching and mentoring the next generation of engineers.",
  },
  {
    id: 3,
    name: "Dr. Andreas Schuster",
    role: "Co-founder, Embedded Systems Engineer / Software Developer",
    bio: "Andreas is an embedded systems engineer with over a decade of experience developing hardware and software for embedded systems across a variety of fields and international research projects.",
  },
  {
    id: 4,
    name: "Maverick Huys",
    role: "Co-founder, Business Development and Finance",
    bio: "Maverick, a CFA Charterholder, provides strategic guidance on financial planning, investor relations, and partnership development for HydroTrace. His role integrates budgeting, capital structuring, risk management, and stakeholder engagement to support long-term sustainability and unlock future growth opportunities.",
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
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-black">
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

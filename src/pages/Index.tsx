import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Technology from "@/components/Technology";
import Collaboration from "@/components/Collaboration";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main>
        <Hero 
          title="Building Digital Foundations for Water Security"
          description="From Source to System: Blockchain for Traceable, Trustworthy Water Management"
        />
        <About />
        <Technology />
        <Collaboration />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

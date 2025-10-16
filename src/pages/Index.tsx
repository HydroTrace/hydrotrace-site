import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollOverlay from "@/components/ScrollOverlay";
import Agriculture from "@/components/Agriculture";
import About from "@/components/About";
import Technology from "@/components/Technology";
import Resources from "@/components/Resources";

import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
const Index = () => {
  return <div className="min-h-screen relative">
      <Navbar />
      <main>
        <Hero />
        <ScrollOverlay />
        <Agriculture className="bg-[#faf7ef]" />
        <About className="bg-[#faf5ee]" />
        <Technology className="bg-[#faf5ee]" />
        <Resources className="bg-muted/20" />
        
        <Contact />
      </main>
      <Footer />
    </div>;
};
export default Index;
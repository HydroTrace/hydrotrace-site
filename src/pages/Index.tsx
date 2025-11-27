import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
        <About className="bg-[#faf7ef]" />
        <Technology className="bg-[#faf5ee]" />
        <Resources className="bg-muted/20" />
        
        <Contact />
      </main>
      <Footer />
    </div>;
};
export default Index;
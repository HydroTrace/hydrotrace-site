import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollOverlay from "@/components/ScrollOverlay";
import About from "@/components/About";
import Technology from "@/components/Technology";
import Resources from "@/components/Resources";
import Collaboration from "@/components/Collaboration";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
const Index = () => {
  return <div className="min-h-screen relative">
      <Navbar />
      <main>
        <Hero />
        <ScrollOverlay />
        <About className="bg-[#f7f7e9]" />
        <Technology className="bg-[#faf5ee]" />
        <Resources className="bg-muted/20" />
        <Collaboration className="bg-slate-100" />
        <Contact />
      </main>
      <Footer />
    </div>;
};
export default Index;
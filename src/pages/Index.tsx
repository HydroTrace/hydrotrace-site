import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Technology from "@/components/Technology";
import Collaboration from "@/components/Collaboration";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
const Index = () => {
  return <div className="min-h-screen relative">
      <Navbar />
      <main>
        <Hero />
        <About className="bg-[#f9f9eb]" />
        <Technology className="bg-[#faf5ee]" />
        <Collaboration className="bg-slate-100" />
        <Contact />
      </main>
      <Footer />
    </div>;
};
export default Index;
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Solutions from "@/components/Solutions";
import Technology from "@/components/Technology";
import Resources from "@/components/Resources";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main>
        <Hero />
        <About className="bg-[#faf7ef]" />
        <Solutions className="bg-[#faf7ef]" />
        <Technology />
        <Resources className="bg-muted/20" />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
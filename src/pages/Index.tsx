import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeCards from "@/components/HomeCards";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main>
        <Hero />
        <HomeCards />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
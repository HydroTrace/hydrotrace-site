import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeCards from "@/components/HomeCards";
import Footer from "@/components/Footer";
import bgRings from "@/assets/hydrotrace-bg-sand.jpg.asset.json";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <div
        className="relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(8,14,30,0.25) 0%, rgba(8,14,30,0.15) 40%, rgba(8,14,30,0.55) 100%), url(${bgRings.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <main>
          <Hero />
          <HomeCards />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Index;

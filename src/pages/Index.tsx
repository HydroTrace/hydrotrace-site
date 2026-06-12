import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeCards from "@/components/HomeCards";
import Footer from "@/components/Footer";
import bgRings from "@/assets/hydrotrace-bg-fields.jpg.asset.json";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <div
        className="relative"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(8,14,30,0.85) 0%, rgba(8,14,30,0.55) 40%, rgba(8,14,30,0.35) 70%, rgba(8,14,30,0.45) 100%), url(${bgRings.url})`,
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

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Resources from "@/components/Resources";
import Footer from "@/components/Footer";
import bg from "@/assets/water-governance-bg.png.asset.json";

const DigitalWaterGovernance = () => {
  return (
    <div className="min-h-screen relative bg-white">
      <Navbar />

      <div className="sticky top-0 h-screen w-full z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(8,14,30,0.30) 0%, rgba(8,14,30,0.20) 40%, rgba(8,14,30,0.60) 100%), url(${bg.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="relative h-full">
          <Hero
            eyebrow="Digital Water Governance"
            headline={<>A Modern Data Layer for Agricultural Water Management.</>}
            description="Streamlining how ground and surface-water abstractions are captured and reported. Through consistent measurement, integrated verification, and clean digital workflows."
            scrollTargetId="resources"
          />
        </div>
      </div>

      <main className="relative z-10 bg-white">
        <Resources className="bg-[#FAFAF7]" />
        <Footer />
      </main>
    </div>
  );
};

export default DigitalWaterGovernance;

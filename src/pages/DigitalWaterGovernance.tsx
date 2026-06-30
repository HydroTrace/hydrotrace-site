import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GovernanceServices from "@/components/GovernanceServices";
import Footer from "@/components/Footer";
const bg = { url: "/images/water-governance-bg.jpg" };

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
            eyebrow="Water Governance"
            headline={<>Making water use legible.</>}
            description="From abstraction licences to crop demand. Translating physical water use into transparent, defensible data."
            scrollTargetId="governance-services"
          />
        </div>
      </div>

      <main id="governance-services" className="relative z-10 bg-white">
        <GovernanceServices />
        <Footer />
      </main>
    </div>
  );
};

export default DigitalWaterGovernance;

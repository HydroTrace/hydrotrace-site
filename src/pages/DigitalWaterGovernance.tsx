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
        <section className="bg-white py-24 md:py-32">
          <div className="px-6 sm:px-10 lg:px-16 max-w-[1100px] mx-auto">
            <p className="font-['Brown_Std'] font-light text-[#0A1B44]/85 text-lg md:text-xl leading-relaxed">
              Effective water management depends on knowing how much water is being used, where, and by whom. We help regulators, water authorities, and catchment managers build the data foundation that makes this possible. By combining physical demand estimation, licence register analysis, and satellite derived observations, we support more transparent, more adaptive, and more equitable allocation systems.
            </p>
          </div>
        </section>
        <GovernanceServices />
        <Footer />
      </main>
    </div>
  );
};

export default DigitalWaterGovernance;

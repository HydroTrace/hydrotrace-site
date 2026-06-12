import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
const bg = { url: "/images/water-risk-bg.jpg" };

const WaterRisk = () => {
  return (
    <div className="min-h-screen relative bg-white">
      <Navbar />

      <div className="sticky top-0 h-screen w-full z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(8,14,30,0.25) 0%, rgba(8,14,30,0.15) 40%, rgba(8,14,30,0.55) 100%), url(${bg.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="relative h-full">
          <Hero
            eyebrow="Water Risk"
            headline={<>Water stress translated.</>}
            description="Water risk is material. Most tools tell you where it exists. We tell you what it costs."
          />
        </div>
      </div>

      <main className="relative z-10 bg-white">
        <Footer />
      </main>
    </div>
  );
};

export default WaterRisk;

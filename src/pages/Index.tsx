import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeCards from "@/components/HomeCards";
import Footer from "@/components/Footer";
const bgRings = { url: "/images/hydrotrace-bg-sand.jpg" };

const Index = () => {
  return (
    <div className="min-h-screen relative bg-white">
      <Navbar />

      {/* Sticky hero — stays pinned, next section scrolls over it */}
      <div className="sticky top-0 h-screen w-full z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(8,14,30,0.25) 0%, rgba(8,14,30,0.15) 40%, rgba(8,14,30,0.55) 100%), url(${bgRings.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="relative h-full">
          <Hero />
        </div>
      </div>

      {/* Foreground content scrolls over the hero */}
      <main className="relative z-10 bg-white">
        <HomeCards />
        <Footer />
      </main>
    </div>
  );
};

export default Index;

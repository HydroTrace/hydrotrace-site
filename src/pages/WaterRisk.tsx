import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WaterRisk = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-semibold font-['Open_Sans'] text-[#21177a] mb-4">
            Water Risk
          </h1>
          <p className="text-lg text-[#249be0] font-['Fira_Code']">
            Coming soon
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WaterRisk;
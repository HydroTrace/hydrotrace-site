import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LearnMore = () => {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-[#faf7ef]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="heading-xl mb-8">
                Water Allocation & Governance
              </h1>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Water allocation is the process of distributing available water resources among competing users and uses. As freshwater becomes increasingly scarce, effective allocation systems are essential for sustainable management.
                </p>
                <p>
                  HydroTrace provides the digital infrastructure needed to support modern water governance frameworks—ensuring transparency, accountability, and data-driven decision making at every level.
                </p>
                <h2 className="heading-l mt-12 mb-6">
                  Why Digital Water Governance Matters
                </h2>
                <p>
                  Traditional water management relies on manual records, paper-based reporting, and fragmented data systems. This creates gaps in accountability and makes it difficult to track actual usage against allocated volumes.
                </p>
                <p>
                  Digital systems like HydroTrace bridge this gap by providing real-time visibility into water abstractions, automated compliance tracking, and verifiable audit trails that support both users and regulators.
                </p>
                <h2 className="heading-l mt-12 mb-6">
                  Our Approach
                </h2>
                <p>
                  We focus on making water data trustworthy through consistent measurement protocols, integrated verification workflows, and clean digital interfaces that reduce friction for all stakeholders.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LearnMore;

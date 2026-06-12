import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/hydrotrace-logo-v2.png.asset.json";
const logoIcon = logoAsset.url;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      scrollToSection("hero");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo */}
          <div
            className="flex-shrink-0 pr-8 h-full flex items-center gap-3 cursor-pointer"
            onClick={handleLogoClick}
          >
            <img
              src={logoIcon}
              alt="HydroTrace Logo"
              className="h-10 w-auto"
            />
            <span className="text-[24px] font-normal font-['Brown_Std'] tracking-tight text-white hover:text-white/80 transition-colors">
              HydroTrace
            </span>
            <span className="ml-6 h-7 w-px bg-white/40" aria-hidden />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center h-full">
            <button
              onClick={() => { setIsMenuOpen(false); navigate("/water-risk"); }}
              className="px-6 py-2 text-white/90 hover:text-white transition-colors font-light text-[18px] tracking-wide font-['Brown_Std']"
            >
              <span className="relative inline-block group">
                Water Risk
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </span>
            </button>
            <button
              onClick={() => { setIsMenuOpen(false); navigate("/digital-water-governance"); }}
              className="px-6 py-2 text-white/90 hover:text-white transition-colors font-light text-[18px] tracking-wide font-['Brown_Std']"
            >
              <span className="relative inline-block group">
                Digital Water Governance
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </span>
            </button>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center ml-auto h-full">
            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center gap-2 px-5 py-2 text-white border border-white/70 hover:bg-white/10 transition-colors font-light text-[18px] tracking-wide font-['Brown_Std']"
            >
              Contact us
              <span aria-hidden>→</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-white/80 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 bg-black/70 backdrop-blur-sm border-t border-white/20 mt-0 p-4">
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => { setIsMenuOpen(false); navigate("/water-risk"); }}
                className="text-white/90 hover:text-white transition-colors text-left font-light text-[15px] tracking-wide px-3 py-3 font-['Brown_Std']"
              >
                Water Risk
              </button>
              <button
                onClick={() => { setIsMenuOpen(false); navigate("/digital-water-governance"); }}
                className="text-white/90 hover:text-white transition-colors text-left font-light text-[15px] tracking-wide px-3 py-3 font-['Brown_Std']"
              >
                Digital Water Governance
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-white border border-white/70 hover:bg-white/10 transition-colors text-left font-light text-[15px] tracking-wide px-3 py-3 mt-2 font-['Brown_Std']"
              >
                Contact us →
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
const logoLight = { url: "/images/hydrotrace-logo-v2.png" };
const logoDark = { url: "/images/hydrotrace-logo-dark.png" };

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isDarkPage = location.pathname === "/water-risk";

  useEffect(() => {
    const onScroll = () => {
      // Switch to dark mode once we've scrolled past most of the hero
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const textColor = scrolled && !isDarkPage ? "text-[#0A1B44]" : "text-white";
  const textColorMuted = scrolled && !isDarkPage ? "text-[#0A1B44]/85" : "text-white/90";
  const underlineColor = scrolled && !isDarkPage ? "bg-[#0A1B44]" : "bg-white";
  const borderColor = scrolled && !isDarkPage ? "border-[#0A1B44]/70" : "border-white/70";
  const hoverBg = scrolled && !isDarkPage ? "hover:bg-[#0A1B44]/5" : "hover:bg-white/10";
  const dividerColor = scrolled && !isDarkPage ? "bg-[#0A1B44]/40" : "bg-white/40";
  const bgClass = isDarkPage
    ? "bg-black/60 backdrop-blur-sm"
    : scrolled
    ? "bg-white/90 backdrop-blur-sm"
    : "bg-transparent";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${bgClass}`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo */}
          <div
            className="flex-shrink-0 pr-8 h-full flex items-center gap-3 cursor-pointer"
            onClick={handleLogoClick}
          >
            <img
              src={scrolled ? logoDark.url : logoLight.url}
              alt="HydroTrace Logo"
              className="h-10 w-auto transition-opacity duration-500"
            />
            <span
              className={`text-[24px] font-normal font-['Brown_Std'] tracking-tight transition-colors ${textColor}`}
            >
              HydroTrace
            </span>
            <span className={`ml-6 h-7 w-px ${dividerColor}`} aria-hidden />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center h-full">
            <button
              onClick={() => { setIsMenuOpen(false); navigate("/water-risk"); }}
              className={`px-6 py-2 transition-colors font-light text-[18px] tracking-wide font-['Brown_Std'] ${textColorMuted} hover:${textColor}`}
            >
              <span className="relative inline-block group">
                Water Risk
                <span className={`absolute left-0 bottom-0 w-full h-[2px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 ${underlineColor}`} />
              </span>
            </button>
            <button
              onClick={() => { setIsMenuOpen(false); navigate("/digital-water-governance"); }}
              className={`px-6 py-2 transition-colors font-light text-[18px] tracking-wide font-['Brown_Std'] ${textColorMuted} hover:${textColor}`}
            >
              <span className="relative inline-block group">
                Digital Water Governance
                <span className={`absolute left-0 bottom-0 w-full h-[2px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 ${underlineColor}`} />
              </span>
            </button>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center ml-auto h-full">
            <button
              onClick={() => scrollToSection("contact")}
              className={`inline-flex items-center gap-2 px-5 py-2 border transition-colors font-light text-[18px] tracking-wide font-['Brown_Std'] ${textColor} ${borderColor} ${hoverBg}`}
            >
              Contact us
              <span aria-hidden>→</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`transition-colors ${textColor}`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden pb-4 backdrop-blur-sm mt-0 p-4 border-t ${scrolled ? "bg-white/95 border-[#0A1B44]/15" : "bg-black/70 border-white/20"}`}>
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => { setIsMenuOpen(false); navigate("/water-risk"); }}
                className={`transition-colors text-left font-light text-[15px] tracking-wide px-3 py-3 font-['Brown_Std'] ${textColorMuted}`}
              >
                Water Risk
              </button>
              <button
                onClick={() => { setIsMenuOpen(false); navigate("/digital-water-governance"); }}
                className={`transition-colors text-left font-light text-[15px] tracking-wide px-3 py-3 font-['Brown_Std'] ${textColorMuted}`}
              >
                Digital Water Governance
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`border transition-colors text-left font-light text-[15px] tracking-wide px-3 py-3 mt-2 font-['Brown_Std'] ${textColor} ${borderColor}`}
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

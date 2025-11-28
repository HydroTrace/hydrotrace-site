import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoIcon from "@/assets/hydrotrace-icon.png";

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#0f1e94]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo - bordered */}
          <div 
            className="flex-shrink-0 pr-8 border-r border-[#0f1e94] h-full flex items-center gap-3 cursor-pointer"
            onClick={handleLogoClick}
          >
            <img 
              src={logoIcon} 
              alt="HydroTrace Logo" 
              className="h-10 w-auto" 
            />
            <span 
              className="text-[22px] font-semibold font-['IBM_Plex_Mono'] tracking-tight text-[#101982] hover:text-[#044dde] transition-colors"
            >
              HydroTrace
            </span>
          </div>
          
          {/* Desktop Navigation - bordered group */}
          <div className="hidden md:flex items-center h-full border-r border-[#0f1e94]">
            <button 
              onClick={() => scrollToSection("about")} 
              className="px-6 py-2 text-[#101982] hover:text-[#044dde] transition-colors font-normal text-[19px] tracking-wide font-['IBM_Plex_Mono']"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("about")} 
              className="px-6 py-2 text-[#101982] hover:text-[#044dde] transition-colors font-normal text-[19px] tracking-wide font-['IBM_Plex_Mono']"
            >
              Why
            </button>
            <button 
              onClick={() => scrollToSection("faq")} 
              className="px-6 py-2 text-[#101982] hover:text-[#044dde] transition-colors font-normal text-[19px] tracking-wide font-['IBM_Plex_Mono']"
            >
              Learn more
            </button>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center ml-auto h-full pl-6">
            <button 
              onClick={() => scrollToSection("contact")} 
              className="px-6 py-2.5 text-white bg-[#0f1e94] hover:bg-[#044dde] transition-colors font-normal text-[19px] tracking-wide font-['IBM_Plex_Mono'] rounded"
            >
              Contact us
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-[#0A1B44] hover:text-[#0f1e94] transition-colors" 
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 bg-white border-t border-[#0f1e94] mt-0 p-4">
            <div className="flex flex-col space-y-1">
              <button 
                onClick={() => scrollToSection("about")} 
                className="text-[#101982] hover:text-[#044dde] transition-colors text-left font-normal text-[19px] tracking-wide px-3 py-3 rounded font-['IBM_Plex_Mono']"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection("about")} 
                className="text-[#101982] hover:text-[#044dde] transition-colors text-left font-normal text-[19px] tracking-wide px-3 py-3 rounded font-['IBM_Plex_Mono']"
              >
                Why
              </button>
              <button 
                onClick={() => scrollToSection("faq")} 
                className="text-[#101982] hover:text-[#044dde] transition-colors text-left font-normal text-[19px] tracking-wide px-3 py-3 rounded font-['IBM_Plex_Mono']"
              >
                Learn more
              </button>
              <button 
                onClick={() => scrollToSection("contact")} 
                className="text-white bg-[#0f1e94] hover:bg-[#044dde] transition-colors text-left font-normal text-[19px] tracking-wide px-3 py-3 rounded mt-2 font-['IBM_Plex_Mono']"
              >
                Contact us
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

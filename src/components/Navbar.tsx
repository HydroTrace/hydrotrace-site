import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
              className="h-9 w-auto" 
            />
            <span 
              className="text-xl font-semibold font-['Open_Sans'] tracking-tight"
              style={{ color: '#1523bd' }}
            >
              HydroTrace
            </span>
          </div>
          
          {/* Desktop Navigation - bordered group */}
          <div className="hidden md:flex items-center h-full border-r border-[#0f1e94]">
            <Link 
              to="/team" 
              className="px-6 py-2 text-[#0A1B44] hover:text-[#0f1e94] transition-colors font-medium text-base tracking-wide font-['Open_Sans']"
            >
              About
            </Link>
            <button 
              onClick={() => scrollToSection("technology")} 
              className="px-6 py-2 text-[#0A1B44] hover:text-[#0f1e94] transition-colors font-medium text-base tracking-wide font-['Open_Sans']"
            >
              Technology
            </button>
            <button 
              onClick={() => scrollToSection("resources")} 
              className="px-6 py-2 text-[#0A1B44] hover:text-[#0f1e94] transition-colors font-medium text-base tracking-wide font-['Open_Sans']"
            >
              Resources
            </button>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center ml-auto h-full pl-6">
            <button 
              onClick={() => scrollToSection("contact")} 
              className="px-6 py-2.5 text-white bg-[#0f1e94] hover:bg-[#0f1e94]/90 transition-colors font-medium text-base tracking-wide font-['Open_Sans'] rounded"
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
              <Link 
                to="/team" 
                onClick={() => setIsMenuOpen(false)} 
                className="text-[#0A1B44] hover:bg-[#F5F7FA] transition-colors text-left font-medium text-base tracking-wide px-3 py-3 rounded font-['Open_Sans']"
              >
                About
              </Link>
              <button 
                onClick={() => scrollToSection("technology")} 
                className="text-[#0A1B44] hover:bg-[#F5F7FA] transition-colors text-left font-medium text-base tracking-wide px-3 py-3 rounded font-['Open_Sans']"
              >
                Technology
              </button>
              <button 
                onClick={() => scrollToSection("resources")} 
                className="text-[#0A1B44] hover:bg-[#F5F7FA] transition-colors text-left font-medium text-base tracking-wide px-3 py-3 rounded font-['Open_Sans']"
              >
                Resources
              </button>
              <button 
                onClick={() => scrollToSection("contact")} 
                className="text-white bg-[#0f1e94] hover:bg-[#0f1e94]/90 transition-colors text-left font-medium text-base tracking-wide px-3 py-3 rounded mt-2 font-['Open_Sans']"
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

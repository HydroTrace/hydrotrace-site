import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoBlack from "@/assets/hydrotrace-logo-black.png";

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#DCE2EE] shadow-[0px_1px_3px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 pr-8 border-r border-[#DCE2EE]">
            <img 
              src={logoBlack} 
              alt="HydroTrace Logo" 
              className="h-8 w-auto cursor-pointer" 
              onClick={handleLogoClick} 
            />
          </div>
          
          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center pl-8">
            <Link 
              to="/team" 
              className="px-5 py-2 text-[#0A1B44] hover:text-[#0A1B44]/70 transition-colors font-medium text-sm tracking-wide"
            >
              About
            </Link>
            <button 
              onClick={() => scrollToSection("technology")} 
              className="px-5 py-2 text-[#0A1B44] hover:text-[#0A1B44]/70 transition-colors font-medium text-sm tracking-wide"
            >
              Technology
            </button>
            <button 
              onClick={() => scrollToSection("resources")} 
              className="px-5 py-2 text-[#0A1B44] hover:text-[#0A1B44]/70 transition-colors font-medium text-sm tracking-wide"
            >
              Resources
            </button>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center ml-auto pl-6 border-l border-[#DCE2EE]">
            <button 
              onClick={() => scrollToSection("contact")} 
              className="px-5 py-2 text-white bg-[#0A1B44] hover:bg-[#0A1B44]/90 transition-colors font-medium text-sm tracking-wide rounded"
            >
              Contact us
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-[#0A1B44] hover:text-[#0A1B44]/70 transition-colors" 
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 bg-white border-t border-[#DCE2EE] mt-0 p-4">
            <div className="flex flex-col space-y-1">
              <Link 
                to="/team" 
                onClick={() => setIsMenuOpen(false)} 
                className="text-[#0A1B44] hover:bg-[#F5F7FA] transition-colors text-left font-medium text-sm tracking-wide px-3 py-3 rounded"
              >
                About
              </Link>
              <button 
                onClick={() => scrollToSection("technology")} 
                className="text-[#0A1B44] hover:bg-[#F5F7FA] transition-colors text-left font-medium text-sm tracking-wide px-3 py-3 rounded"
              >
                Technology
              </button>
              <button 
                onClick={() => scrollToSection("resources")} 
                className="text-[#0A1B44] hover:bg-[#F5F7FA] transition-colors text-left font-medium text-sm tracking-wide px-3 py-3 rounded"
              >
                Resources
              </button>
              <button 
                onClick={() => scrollToSection("contact")} 
                className="text-white bg-[#0A1B44] hover:bg-[#0A1B44]/90 transition-colors text-left font-medium text-sm tracking-wide px-3 py-3 rounded mt-2"
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

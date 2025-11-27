import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoBlack from "@/assets/hydrotrace-logo-black.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src={logoBlack} 
              alt="HydroTrace Logo" 
              className="h-10 w-auto cursor-pointer" 
              onClick={handleLogoClick} 
            />
          </div>
          
          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/team" 
              className="px-4 py-2 text-foreground hover:text-foreground/70 transition-colors font-medium text-sm"
            >
              About
            </Link>
            <button 
              onClick={() => scrollToSection("technology")} 
              className="px-4 py-2 text-foreground hover:text-foreground/70 transition-colors font-medium text-sm"
            >
              Technology
            </button>
            <button 
              onClick={() => scrollToSection("resources")} 
              className="px-4 py-2 text-foreground hover:text-foreground/70 transition-colors font-medium text-sm"
            >
              Resources
            </button>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button 
              onClick={() => scrollToSection("contact")} 
              className="px-5 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-medium text-sm"
            >
              Contact us
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-foreground hover:text-foreground/70 transition-colors" 
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 bg-background/95 backdrop-blur-sm rounded-lg mt-2 p-4 border border-border">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/team" 
                onClick={() => setIsMenuOpen(false)} 
                className="text-foreground hover:text-accent transition-colors text-left font-medium px-2 py-2"
              >
                About
              </Link>
              <button 
                onClick={() => scrollToSection("technology")} 
                className="text-foreground hover:text-accent transition-colors text-left font-medium px-2 py-2"
              >
                Technology
              </button>
              <button 
                onClick={() => scrollToSection("resources")} 
                className="text-foreground hover:text-accent transition-colors text-left font-medium px-2 py-2"
              >
                Resources
              </button>
              <button 
                onClick={() => scrollToSection("contact")} 
                className="text-foreground hover:text-accent transition-colors text-left font-medium px-2 py-2"
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

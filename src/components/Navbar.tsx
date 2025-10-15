import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoWhite from "@/assets/hydrotrace-logo-white.png";
import logoBlack from "@/assets/hydrotrace-logo-black.png";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Get the scroll overlay section
      const scrollOverlay = document.getElementById('scroll-overlay');
      if (scrollOverlay) {
        const overlayBottom = scrollOverlay.offsetTop + scrollOverlay.offsetHeight;
        // Keep white styling until we scroll past the scroll overlay section
        setIsScrolled(window.scrollY > overlayBottom - 100);
      } else {
        // Fallback if section not found
        setIsScrolled(window.scrollY > 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation and then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth"
          });
        }
      }, 100);
    } else {
      // We're already on home page, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth"
        });
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
  // Force dark mode on blog page
  const isBlogPage = location.pathname.startsWith("/blog");
  const shouldUseDarkMode = isScrolled || isBlogPage;
  
  const navTextColor = shouldUseDarkMode ? "text-foreground" : "text-white";
  const navHoverColor = shouldUseDarkMode ? "hover:text-foreground/70" : "hover:text-white/80";
  const currentLogo = shouldUseDarkMode ? logoBlack : logoWhite;

  return <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Navigation Links */}
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0">
              <img src={currentLogo} alt="HydroTrace Logo" className="h-12 w-auto cursor-pointer" onClick={handleLogoClick} />
            </div>
            
            {/* Desktop Navigation - Left Side */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection("about")} className={`${navTextColor} ${navHoverColor} transition-colors font-['DM_Serif_Text'] text-lg`}>
                About us
              </button>
              <button onClick={() => scrollToSection("contact")} className={`${navTextColor} ${navHoverColor} transition-colors font-['DM_Serif_Text'] text-lg`}>
                Contact us
              </button>
              <Link to="/blog" className={`${navTextColor} ${navHoverColor} transition-colors font-['DM_Serif_Text'] text-lg`}>
                Learn More
              </Link>
            </div>
          </div>

          {/* Empty spacer for alignment */}
          <div className="hidden md:block"></div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${navTextColor} ${navHoverColor} transition-colors`} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden pb-4 bg-background/95 backdrop-blur-sm rounded-lg mt-2 p-4">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection("about")} className="text-foreground hover:text-accent transition-colors text-left font-['DM_Serif_Text']">
                About us
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-foreground hover:text-accent transition-colors text-left font-['DM_Serif_Text']">
                Contact us
              </button>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-accent transition-colors text-left font-['DM_Serif_Text']">
                Learn More
              </Link>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navbar;
const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm mb-3">
            © 2025 HydroTrace | Water Transparency through Technology
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-primary-foreground/70">
            <a href="/privacy" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#contact" className="hover:text-primary-foreground transition-colors">
              Contact
            </a>
            <span>•</span>
            <a href="https://twitter.com/hydrotrace" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">
              Socials
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

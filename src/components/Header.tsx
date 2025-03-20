
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent scrolling when mobile menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out-expo py-4 px-6 md:px-10",
        isScrolled
          ? "bg-white/80 dark:bg-background/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight">
          <span className="text-primary">Ajay</span>
          <span className="text-muted-foreground">Gupta</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="ml-1"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-40 transition-all duration-500 ease-out-expo",
          isMobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col h-full bg-background dark:bg-background border-t border-border p-6">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="py-3 px-4 text-lg font-medium text-foreground rounded-md hover:bg-secondary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

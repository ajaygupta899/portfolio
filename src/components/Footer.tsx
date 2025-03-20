
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { 
      name: "Github", 
      icon: <Github className="w-5 h-5" />, 
      url: "https://github.com/ajaygupta899/" 
    },
    { 
      name: "LinkedIn", 
      icon: <Linkedin className="w-5 h-5" />, 
      url: "https://www.linkedin.com/in/ajay-gupta-47a88b92" 
    },
    { 
      name: "Email", 
      icon: <Mail className="w-5 h-5" />, 
      url: "mailto:ajaygupta.gupta899@gmail.com" 
    },
  ];

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-secondary/80 dark:bg-background py-12">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center">
          <button
            onClick={scrollToTop}
            className="mb-8 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          
          <Link to="/" className="text-2xl font-bold tracking-tight mb-6">
            <span className="text-primary">Ajay</span>
            <span className="text-muted-foreground">Gupta</span>
          </Link>
          
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <div className="flex gap-4 mb-8">
            {socialLinks.map((link) => (
              <a 
                key={link.name}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Ajay Gupta. All rights reserved.</p>
            <p className="mt-1">Full-Stack Developer</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

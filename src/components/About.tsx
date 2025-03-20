
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, User } from "lucide-react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  const socialLinks = [
    { 
      name: "Github", 
      icon: <Github className="w-5 h-5" />, 
      url: "https://github.com/ajaygupta899" 
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

  return (
    <section id="about" className="py-24 bg-secondary/50 dark:bg-secondary/10">
      <div className="container px-4 mx-auto">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-2 text-center">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">
              About Me
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12"
          >
            Who I Am
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <motion.div variants={itemVariants} className="col-span-2">
              <p className="text-lg text-muted-foreground mb-6">
                I am a skilled full-stack developer with expertise in building modern, responsive web applications and services. With a strong foundation in both front-end and back-end technologies, I specialize in creating seamless user experiences and robust server architectures.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                My journey in web development began with a passion for creating intuitive interfaces that solve real-world problems. Over the years, I've honed my skills across various technologies and frameworks, allowing me to build complete applications from concept to deployment.
              </p>
              <p className="text-lg text-muted-foreground">
                I'm constantly learning and adapting to new technologies, with a focus on writing clean, maintainable code that delivers exceptional performance and user experiences.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <div className="glass-morphism p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Info
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Jamshedpur, Jharkhand</span>
                  </li>
                  <li className="text-muted-foreground">
                    <span className="font-medium text-foreground">Languages:</span> English (Intermediate), Hindi (Fluent)
                  </li>
                </ul>
              </div>
              
              <div className="glass-morphism p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
                <div className="flex gap-3">
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
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

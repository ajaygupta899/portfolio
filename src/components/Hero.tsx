
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import DownloadButton from "./DownloadButton";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(120,119,198,0.1),transparent)]" />
      </div>
      
      <div className="container px-4 py-32 mx-auto">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="max-w-4xl"
          >
            <motion.div variants={itemVariants} className="mb-2">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">
                Full-Stack Developer
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6"
            >
              Hello, I'm <span className="text-primary dark:text-primary-foreground">Ajay Gupta</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
            >
              A passionate full-stack developer specializing in React, Node.js, MongoDB, PHP, Python, and Java. I create modern, responsive, and user-friendly web applications.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <DownloadButton />
              <a 
                href="#contact" 
                className="group rounded-full px-6 py-3 bg-secondary text-foreground hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
              >
                Contact Me
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
          >
            <a href="#about" className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-foreground">
              <ArrowDown className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

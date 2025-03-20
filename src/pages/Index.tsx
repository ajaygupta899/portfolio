
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-background z-50"
          >
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 flex items-center justify-center animate-spin">
                  <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 animate-pulse">
                  <span className="text-2xl font-bold">AG</span>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground animate-pulse">Loading...</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col"
          >
            <Header />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

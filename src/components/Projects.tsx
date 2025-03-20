
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    live?: string;
    github?: string;
    details?: string;
  };
  category: string;
}

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
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
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Rajasthani Ludo",
      description: "An interactive online multiplayer game built with React, Node.js, Socket.io, MongoDB, and Redis.",
      image: "/rjludo.png",
      tags: ["React", "Node.js", "Socket.io", "MongoDB", "Redis"],
      links: {
        live: "https://rajasthaniludo.com/",
        details: "/project/1"
      },
      category: "Gaming"
    },
    {
      id: 2,
      title: "Akadda",
      description: "Another popular gaming platform with real-time multiplayer functionality using WebSockets.",
      image: "/akadda.png",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      links: {
        live: "https://akadda.com/",
        details: "/project/2"
      },
      category: "Gaming"
    },
    {
      id: 3,
      title: "Real Ludo Player",
      description: "A feature-rich online board game with advanced gameplay mechanics and social features.",
      image: "/realludo.png",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      links: {
        live: "https://www.realludoplayer.com/",
        details: "/project/3"
      },
      category: "Gaming"
    },
    {
      id: 4,
      title: "Ludo Home",
      description: "A casual gaming platform focused on providing a seamless Ludo experience for players.",
      image: "/ludo.png",
      tags: ["React", "Node.js", "MongoDB"],
      links: {
        live: "https://ludohomev1.morniinc.in/",
        details: "/project/4"
      },
      category: "Gaming"
    },
    {
      id: 5,
      title: "Friend Ludo",
      description: "Social-focused Ludo game that emphasizes playing with friends in real-time.",
      image: "/friend.png",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      links: {
        live: "https://friendludo.com/",
        details: "/project/5"
      },
      category: "Gaming"
    },
    {
      id: 6,
      title: "Video Streaming App",
      description: "A full-featured video streaming platform with user accounts and content management.",
      image: "/video.jpg",
      tags: ["Python", "Django", "MySQL"],
      links: {
        details: "/project/6"
      },
      category: "Web App"
    },
    {
      id: 7,
      title: "Dating App",
      description: "A mobile dating application with matching algorithms and messaging features.",
      image: "/dating.jpg",
      tags: ["Android Studio", "Java"],
      links: {
        details: "/project/7"
      },
      category: "Mobile"
    },
    {
      id: 8,
      title: "Wedding Management System",
      description: "A comprehensive system for managing wedding planning, guests, and vendors.",
      image: "/wedding.webp",
      tags: ["PHP", "MySQL", "Ajax"],
      links: {
        details: "/project/8"
      },
      category: "Web App"
    },
  ];
  
  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];
  
  // Filter projects based on active category
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  return (
    <section id="projects" className="py-24 bg-secondary/50 dark:bg-secondary/10">
      <div className="container px-4 mx-auto">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-2 text-center">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">
              My Work
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12"
          >
            Featured Projects
          </motion.h2>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
          </motion.div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="group glass-morphism rounded-xl overflow-hidden"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="flex gap-3">
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                            aria-label="View live site"
                          >
                            <ExternalLink className="w-4 h-4 text-white" />
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                            aria-label="View GitHub repository"
                          >
                            <Github className="w-4 h-4 text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                    
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

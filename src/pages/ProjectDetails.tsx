
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  content: string;
  date: string;
  technologies: string[];
  images: string[];
  links: {
    live?: string;
    github?: string;
  };
}

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock data - in a real app, this would be fetched from an API
      const mockProject: Project = {
        id: Number(id),
        title: "Rajasthani Ludo",
        description: "An interactive online multiplayer game built with React, Node.js, Socket.io, MongoDB, and Redis.",
        content: `
          <p>Rajasthani Ludo is a modern take on the classic board game, designed to provide a seamless online multiplayer experience for players around the world. The game features a beautiful interface, real-time interactions, and advanced gameplay mechanics.</p>
          
          <h2>Key Features</h2>
          <ul>
            <li>Real-time multiplayer gameplay using Socket.io</li>
            <li>Private game rooms for playing with friends</li>
            <li>Public matchmaking system</li>
            <li>In-game chat functionality</li>
            <li>User profiles and statistics tracking</li>
            <li>Responsive design for desktop and mobile</li>
            <li>Authentication and secure game state management</li>
          </ul>
          
          <h2>Technical Implementation</h2>
          <p>The application is built on a modern tech stack, leveraging the best tools for real-time web applications:</p>
          
          <h3>Frontend</h3>
          <p>The client-side application is built with React, featuring:</p>
          <ul>
            <li>Custom animations and transitions for dice rolling and piece movement</li>
            <li>React hooks for state management</li>
            <li>Socket.io client for real-time communication</li>
            <li>Responsive design using CSS Grid and Flexbox</li>
            <li>Optimized assets for fast loading</li>
          </ul>
          
          <h3>Backend</h3>
          <p>The server is powered by Node.js with Express, featuring:</p>
          <ul>
            <li>Socket.io for managing game state and player actions</li>
            <li>MongoDB for persistent data storage</li>
            <li>Redis for caching and pub/sub messaging</li>
            <li>JWT authentication for secure user sessions</li>
            <li>RESTful API endpoints for user management</li>
          </ul>
          
          <h2>Challenges and Solutions</h2>
          <p>Building a real-time multiplayer game presented several challenges:</p>
          
          <h3>Game State Synchronization</h3>
          <p>To ensure all players see the same game state, we implemented a server-authoritative model with client-side prediction. This minimizes the impact of network latency while preventing cheating.</p>
          
          <h3>Scaling for Concurrent Players</h3>
          <p>To handle thousands of concurrent players, we utilized Redis for pub/sub messaging between server instances, allowing horizontal scaling of the application.</p>
          
          <h3>Handling Disconnections</h3>
          <p>To provide a smooth experience even when players temporarily disconnect, we implemented a reconnection mechanism that allows players to rejoin their game within a specified time window.</p>
          
          <h2>Results</h2>
          <p>Since its launch, Rajasthani Ludo has achieved:</p>
          <ul>
            <li>Over 10,000 registered users</li>
            <li>Average of 1,000 concurrent players during peak hours</li>
            <li>High engagement with users playing an average of 5 games per session</li>
            <li>Strong retention with 60% of users returning within a week</li>
          </ul>
        `,
        date: "April 2022 - Present",
        technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Redis", "JWT", "Express"],
        images: [
          "https://via.placeholder.com/800x600",
          "https://via.placeholder.com/800x600",
          "https://via.placeholder.com/800x600",
          "https://via.placeholder.com/800x600",
        ],
        links: {
          live: "https://rajasthaniludo.com/",
          github: "https://github.com/yourusername/rajasthani-ludo",
        },
      };
      
      setProject(mockProject);
      setIsLoading(false);
    }, 1000);
  }, [id]);

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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        {isLoading ? (
          <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[50vh]">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : project ? (
          <motion.article
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto px-4 py-16 max-w-6xl"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <Link 
                to="/" 
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Link>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2 order-2 lg:order-1">
                <motion.h1 
                  variants={itemVariants}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
                >
                  {project.title}
                </motion.h1>
                
                <motion.p
                  variants={itemVariants}
                  className="text-lg text-muted-foreground mb-8"
                >
                  {project.description}
                </motion.p>
                
                <motion.div
                  variants={itemVariants}
                  className="relative aspect-video overflow-hidden rounded-xl mb-8"
                >
                  <img 
                    src={project.images[activeImage]} 
                    alt={`${project.title} screenshot ${activeImage + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  className="flex gap-3 mb-8 overflow-x-auto pb-2"
                >
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                        activeImage === index 
                          ? 'border-primary' 
                          : 'border-transparent hover:border-primary/50'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="prose prose-lg dark:prose-invert max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              </div>
              
              <motion.div 
                variants={itemVariants}
                className="lg:col-span-1 order-1 lg:order-2"
              >
                <div className="glass-morphism p-6 rounded-xl sticky top-28">
                  <h2 className="text-xl font-semibold mb-6">Project Details</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm uppercase text-muted-foreground mb-2">Timeline</h3>
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        {project.date}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm uppercase text-muted-foreground mb-2">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span 
                            key={tech}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm uppercase text-muted-foreground mb-2">Links</h3>
                      <div className="space-y-3">
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Live Site
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <Github className="w-4 h-4" />
                            View Source Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.article>
        ) : (
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Project not found</h2>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

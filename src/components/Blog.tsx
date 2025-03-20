
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export default function Blog() {
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

  // Sample blog posts
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Building Real-time Multiplayer Games with Socket.io",
      excerpt: "Learn how to create engaging multiplayer experiences using WebSockets and Socket.io with React and Node.js.",
      date: "June 15, 2023",
      readTime: "8 min",
      category: "Web Development",
      image: "https://via.placeholder.com/800x600"
    },
    {
      id: 2,
      title: "Optimizing MongoDB for High-Traffic Applications",
      excerpt: "Discover advanced techniques to scale your MongoDB database for applications with millions of users.",
      date: "May 23, 2023",
      readTime: "10 min",
      category: "Databases",
      image: "https://via.placeholder.com/800x600"
    },
    {
      id: 3,
      title: "The Complete Guide to Redis Caching in Node.js",
      excerpt: "Learn how to implement efficient caching strategies using Redis to dramatically improve your application's performance.",
      date: "April 10, 2023",
      readTime: "12 min",
      category: "Performance",
      image: "https://via.placeholder.com/800x600"
    }
  ];

  return (
    <section id="blog" className="py-24">
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
              Latest Articles
            </span>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="group glass-morphism rounded-xl overflow-hidden"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-black/30 backdrop-blur-sm text-white">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} read
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Read Article
                    <ArrowUpRight className="ml-1 w-3 h-3" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
          
          <motion.div variants={itemVariants} className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
            >
              View All Articles
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

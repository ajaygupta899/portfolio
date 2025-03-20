

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Contact() {
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

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5 text-primary" />,
      title: "Location",
      details: "https://www.google.com/maps/place/Jamshedpur,+Jharkhand/@22.7840072,86.093369,12z/data=!3m1!4b1!4m6!3m5!1s0x39f5e31989f0e2b5:0xeeec8e81ce9b344!8m2!3d22.8045665!4d86.2028754!16zL20vMDF0dGp4?entry=ttu&g_ep=EgoyMDI1MDMxOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      icon: <Mail className="w-5 h-5 text-primary" />,
      title: "Email",
      details: "mailto:ajaygupta.gupta899@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5 text-primary" />,
      title: "Phone",
      details: "tel:9162899535",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-secondary/50 dark:bg-secondary/10">
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
              Get In Touch
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12"
          >
            Contact Me
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {contactInfo.map((item, index) => (
                <a
                href={item.details}>
                <motion.div 
                key={index}
                variants={itemVariants}
                className="glass-morphism p-6 rounded-xl flex items-start gap-4"
              >
                <div className="flex-shrink-0 rounded-full p-3 bg-primary/10">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">{item.title}</h3>
                </div>
              </motion.div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

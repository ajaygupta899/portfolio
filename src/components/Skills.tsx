
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  category: string;
}

export default function Skills() {
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
        staggerChildren: 0.1
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

  const skills: Skill[] = [
    // Frontend
    { name: "React", level: 90, category: "Frontend" },
    { name: "React Native", level: 65, category: "Frontend" },
    { name: "TypeScript", level: 85, category: "Frontend" },
    { name: "HTML", level: 95, category: "Frontend" },
    { name: "CSS", level: 90, category: "Frontend" },
    { name: "JavaScript", level: 95, category: "Frontend" },
    
    // Backend
    { name: "Node.js", level: 88, category: "Backend" },
    { name: "PHP", level: 85, category: "Backend" },
    { name: "Python", level: 80, category: "Backend" },
    { name: "Java (Spring Boot)", level: 75, category: "Backend" },
    { name: "REST API", level: 90, category: "Backend" },
    
    // Databases
    { name: "MySQL", level: 85, category: "Database" },
    { name: "MongoDB", level: 90, category: "Database" },
    { name: "Redis", level: 80, category: "Database" },
    
    // DevOps & Tools
    { name: "AWS", level: 75, category: "DevOps" },
    { name: "BullMQ", level: 70, category: "DevOps" },
    { name: "Socket.io", level: 85, category: "DevOps" },
    
    // Mobile Development
    { name: "Android Studio (Java)", level: 70, category: "Mobile" },
    
    // Testing
    { name: "NodeJS Unit Test", level: 80, category: "Testing" },
  ];

  // Group skills by category
  const skillCategories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Order of categories
  const categoryOrder = ["Frontend", "Backend", "Database", "DevOps", "Mobile", "Testing"];
  
  return (
    <section id="skills" className="py-24">
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
              My Expertise
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12"
          >
            Skills & Technologies
          </motion.h2>
          
          <div className="space-y-10">
            {categoryOrder.map(category => (
              skillCategories[category] && (
                <motion.div key={category} variants={itemVariants}>
                  <h3 className="text-xl font-semibold mb-6">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillCategories[category].map((skill, index) => (
                      <motion.div 
                        key={skill.name}
                        variants={itemVariants}
                        custom={index}
                        className="glass-morphism p-5 rounded-xl"
                      >
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

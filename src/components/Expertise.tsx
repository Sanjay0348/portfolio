

import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faAws,
  faNodeJs,
} from "@fortawesome/free-brands-svg-icons";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,

  useSpring,

} from "framer-motion";

import {
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
import Chip from "@mui/material/Chip";
import "../assets/styles/Expertise.scss";
import Skills from "./Skills";

const skills = [
   {
    icon: faNodeJs,
    title: "Backend & Microservices",
    description:
      "Build high-performance serverless and microservices architectures with event-driven patterns. Achieved 35% faster API response times and 40% peak load reduction through AWS Step Functions and async processing.",
    techStack: ["Node.js", "Express", "Python", "FastAPI", "MongoDB", "MySQL", "Kafka", "Redis"],
  },
  {
    icon: faReact,
    title: "Frontend & UI Engineering",
    description:
      "Develop responsive, production-grade web applications with modern frameworks and performance optimization. Improved frontend load times by 30% through code splitting and lazy loading strategies.",
    techStack: [
      "React",
      "Angular",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3/SASS",
      "Vite",
      "Webpack",
    ],
  },
  {
    icon: faAws,
    title: "Cloud & DevOps Infrastructure",
    description:
      "Design and deploy cloud-native, serverless applications on AWS with CI/CD automation. Reduced infrastructure costs by 22% through efficient resource utilization and modular architecture design.",
    techStack: ["AWS Lambda", "EC2", "S3", "Step Functions", "CloudFormation", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    icon: faRobot,
    title: "AI/LLM & RAG Systems",
    description:
      "Engineer intelligent systems using LLMs, RAG pipelines, and semantic search. Built production AI applications with LangChain, ChromaDB, and prompt engineering, reducing manual effort by 70%.",
    techStack: [
      "LangChain",
      "RAG",
      "ChromaDB",
      "OpenAI",
      "Hugging Face",
      "Prompt Engineering",
      "NLP",
      "Edge-TTS",
    ],
  },
];

function Expertise({ mode }: { mode: string }) {
  const [activeSkill, setActiveSkill] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef :any= useRef(null);
  const { scrollY } = useScroll();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });


  // Transform scroll progress to background hue rotation
  const backgroundHue = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.1, 0.15]);
  
  // Smooth spring animation for the background effect
  const smoothBackgroundHue = useSpring(backgroundHue, { stiffness: 100, damping: 30 });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e:any) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleSkillClick = (index:any) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveSkill(activeSkill === index ? null : index);
      setIsAnimating(false);
    }, 300);
  };

  const getProgressValue = (index:any) => {
    const baseLevels = [92, 89, 85, 78];
    return baseLevels[index % baseLevels.length];
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (value:any) => ({
      width: `${value}%`,
      transition: { duration: 1, ease: "easeOut" }
    })
  };

  // Animation variants for skill cards
  const skillCardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (index:any) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, delay: index * 0.1 }
    }),
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  // Generate grid patterns based on mouse position
  const generateGridBackground = () => {
    const x = mousePosition.x;
    const y = mousePosition.y;

    if (!containerRef.current) return {};

    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = ((x - rect.left) / rect.width) * 100;
    const relativeY = ((y - rect.top) / rect.height) * 100;

    return {
      background: `radial-gradient(circle at ${relativeX}% ${relativeY}%, 
        ${mode === "dark" ? "rgba(100, 100, 255, 0.15)" : "rgb(149, 168, 182)"} 0%, 
        transparent 60%)`,
      backgroundBlendMode: "overlay"
    };
  };

  return (
    <motion.div 
      className="expertise-container" 
      id="expertise"
      ref={containerRef}
      style={{
        position: "relative",
        ...generateGridBackground(),
        //  scale: smoothScale,
      }}
       
    >
      {/* Dynamic background gradient */}
      <motion.div
        className="scrolling-background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          // backgroundColor: mode === "dark" ? "#121212" : "#f8f8f8",  
          backgroundImage: `linear-gradient(${smoothBackgroundHue}deg, 
            ${mode === "dark" ? "rgba(70, 70, 150, " : "rgba(100, 200, 255, "}${backgroundOpacity}), 
            transparent)`,
          pointerEvents: "none"
        }}
      />

      <div className="skills-container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Expertise
        </motion.h1>
        
        <motion.p 
          className="expertise-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          3 years building production-grade, cloud-native systems with expertise in 
          serverless architectures, AI/LLM integration, and performance engineering. 
          AWS Certified Developer with proven track record of optimizing scalability, 
          reducing costs, and delivering high-availability solutions.
        </motion.p>
    <motion.div 
          className="expertise-highlight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div 
            className="highlight-item"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span 
              className="highlight-number"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
            >
              3+
            </motion.span>
            <span className={`highlight-text${mode === "dark" ? "-dark" : ""}`}>
              Years Experience
            </span>
          </motion.div>
          <motion.div 
            className="highlight-item"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span 
              className="highlight-number"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1, type: "spring" }}
            >
              AWS
            </motion.span>
            <span className={`highlight-text${mode === "dark" ? "-dark" : ""}`}>
              Certified Developer
            </span>
          </motion.div>
        
        </motion.div>
          <Skills mode={mode}/>
        <div className={`skills-grid ${mode=='dark'?"darkth":"lightth"}`}>
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className={`skill ${activeSkill === index ? "active" : ""} ${
                isAnimating ? "animating" : ""
              }`}
              onClick={() => handleSkillClick(index)}
              custom={index}
              variants={skillCardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              <div className="skill-header">
                <motion.div
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.4 }
                  }}
                >
                  <FontAwesomeIcon
                    icon={skill.icon}
                    size="2x"
                    className="skill-icon"
                  />
                </motion.div>
                <h3>{skill.title}</h3>
              </div>

              <div className="skill-progress">
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    custom={getProgressValue(index)}
                    variants={progressVariants}
                    initial="hidden"
                    animate="visible"
                  ></motion.div>
                </div>
                <motion.span 
                  className="progress-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {getProgressValue(index)}%
                </motion.span>
              </div>

              <p className="skill-description">{skill.description}</p>

              <div className="flex-chips">
                <span className="chip-title">Tech stack:</span>
                <div className="chips-container">
                  {skill.techStack.map((label, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <Chip
                        className={`chip-${mode === "dark" ? "dark" : "light"}`}
                        label={label}
                        variant={activeSkill === index ? "filled" : "outlined"}
                        clickable
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        
  
      
      </div>
    </motion.div>
  );
}

export default Expertise;

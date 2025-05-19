// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faReact,
//   faDocker,
//   faPython,
//   faAws,
//   faNodeJs,
// } from "@fortawesome/free-brands-svg-icons";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   useInView,
//   useSpring,
//   AnimatePresence,
// } from "framer-motion";
// import {
//   faServer,
//   faDatabase,
//   faCloud,
//   faCode,
//   faRobot,
// } from "@fortawesome/free-solid-svg-icons";
// import Chip from "@mui/material/Chip";
// import "../assets/styles/Expertise.scss";

// const skills = [
//   {
//     icon: faReact,
//     title: "Frontend Development",
//     description:
//       "I build responsive, interactive web applications using modern frontend technologies with a focus on optimized user experiences and scalable architecture.",
//     techStack: [
//       "React",
//       "TypeScript",
//       "JavaScript",
//       "HTML5",
//       "CSS3",
//       "SASS",
//       "Angular",
//     ],
//   },
//   {
//     icon: faNodeJs,
//     title: "Backend Development",
//     description:
//       "I develop robust server-side applications with focus on RESTful APIs, database integration, and microservices architecture for scalable solutions.",
//     techStack: ["Node.js", "Express", "Python", "MongoDB", "NoSQL", "MySQL"],
//   },
//   {
//     icon: faAws,
//     title: "Cloud & DevOps",
//     description:
//       "I leverage cloud platforms and DevOps practices to deploy, orchestrate, and maintain applications with high availability and scalability.",
//     techStack: ["AWS", "EC2", "S3", "Lambda", "Step Functions", "Docker"],
//   },
//   {
//     icon: faRobot,
//     title: "GenAI & LLM",
//     description:
//       "I integrate AI capabilities into applications, building intelligent systems that process natural language and transform data into valuable insights.",
//     techStack: [
//       "OpenAI",
//       "Hugging Face",
//       "Together AI",
//       "Edge-TTS",
//       "LLM Pipelines",
//     ],
//   },
// ];

// function Expertise({ mode }: { mode: string }) {
//   const [activeSkill, setActiveSkill] = useState(null);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const handleSkillClick = (index: any) => {
//     setIsAnimating(true);
//     setTimeout(() => {
//       setActiveSkill(activeSkill === index ? null : index);
//       setIsAnimating(false);
//     }, 300);
//   };

//   const getProgressValue = (index: any) => {
//     const baseLevels = [92, 89, 85, 78];
//     return baseLevels[index % baseLevels.length];
//   };
//   const progressVariants = {
//   hidden: { width: 0 },
//   visible: (value: number) => ({
//     width: `${value}%`,
//     transition: { duration: 1, ease: "easeOut" }
//   })
// };

//   return (
//     <div className="container" id="expertise">
//       <div className="skills-container">
//         <h1>Expertise</h1>
//         <p className="expertise-intro">
//           Specialized in modern web development with experience in optimizing
//           workflow processes, creating scalable applications, and implementing
//           cloud solutions.
//         </p>

//         <div className="skills-grid">
//           {skills.map((skill, index) => (
//             <div
//               key={index}
//               className={`skill ${activeSkill === index ? "active" : ""} ${
//                 isAnimating ? "animating" : ""
//               }`}
//               onClick={() => handleSkillClick(index)}
//             >
//               <div className="skill-header">
//                 <FontAwesomeIcon
//                   icon={skill.icon}
//                   size="2x"
//                   className="skill-icon"
//                 />
//                 <h3>{skill.title}</h3>
//               </div>

//               <div className="skill-progress">
//                 <div className="progress-bar">
//                  <motion.div
//                       className="progress-fill"
//                       custom={getProgressValue(index)}
//                       variants={progressVariants}
//                       initial="hidden"
//                       animate={"visible"}
//                     ></motion.div>
//                 </div>
//                 <span className="progress-text">
//                   {getProgressValue(index)}%
//                 </span>
//               </div>

//               <p className="skill-description">{skill.description}</p>

//               <div className="flex-chips">
//                 <span className="chip-title">Tech stack:</span>
//                 <div className="chips-container">
//                   {skill.techStack.map((label, i) => (
//                     <Chip
//                       key={i}
//                       className={`chip-${mode === "dark" ? "dark" : "light"}`}
//                       label={label}
//                       variant={activeSkill === index ? "filled" : "outlined"}
//                       clickable
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="expertise-highlight">
//           <div className="highlight-item">
//             <span className="highlight-number">2+</span>
//             <span className={`highlight-text${mode === "dark" ? "-dark" : ""}`}>
//               Years Experience
//             </span>
//           </div>
//           {/* <div className="highlight-item">
//             <span className="highlight-number">10+</span>
//             <span className={`highlight-text${mode === "dark" ? "-dark" : ""}`}>Projects Completed</span>
//           </div> */}
//           <div className="highlight-item">
//             <span className="highlight-number">AWS</span>
//             <span className={`highlight-text${mode === "dark" ? "-dark" : ""}`}>
//               Certified Developer
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Expertise;


import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faDocker,
  faPython,
  faAws,
  faNodeJs,
} from "@fortawesome/free-brands-svg-icons";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  faServer,
  faDatabase,
  faCloud,
  faCode,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
import Chip from "@mui/material/Chip";
import "../assets/styles/Expertise.scss";

const skills = [
   {
    icon: faNodeJs,
    title: "Backend Development",
    description:
      "I develop robust server-side applications with focus on RESTful APIs, database integration, and microservices architecture for scalable solutions.",
    techStack: ["Node.js", "Express", "Python", "MongoDB", "NoSQL", "MySQL"],
  },
  {
    icon: faReact,
    title: "Frontend Development",
    description:
      "I build responsive, interactive web applications using modern frontend technologies with a focus on optimized user experiences and scalable architecture.",
    techStack: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "SASS",
      "Angular",
    ],
  },
 
  {
    icon: faAws,
    title: "Cloud & DevOps",
    description:
      "I leverage cloud platforms and DevOps practices to deploy, orchestrate, and maintain applications with high availability and scalability.",
    techStack: ["AWS", "EC2", "S3", "Lambda", "Step Functions", "Docker"],
  },
  {
    icon: faRobot,
    title: "GenAI & LLM",
    description:
      "I integrate AI capabilities into applications, building intelligent systems that process natural language and transform data into valuable insights.",
    techStack: [
      "OpenAI",
      "Hugging Face",
      "Together AI",
      "Edge-TTS",
      "LLM Pipelines",
    ],
  },
];

function Expertise({ mode }: { mode: string }) {
  const [activeSkill, setActiveSkill] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef :any= useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

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
      className="container" 
      id="expertise"
      ref={containerRef}
      style={{
        position: "relative",
        ...generateGridBackground(),
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
          backgroundColor: mode === "dark" ? "#121212" : "#f8f8f8",
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
          Specialized in modern web development with experience in optimizing
          workflow processes, creating scalable applications, and implementing
          cloud solutions.
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
              2+
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

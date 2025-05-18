import React, { useState } from "react";
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
    icon: faNodeJs,
    title: "Backend Development",
    description:
      "I develop robust server-side applications with focus on RESTful APIs, database integration, and microservices architecture for scalable solutions.",
    techStack: ["Node.js", "Express", "Python", "MongoDB", "NoSQL", "MySQL"],
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

  const handleSkillClick = (index: any) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveSkill(activeSkill === index ? null : index);
      setIsAnimating(false);
    }, 300);
  };

  const getProgressValue = (index: any) => {
    const baseLevels = [92, 89, 85, 78];
    return baseLevels[index % baseLevels.length];
  };
  const progressVariants = {
  hidden: { width: 0 },
  visible: (value: number) => ({
    width: `${value}%`,
    transition: { duration: 1, ease: "easeOut" }
  })
};

  return (
    <div className="container" id="expertise">
      <div className="skills-container">
        <h1>Expertise</h1>
        <p className="expertise-intro">
          Specialized in modern web development with experience in optimizing
          workflow processes, creating scalable applications, and implementing
          cloud solutions.
        </p>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`skill ${activeSkill === index ? "active" : ""} ${
                isAnimating ? "animating" : ""
              }`}
              onClick={() => handleSkillClick(index)}
            >
              <div className="skill-header">
                <FontAwesomeIcon
                  icon={skill.icon}
                  size="2x"
                  className="skill-icon"
                />
                <h3>{skill.title}</h3>
              </div>

              <div className="skill-progress">
                <div className="progress-bar">
                 <motion.div
                      className="progress-fill"
                      custom={getProgressValue(index)}
                      variants={progressVariants}
                      initial="hidden"
                      animate={"visible"}
                    ></motion.div>
                </div>
                <span className="progress-text">
                  {getProgressValue(index)}%
                </span>
              </div>

              <p className="skill-description">{skill.description}</p>

              <div className="flex-chips">
                <span className="chip-title">Tech stack:</span>
                <div className="chips-container">
                  {skill.techStack.map((label, i) => (
                    <Chip
                      key={i}
                      className={`chip-${mode === "dark" ? "dark" : "light"}`}
                      label={label}
                      variant={activeSkill === index ? "filled" : "outlined"}
                      clickable
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="expertise-highlight">
          <div className="highlight-item">
            <span className="highlight-number">2+</span>
            <span className={`highlight-text${mode === "dark" ? "-dark" : ""}`}>
              Years Experience
            </span>
          </div>
          {/* <div className="highlight-item">
            <span className="highlight-number">10+</span>
            <span className={`highlight-text${mode === "dark" ? "-dark" : ""}`}>Projects Completed</span>
          </div> */}
          <div className="highlight-item">
            <span className="highlight-number">AWS</span>
            <span className={`highlight-text${mode === "dark" ? "-dark" : ""}`}>
              Certified Developer
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expertise;


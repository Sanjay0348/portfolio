import React from "react";
import "../assets/styles/Skills.scss";

interface Skill {
  name: string;
}

interface SkillsProps {
  mode: String;
}

const Skills: React.FC<SkillsProps> = ({ mode }) => {
  const skills = [
    { name: "React" },
    { name: "Angular" },
    { name: "JavaScript" },
    { name: "TypeScript" },
    { name: "Node.js" },
    { name: "Python" },
    { name: "CSS/SCSS" },
    { name: "MongoDB" },
    { name: "Git" },
    { name: "Docker" },
    { name: "AWS" },
  ];
  return (
    <div className={`skills-marquee ${mode}`}>
      <div className="marquee">
        <div className="marquee-content">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <span>{skill.name}</span>
            </div>
          ))}
          {skills.map((skill, index) => (
            <div key={`duplicate-${index}`} className="skill-item">
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;

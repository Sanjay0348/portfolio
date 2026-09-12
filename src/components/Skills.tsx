import React from "react";
import "../assets/styles/Skills.scss";
import { skillCategories } from "../data/portfolio";

interface SkillsProps {
  mode: string;
}

const Skills: React.FC<SkillsProps> = ({ mode }) => {
  const marqueeSkills = skillCategories.flatMap((category) => category.items);

  return (
    <div className={`skills-panel ${mode}`}>
      <div className={`skills-marquee ${mode}`}>
        <div className="marquee">
          <div className="marquee-content">
            {marqueeSkills.map((skill, index) => (
              <div key={`${skill}-${index}`} className="skill-item">
                <span>{skill}</span>
              </div>
            ))}
            {marqueeSkills.map((skill, index) => (
              <div key={`duplicate-${skill}-${index}`} className="skill-item">
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="skill-categories">
        {skillCategories.map((category) => (
          <div key={category.title} className="skill-category">
            <h4>{category.title}</h4>
            <div className="category-tags">
              {category.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;

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
    // Languages
    { name: "JavaScript" },
    { name: "TypeScript" },
    { name: "Python" },
    
    // Frontend
    { name: "React" },
    { name: "Angular" },
    { name: "HTML5/CSS3" },
    { name: "SASS" },
    
    // Backend
    { name: "Node.js" },
    { name: "Express" },
    { name: "FastAPI" },
    
    // Databases
    { name: "MongoDB" },
    { name: "MySQL" },
    { name: "ChromaDB" },
    { name: "Redis" },
    
    // Cloud & DevOps
    { name: "AWS Lambda" },
    { name: "EC2" },
    { name: "S3" },
    { name: "Step Functions" },
    { name: "Docker" },
    { name: "Kubernetes" },
    { name: "CI/CD" },
    
    // AI/ML
    { name: "LangChain" },
    { name: "RAG" },
    { name: "LLMs" },
    { name: "NLP" },
    { name: "Prompt Engineering" },
    
    // Messaging & Monitoring
    { name: "Kafka" },
    { name: "Prometheus" },
    { name: "Grafana" },
    
    // Security & Auth
    { name: "JWT" },
    { name: "OAuth 2.0" },
    
    // Tools
    { name: "Git" },
    { name: "FFmpeg" },
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

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBriefcase, 
  faCode, 
  faCloud, 
  faChartLine, 
  faCheckCircle 
} from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss';

const timelineData = [
  {
    title: "Software Developer - Sify Technologies",
    subtitle: "Chennai, India",
    date: "Jul 2023 - Present",
    description: "Leading development on cloud-based applications with focus on AWS integration and workflow optimization.",
    icon: faCloud,
    skills: [
      "AWS Step Functions",
      "Backend Processing",
      "Workflow Optimization",
      "EC2",
      "S3",
      "MongoDB",
      "Docker"
    ],
    highlights: [
      "Optimized backend processing by implementing AWS Step Functions",
      "Reduced system strain during high-load events",
      "Enhanced scalability by modularizing heavy backend tasks"
    ],
    color: "#3a7bd5"
  },
  {
    title: "Software Developer Intern - ZOHO",
    subtitle: "Chennai, India",
    date: "2022",
    description: "Worked on full-stack development projects with focus on creating scalable solutions and API development.",
    icon: faCode,
    skills: [
      "Full-stack Development",
      "API Design",
      "Frontend Development",
      "User Experience"
    ],
    highlights: [
      "Developed RESTful APIs for data integration",
      "Created responsive UI components", 
      "Participated in code reviews and testing"
    ],
    color: "#00a591"
  },
  {
    title: "Full Stack Intern - SHIASH",
    subtitle: "Chennai, India",
    date: "2021",
    description: "Gained hands-on experience in web development fundamentals and database operations.",
    icon: faChartLine,
    skills: [
      "User Experience",
      "CRUD Operations",
      "Database Design",
      "Web Development"
    ],
    highlights: [
      "Built database-driven web applications",
      "Implemented CRUD functionality",
      "Designed user-friendly interfaces"
    ],
    color: "#6a11cb"
  },
  {
    title: "B.TECH Information Technology - Velammal Engineering College",
    subtitle: "Chennai, India",
    date: "Aug 2019 - Apr 2023",
    description: "CGPA: 8.99/10 with focus on computer science fundamentals and software development.",
    icon: faCheckCircle,
    skills: [
      "Object Oriented Programming",
      "Data Structures and Algorithms",
      "Databases",
      "Operating Systems",
      "Computer Networks",
      "Machine Learning"
    ],
    highlights: [
      "Completed advanced coursework in algorithms and data structures",
      "Studied information retrieval and image processing",
      "Gained strong foundation in software engineering principles"
    ],
    color: "#e83e8c"
  }
];

function Timeline({ mode }: { mode: string }) {
  const [activeElement, setActiveElement] = useState(null);
  const [visibleElements, setVisibleElements] = useState<(string | null)[]>([]);
  const [animateEntrance, setAnimateEntrance] = useState(false);
  
  const isDarkMode = mode === 'dark';

  useEffect(() => {
    // Set animate entrance after a small delay
    setTimeout(() => {
      setAnimateEntrance(true);
    }, 300);

    // Setup intersection observer for timeline elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleElements(prev => [...prev, entry.target.getAttribute('data-index')]);
        }
      });
    }, { threshold: 0.3 });

    // Observe timeline elements
    document.querySelectorAll('.vertical-timeline-element').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleElementClick = (index:any) => {
    setActiveElement(activeElement === index ? null : index);
  };

  // Determine theme-specific styles
  const getElementStyles = (entry:any, index:any) => {
    const isActive = activeElement === index;
    
    if (isDarkMode) {
      return {
        background: isActive ? `rgba(25, 25, 25, 0.95)` : 'rgba(25, 25, 25, 0.8)',
        boxShadow: isActive ? `0 8px 30px rgba(0, 0, 0, 0.3)` : `0 3px 10px rgba(0, 0, 0, 0.2)`,
        border: `1px solid ${entry.color}`,
        borderLeft: `5px solid ${entry.color}`
      };
    } else {
      return {
        background: isActive ? `rgba(255, 255, 255, 0.95)` : 'rgba(255, 255, 255, 0.8)',
        boxShadow: isActive ? `0 8px 30px rgba(0, 0, 0, 0.15)` : `0 3px 10px rgba(0, 0, 0, 0.1)`,
        border: `1px solid ${entry.color}`,
        borderLeft: `5px solid ${entry.color}`
      };
    }
  };

  const getArrowStyle = (index:any) => {
    if (isDarkMode) {
      return { 
        borderRight: `7px solid ${activeElement === index ? 'rgba(25, 25, 25, 0.95)' : 'rgba(25, 25, 25, 0.8)'}` 
      };
    } else {
      return { 
        borderRight: `7px solid ${activeElement === index ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)'}` 
      };
    }
  };

  return (
    <div id="history" className={`timeline-section ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="items-container">
        <div className="timeline-header">
          <h1>Career Journey</h1>
          <p className="timeline-intro">
            My professional journey in software development, featuring key roles and accomplishments
          </p>
        </div>

        <VerticalTimeline animate={animateEntrance} className={`${animateEntrance ? 'animate' : ''}`}>
          {timelineData.map((entry, index) => (
            <VerticalTimelineElement
              key={index}
              data-index={index}
              className={`vertical-timeline-element--work ${activeElement === index ? 'active' : ''} ${visibleElements.includes(index.toString()) ? 'visible' : ''}`}
              date={entry.date}
              iconStyle={{ background: entry.color, color: '#fff' }}
              icon={<FontAwesomeIcon icon={entry.icon} />}
              contentStyle={getElementStyles(entry, index)}
              contentArrowStyle={getArrowStyle(index)}
              onTimelineElementClick={() => handleElementClick(index)}
            >
              <div className="timeline-element-content" onClick={() => handleElementClick(index)}>
                <h3 className="vertical-timeline-element-title">{entry.title}</h3>
                <h4 className="vertical-timeline-element-subtitle">{entry.subtitle}</h4>
                <p className="timeline-description">{entry.description}</p>
                
                <div className={`timeline-details ${activeElement === index ? 'active' : ''}`}>
                  {entry.highlights && (
                    <div className="timeline-highlights">
                      <h5>Key Achievements:</h5>
                      <ul>
                        {entry.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {entry.skills && (
                    <div className="timeline-skills">
                      <h5>Skills & Technologies:</h5>
                      <div className="skill-tags">
                        {entry.skills.map((skill, i) => (
                          <span 
                            key={i} 
                            className="skill-tag"
                            style={{ borderColor: entry.color, color: entry.color }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="timeline-expand">
                  <span>{activeElement === index ? 'Show less' : 'Show more'}</span>
                </div>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
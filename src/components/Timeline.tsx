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
    setTimeout(() => {
      setAnimateEntrance(true);
    }, 300);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = entry.target.getAttribute('data-index');
          if (index && !visibleElements.includes(index)) {
            setVisibleElements(prev => [...prev, index]);
          }
        }
      });
    }, { threshold: 0.2 }); // Reduced threshold for more responsive visibility

    const elements = document.querySelectorAll('.vertical-timeline-element');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
}, [visibleElements]);


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


// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence, useAnimation } from "framer-motion";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faBriefcase, 
//   faCode, 
//   faCloud, 
//   faChartLine, 
//   faCheckCircle,
//   faAngleDown,
//   faAngleUp 
// } from '@fortawesome/free-solid-svg-icons';
// import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
// import 'react-vertical-timeline-component/style.min.css';
// import '../assets/styles/Timeline.scss';

// // Sample data (you would expand this with your full dataset)
// const timelineData = [{
//   title: "Software Developer - Sify Technologies",
//   subtitle: "Chennai, India",
//   date: "Jul 2023 - Present",
//   description: "Leading development on cloud-based applications with focus on AWS integration and workflow optimization.",
//   icon: faCloud,
//   skills: [
//     "AWS Step Functions",
//     "Backend Processing",
//     "Workflow Optimization",
//     "EC2",
//     "S3",
//     "MongoDB",
//     "Docker"
//   ],
//   highlights: [
//     "Optimized backend processing by implementing AWS Step Functions",
//     "Reduced system strain during high-load events",
//     "Enhanced scalability by modularizing heavy backend tasks"
//   ],
//   color: "#3a7bd5"
// }];

// interface TimelineProps {
//   mode: string;
// }

// function Timeline({ mode }: TimelineProps) {
//   const [activeElement, setActiveElement] = useState<number | null>(null);
//   const [visibleElements, setVisibleElements] = useState<string[]>([]);
//   const [animateEntrance, setAnimateEntrance] = useState(false);
//   const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
//   const timelineRef = useRef<HTMLDivElement>(null);
//   const controls = useAnimation();
  
//   const isDarkMode = mode === 'dark';

//   // Enhanced entrance animation with staggered effect
//   useEffect(() => {
//     // Slightly delayed animation start for better user experience
//     const timer = setTimeout(() => {
//       setAnimateEntrance(true);
//       controls.start("visible");
//     }, 300);

//     // More sophisticated intersection observer
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           const index = entry.target.getAttribute('data-index');
//           if (index && !visibleElements.includes(index)) {
//             setVisibleElements(prev => [...prev, index]);
            
//             // Animate the timeline element once it's visible
//             const element = entry.target as HTMLElement;
//             element.style.opacity = "1";
//             element.style.transform = "translateY(0)";
//           }
//         }
//       });
//     }, { 
//       threshold: 0.15,
//       rootMargin: "0px 0px -100px 0px" // Trigger a bit before elements enter viewport
//     });

//     const elements = document.querySelectorAll('.vertical-timeline-element');
//     elements.forEach(el => observer.observe(el));

//     return () => {
//       observer.disconnect();
//       clearTimeout(timer);
//     };
//   }, [visibleElements, controls]);

//   const handleElementClick = (index: number) => {
//     setActiveElement(activeElement === index ? null : index);
//   };

//   // Enhanced styles with more sophisticated transitions
//   const getElementStyles = (entry: any, index: number) => {
//     const isActive = activeElement === index;
//     const isVisible = visibleElements.includes(index.toString());
    
//     if (isDarkMode) {
//       return {
//         background: isActive ? `rgba(25, 25, 25, 0.95)` : 'rgba(25, 25, 25, 0.8)',
//         boxShadow: isActive ? `0 8px 30px rgba(0, 0, 0, 0.3)` : `0 3px 10px rgba(0, 0, 0, 0.2)`,
//         border: `1px solid ${entry.color}`,
//         borderLeft: `5px solid ${entry.color}`,
//         opacity: isVisible ? 1 : 0,
//         transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
//         transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
//       };
//     } else {
//       return {
//         background: isActive ? `rgba(255, 255, 255, 0.95)` : 'rgba(255, 255, 255, 0.8)',
//         boxShadow: isActive ? `0 8px 30px rgba(0, 0, 0, 0.15)` : `0 3px 10px rgba(0, 0, 0, 0.1)`,
//         border: `1px solid ${entry.color}`,
//         borderLeft: `5px solid ${entry.color}`,
//         opacity: isVisible ? 1 : 0,
//         transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
//         transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
//       };
//     }
//   };

//   const getArrowStyle = (index: number) => {
//     if (isDarkMode) {
//       return { 
//         borderRight: `7px solid ${activeElement === index ? 'rgba(25, 25, 25, 0.95)' : 'rgba(25, 25, 25, 0.8)'}`,
//         transition: 'border-right 0.3s ease'
//       };
//     } else {
//       return { 
//         borderRight: `7px solid ${activeElement === index ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)'}`,
//         transition: 'border-right 0.3s ease'
//       };
//     }
//   };

//   // Animation variants
//   const containerVariants = {
//     // hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const headerVariants = {
//     // hidden: { opacity: 0, y: -20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//         duration: 0.7
//       }
//     }
//   };

//   const skillTagVariants = {
//     initial: { scale: 1 },
//     hover: { 
//       scale: 1.08,
//       boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
//       transition: { type: "spring", stiffness: 400, damping: 10 }
//     },
//     tap: { scale: 0.95 }
//   };

//   const highlightItemVariants = {
//     // hidden: { opacity: 0, x: -10 },
//     visible: { 
//       opacity: 1, 
//       x: 0,
//       transition: { 
//         type: "spring",
//         stiffness: 100,
//         damping: 10
//       }
//     }
//   };

//   const expandButtonVariants = {
//     initial: { scale: 1 },
//     hover: { 
//       scale: 1.05,
//       transition: { 
//         type: "spring",
//         stiffness: 300,
//         damping: 10
//       }
//     },
//     tap: { scale: 0.95 }
//   };

//   const contentExpandVariants = {
//     collapsed: { 
//       height: 0,
//       opacity: 0,
//       transition: { 
//         height: { duration: 0.3, ease: "easeInOut" },
//         opacity: { duration: 0.2 }
//       }
//     },
//     expanded: { 
//       height: "auto",
//       opacity: 1,
//       transition: {
//         height: { duration: 0.4, ease: "easeInOut" },
//         opacity: { duration: 0.4, delay: 0.1 }
//       }
//     }
//   };

//   const iconPulseVariants = {
//     initial: { scale: 1 },
//     pulse: {
//       scale: [1, 1.15, 1],
//       opacity: [1, 0.85, 1],
//       transition: {
//         duration: 1.5,
//         repeat: Infinity,
//         repeatType: "reverse" as const,
//         ease: "easeInOut"
//       }
//     }
//   };

//   return (
//     <motion.div 
//       id="history" 
//       className={`timeline-section ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
//       ref={timelineRef}
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       <div className="items-container">
//         <motion.div 
//           className="timeline-header"
//           variants={headerVariants}
//         >
//           <motion.h1 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
//           >
//             Career Journey
//           </motion.h1>
//           <motion.p 
//             className="timeline-intro"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//           >
//             My professional journey in software development, featuring key roles and accomplishments
//           </motion.p>
//         </motion.div>
        
//         <VerticalTimeline animate={animateEntrance} className={`${animateEntrance ? 'animate' : ''}`}>
//           {timelineData.map((entry, index) => (
//             <VerticalTimelineElement
//               key={index}
//               data-index={index}
//               className={`vertical-timeline-element--work ${activeElement === index ? 'active' : ''} ${visibleElements.includes(index.toString()) ? 'visible' : ''}`}
//               date={entry.date}
//               iconStyle={{ background: entry.color, color: '#fff' }}
//               icon={
//                 <motion.div
//                   variants={iconPulseVariants}
//                   initial="initial"
//                   animate={visibleElements.includes(index.toString()) ? "pulse" : "initial"}
//                 >
//                   <FontAwesomeIcon icon={entry.icon} />
//                 </motion.div>
//               }
//               contentStyle={getElementStyles(entry, index)}
//               contentArrowStyle={getArrowStyle(index)}
//               onTimelineElementClick={() => handleElementClick(index)}
//             >
//               <div className="timeline-element-content" onClick={() => handleElementClick(index)}>
//                 <motion.h3 
//                   className="vertical-timeline-element-title"
//                   initial={{ opacity: 0, y: -5 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4, delay: 0.2 }}
//                 >
//                   {entry.title}
//                 </motion.h3>
//                 <motion.h4 
//                   className="vertical-timeline-element-subtitle"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.4, delay: 0.3 }}
//                 >
//                   {entry.subtitle}
//                 </motion.h4>
//                 <motion.p 
//                   className="timeline-description"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.4, delay: 0.4 }}
//                 >
//                   {entry.description}
//                 </motion.p>
                
//                 <AnimatePresence>
//                   {activeElement === index && (
//                     <motion.div 
//                       className={`timeline-details ${activeElement === index ? 'active' : ''}`}
//                       initial="collapsed"
//                       animate="expanded"
//                       exit="collapsed"
//                       variants={contentExpandVariants}
//                     >
//                       {entry.highlights && (
//                         <div className="timeline-highlights">
//                           <motion.h5
//                             initial={{ opacity: 0, y: -5 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3, delay: 0.2 }}
//                           >
//                             Key Achievements:
//                           </motion.h5>
//                           <ul>
//                             {entry.highlights.map((highlight, i) => (
//                               <motion.li 
//                                 key={i}
//                                 variants={highlightItemVariants}
//                                 initial="hidden"
//                                 animate="visible"
//                                 custom={i}
//                                 transition={{ delay: 0.2 + (i * 0.1) }}
//                                 whileHover={{ x: 5, transition: { duration: 0.2 } }}
//                               >
//                                 <FontAwesomeIcon icon={faCheckCircle} className="highlight-icon" style={{ color: entry.color }} /> 
//                                 {highlight}
//                               </motion.li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}
                      
//                       {entry.skills && (
//                         <div className="timeline-skills">
//                           <motion.h5
//                             initial={{ opacity: 0, y: -5 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3, delay: 0.3 }}
//                           >
//                             Skills & Technologies:
//                           </motion.h5>
//                           <div className="skill-tags">
//                             {entry.skills.map((skill, i) => (
//                               <motion.span 
//                                 key={i} 
//                                 className={`skill-tag ${hoveredSkill === skill ? 'hovered' : ''}`}
//                                 style={{ 
//                                   borderColor: entry.color, 
//                                   color: entry.color,
//                                   background: hoveredSkill === skill ? `${entry.color}22` : 'transparent'
//                                 }}
//                                 variants={skillTagVariants}
//                                 initial="initial"
//                                 whileHover="hover"
//                                 whileTap="tap"
//                                 onHoverStart={() => setHoveredSkill(skill)}
//                                 onHoverEnd={() => setHoveredSkill(null)}
//                                 transition={{ delay: 0.1 + (i * 0.05) }}
//                               >
//                                 {skill}
//                               </motion.span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
                
//                 <motion.div 
//                   className="timeline-expand"
//                   variants={expandButtonVariants}
//                   initial="initial"
//                   whileHover="hover"
//                   whileTap="tap"
//                 >
//                   <span>
//                     {activeElement === index ? (
//                       <>
//                         <FontAwesomeIcon icon={faAngleUp} className="expand-icon" /> Show less
//                       </>
//                     ) : (
//                       <>
//                         <FontAwesomeIcon icon={faAngleDown} className="expand-icon" /> Show more
//                       </>
//                     )}
//                   </span>
//                 </motion.div>
//               </div>
//             </VerticalTimelineElement>
//           ))}
//         </VerticalTimeline>
//       </div>
      
//       {/* Decorative elements */}
//       <motion.div 
//         className="timeline-decoration timeline-decoration-1"
//         initial={{ opacity: 0, scale: 0.8, x: -100 }}
//         animate={{ 
//           opacity: 0.15, 
//           scale: 1, 
//           x: 0,
//           transition: { duration: 1, delay: 0.5 }
//         }}
//       />
//       <motion.div 
//         className="timeline-decoration timeline-decoration-2"
//         initial={{ opacity: 0, scale: 0.8, x: 100 }}
//         animate={{ 
//           opacity: 0.15, 
//           scale: 1, 
//           x: 0,
//           transition: { duration: 1, delay: 0.7 }
//         }}
//       />
//     </motion.div>
//   );
// }

// export default Timeline;
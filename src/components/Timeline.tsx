// import React, { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faBriefcase, 
//   faCode, 
//   faCloud, 
//   faChartLine, 
//   faCheckCircle 
// } from '@fortawesome/free-solid-svg-icons';
// import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
// import 'react-vertical-timeline-component/style.min.css';
// import { motion, useAnimation, useMotionValue, useTransform, AnimationControls } from "framer-motion";
// import '../assets/styles/Timeline.scss';

// const timelineData = [
//   {
//     title: "Software Developer - Sify Technologies",
//     subtitle: "Chennai, India",
//     date: "Jul 2023 - Present",
//     description: "Leading development on cloud-based applications with focus on AWS integration and workflow optimization.",
//     icon: faCloud,
//     skills: [
//       "AWS Step Functions",
//       "Backend Processing",
//       "Workflow Optimization",
//       "EC2",
//       "S3",
//       "MongoDB",
//       "Docker"
//     ],
//     highlights: [
//       "Optimized backend processing by implementing AWS Step Functions",
//       "Reduced system strain during high-load events",
//       "Enhanced scalability by modularizing heavy backend tasks"
//     ],
//     color: "#3a7bd5"
//   },
//   {
//     title: "Software Developer Intern - ZOHO",
//     subtitle: "Chennai, India",
//     date: "2022",
//     description: "Worked on full-stack development projects with focus on creating scalable solutions and API development.",
//     icon: faCode,
//     skills: [
//       "Full-stack Development",
//       "API Design",
//       "Frontend Development",
//       "User Experience"
//     ],
//     highlights: [
//       "Developed RESTful APIs for data integration",
//       "Created responsive UI components", 
//       "Participated in code reviews and testing"
//     ],
//     color: "#00a591"
//   },
//   {
//     title: "Full Stack Intern - SHIASH",
//     subtitle: "Chennai, India",
//     date: "2021",
//     description: "Gained hands-on experience in web development fundamentals and database operations.",
//     icon: faChartLine,
//     skills: [
//       "User Experience",
//       "CRUD Operations",
//       "Database Design",
//       "Web Development"
//     ],
//     highlights: [
//       "Built database-driven web applications",
//       "Implemented CRUD functionality",
//       "Designed user-friendly interfaces"
//     ],
//     color: "#6a11cb"
//   },
//   {
//     title: "B.TECH Information Technology - Velammal Engineering College",
//     subtitle: "Chennai, India",
//     date: "Aug 2019 - Apr 2023",
//     description: "CGPA: 8.99/10 with focus on computer science fundamentals and software development.",
//     icon: faCheckCircle,
//     skills: [
//       "Object Oriented Programming",
//       "Data Structures and Algorithms",
//       "Databases",
//       "Operating Systems",
//       "Computer Networks",
//       "Machine Learning"
//     ],
//     highlights: [
//       "Completed advanced coursework in algorithms and data structures",
//       "Studied information retrieval and image processing",
//       "Gained strong foundation in software engineering principles"
//     ],
//     color: "#e83e8c"
//   }
// ];

// function Timeline({ mode }: { mode: string }) {
//   const [activeElement, setActiveElement] = useState(null);
//   const [visibleElements, setVisibleElements] = useState<(string | null)[]>([]);
//   const [animateEntrance, setAnimateEntrance] = useState(false);
  
//   // Mouse position tracking
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
  
//   // Container reference to get relative position
//   const containerRef = useRef<HTMLDivElement>(null);
  
//   // Controls for the background effect animation
//   const backgroundControls = useAnimation();
  
//   const isDarkMode = mode === 'dark';

// useEffect(() => {
//     setTimeout(() => {
//       setAnimateEntrance(true);
//     }, 300);

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           const index = entry.target.getAttribute('data-index');
//           if (index && !visibleElements.includes(index)) {
//             setVisibleElements(prev => [...prev, index]);
//           }
//         }
//       });
//     }, { threshold: 0.2 }); // Reduced threshold for more responsive visibility

//     const elements = document.querySelectorAll('.vertical-timeline-element');
//     elements.forEach(el => observer.observe(el));

//     return () => observer.disconnect();
// }, [visibleElements]);

//   // Mouse move handler to track position
//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
//     if (containerRef.current) {
//       const rect = containerRef.current.getBoundingClientRect();
//       // Calculate relative position within the container
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
      
//       mouseX.set(x);
//       mouseY.set(y);
      
//       // Animate the background effect
//       backgroundControls.start({
//         x: x - 150, // Center the effect around the cursor
//         y: y - 150,
//         opacity: 1,
//         scale: 1,
//         transition: { duration: 0.3, ease: "easeOut" }
//       });
//     }
//   };

//   // Mouse leave handler
//   const handleMouseLeave = (): void => {
//     backgroundControls.start({
//       opacity: 0,
//       scale: 0.8,
//       transition: { duration: 0.5 }
//     });
//   };
//   const handleElementClick = (index:any) => {
//     setActiveElement(activeElement === index ? null : index);
//   };

//   // Determine theme-specific styles
//   const getElementStyles = (entry:any, index:any) => {
//     const isActive = activeElement === index;
    
//     if (isDarkMode) {
//       return {
//         background: isActive ? `rgba(25, 25, 25, 0.95)` : 'rgba(25, 25, 25, 0.8)',
//         boxShadow: isActive ? `0 8px 30px rgba(0, 0, 0, 0.3)` : `0 3px 10px rgba(0, 0, 0, 0.2)`,
//         border: `1px solid ${entry.color}`,
//         borderLeft: `5px solid ${entry.color}`
//       };
//     } else {
//       return {
//         background: isActive ? `rgba(255, 255, 255, 0.95)` : 'rgba(255, 255, 255, 0.8)',
//         boxShadow: isActive ? `0 8px 30px rgba(0, 0, 0, 0.15)` : `0 3px 10px rgba(0, 0, 0, 0.1)`,
//         border: `1px solid ${entry.color}`,
//         borderLeft: `5px solid ${entry.color}`
//       };
//     }
//   };

//   const getArrowStyle = (index:any) => {
//     if (isDarkMode) {
//       return { 
//         borderRight: `7px solid ${activeElement === index ? 'rgba(25, 25, 25, 0.95)' : 'rgba(25, 25, 25, 0.8)'}` 
//       };
//     } else {
//       return { 
//         borderRight: `7px solid ${activeElement === index ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)'}` 
//       };
//     }
//   };

//   return (
//     <div id="history" className={`timeline-section ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
//      onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//     >
//       <motion.div 
//         className="mouse-follow-effect"
//         animate={backgroundControls}
//         initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
//         style={{
//           position: 'absolute',
//           width: '300px',
//           height: '300px',
//           borderRadius: '50%',
//           background: isDarkMode 
//             ? 'radial-gradient(circle, rgba(58, 123, 213, 0.15) 0%, rgba(0, 0, 0, 0) 70%)' 
//             : 'radial-gradient(circle, rgba(58, 123, 213, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
//           pointerEvents: 'none',
//           zIndex: 1
//         }}
//       />
//       <div className="items-container">
//         <div className="timeline-header">
//           <h1>Career Journey</h1>
//           <p className="timeline-intro">
//             My professional journey in software development, featuring key roles and accomplishments
//           </p>
//         </div>
//         <VerticalTimeline animate={animateEntrance} className={`${animateEntrance ? 'animate' : ''}`}>
//           {timelineData.map((entry, index) => (
//             <VerticalTimelineElement
//               key={index}
//               data-index={index}
//               className={`vertical-timeline-element--work ${activeElement === index ? 'active' : ''} ${visibleElements.includes(index.toString()) ? 'visible' : ''}`}
//               date={entry.date}
//               iconStyle={{ background: entry.color, color: '#fff' }}
//               icon={<FontAwesomeIcon icon={entry.icon} />}
//               contentStyle={getElementStyles(entry, index)}
//               contentArrowStyle={getArrowStyle(index)}
//               onTimelineElementClick={() => handleElementClick(index)}
//             >
//               <div className="timeline-element-content" onClick={() => handleElementClick(index)}>
//                 <h3 className="vertical-timeline-element-title">{entry.title}</h3>
//                 <h4 className="vertical-timeline-element-subtitle">{entry.subtitle}</h4>
//                 <p className="timeline-description">{entry.description}</p>
                
//                 <div className={`timeline-details ${activeElement === index ? 'active' : ''}`}>
//                   {entry.highlights && (
//                     <div className="timeline-highlights">
//                       <h5>Key Achievements:</h5>
//                       <ul>
//                         {entry.highlights.map((highlight, i) => (
//                           <li key={i}>{highlight}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
                  
//                   {entry.skills && (
//                     <div className="timeline-skills">
//                       <h5>Skills & Technologies:</h5>
//                       <div className="skill-tags">
//                         {entry.skills.map((skill, i) => (
//                           <span 
//                             key={i} 
//                             className="skill-tag"
//                             style={{ borderColor: entry.color, color: entry.color }}
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="timeline-expand">
//                   <span>{activeElement === index ? 'Show less' : 'Show more'}</span>
//                 </div>
//               </div>
//             </VerticalTimelineElement>
//           ))}
//         </VerticalTimeline>
//       </div>
//     </div>
//   );
// }

// export default Timeline;



import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBriefcase, 
  faCode, 
  faCloud, 
  faChartLine, 
  faCheckCircle 
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { motion, useAnimation, useMotionValue, AnimationControls, MotionValue } from "framer-motion";
import '../assets/styles/Timeline.scss';

interface TimelineEntry {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  icon: IconDefinition;
  skills?: string[];
  highlights?: string[];
  color: string;
}

const timelineData: TimelineEntry[] = [
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

interface TimelineProps {
  mode: string;
}

function Timeline({ mode }: TimelineProps) {
  const [activeElement, setActiveElement] = useState<number | null>(null);
  const [visibleElements, setVisibleElements] = useState<string[]>([]);
  const [animateEntrance, setAnimateEntrance] = useState<boolean>(false);
  const [cursorType, setCursorType] = useState<string>("default");
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorScale = useMotionValue(1);
  const cursorOpacity = useMotionValue(0);
  
  // Container reference to get relative position
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Controls for the background effect animation
  const backgroundControls = useAnimation();
  
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
    }, { threshold: 0.2 });

    const elements = document.querySelectorAll('.vertical-timeline-element');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [visibleElements]);

  // Smooth cursor movement
  useEffect(() => {
    const moveCursor = () => {
      const cursorXSpring = cursorX.get();
      const cursorYSpring = cursorY.get();
      const mouseXValue = mouseX.get();
      const mouseYValue = mouseY.get();
      
      const dx = mouseXValue - cursorXSpring;
      const dy = mouseYValue - cursorYSpring;
      
      cursorX.set(cursorXSpring + dx * 0.2);
      cursorY.set(cursorYSpring + dy * 0.2);
      
      requestAnimationFrame(moveCursor);
    };
    
    const showCursor = () => {
      cursorOpacity.set(1);
    };
    
    // Smoothly animate cursor
    const cursorAnimation = requestAnimationFrame(moveCursor);
    
    // Show cursor after a short delay for smooth fade in
    const opacityTimeout = setTimeout(showCursor, 100);
    
    return () => {
      cancelAnimationFrame(cursorAnimation);
      clearTimeout(opacityTimeout);
    };
  }, []);

  // Mouse move handler to track position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate relative position within the container
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouseX.set(x);
      mouseY.set(y);
      
      // Animate the background effect
      backgroundControls.start({
        x: x - 150, // Center the effect around the cursor
        y: y - 150,
        opacity: 1,
        scale: 1,
        transition: { duration: 0.03, ease: "easeOut" }
      });
    }
  };

  // Mouse leave handler
  const handleMouseLeave = (): void => {
    backgroundControls.start({
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5 }
    });
    
    // Fade out cursor when leaving component
    cursorOpacity.set(0);
  };
  
  // Mouse enter handler
  const handleMouseEnter = (): void => {
    cursorOpacity.set(1);
  };
  
  // Element hover handlers
  const handleElementMouseEnter = (): void => {
    setCursorType("element");
    cursorScale.set(1.5);
  };
  
  const handleElementMouseLeave = (): void => {
    setCursorType("default");
    cursorScale.set(1);
  };

  const handleElementClick = (index: number): void => {
    setActiveElement(activeElement === index ? null : index);
  };

  // Determine theme-specific styles
  const getElementStyles = (entry: TimelineEntry, index: number): React.CSSProperties => {
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

  const getArrowStyle = (index: number): React.CSSProperties => {
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

  // Element hover animations
  const elementHoverVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <div 
      id="history" 
      ref={containerRef}
      className={`timeline-section ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      // style={{ cursor: 'none' }}
    >
      {/* Custom cursor */}
      {/* <motion.div
        className="custom-cursor-outer"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: cursorOpacity,
          position: 'absolute',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: isDarkMode 
            ? '1px solid rgba(255, 255, 255, 0.3)' 
            : '2px solid rgba(0, 0, 0, 0.3)',
            background:isDarkMode?"":"black",
          pointerEvents: 'none',
          zIndex: 10,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: cursorType === "element" ? 1.2 : 1
        }}
        transition={{ duration: 0.02 }}
      />
      
      <motion.div
        className="custom-cursor-inner"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: cursorOpacity,
          position: 'absolute',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: isDarkMode 
            ? 'rgba(255, 255, 255, 0.9)' 
            : 'rgba(0, 0, 0, 0.9)',
          pointerEvents: 'none',
          zIndex: 11,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: cursorType === "element" ? 0 : 1
        }}
        transition={{ duration: 0.02 }}
      /> */}
      
      {/* Background effect that follows the mouse */}
      <motion.div 
        className="mouse-follow-effect"
        animate={backgroundControls}
        initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: isDarkMode 
            ? 'radial-gradient(circle, rgba(58, 123, 213, 0.15) 0%, rgba(0, 0, 0, 0) 70%)' 
            : 'radial-gradient(circle, rgba(58, 123, 213, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      
      <div className="items-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="timeline-header">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Career Journey
          </motion.h1>
          <motion.p 
            className="timeline-intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            My professional journey in software development, featuring key roles and accomplishments
          </motion.p>
        </div>
        <VerticalTimeline animate={animateEntrance} className={`${animateEntrance ? 'animate' : ''}`}>
          {timelineData.map((entry, index) => (
         
                <VerticalTimelineElement
                  data-index={index.toString()}
                  className={`vertical-timeline-element--work ${activeElement === index ? 'active' : ''} ${visibleElements.includes(index.toString()) ? 'visible' : ''}`}
                  date={entry.date}
                  iconStyle={{ background: entry.color, color: '#fff' }}
                  icon={<FontAwesomeIcon icon={entry.icon} />}
                  contentStyle={getElementStyles(entry, index)}
                  contentArrowStyle={getArrowStyle(index)}
                  onTimelineElementClick={() => handleElementClick(index)}
                  //  onMouseEnter={handleElementMouseEnter}
                // onMouseLeave={handleElementMouseLeave}
                >
                <motion.div 
                  className="timeline-element-content" 
                  onClick={() => handleElementClick(index)}
                  whileHover={{ 
                    boxShadow: isDarkMode 
                      ? `0 0 15px ${entry.color}30` 
                      : `0 0 25px ${entry.color}20` 
                  }}
                >
                  <h3 className="vertical-timeline-element-title">{entry.title}</h3>
                  <h4 className="vertical-timeline-element-subtitle">{entry.subtitle}</h4>
                  <p className="timeline-description">{entry.description}</p>
                  
                  <motion.div 
                    className={`timeline-details ${activeElement === index ? 'active' : ''}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: activeElement === index ? 'auto' : 0,
                      opacity: activeElement === index ? 1 : 0
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {entry.highlights && (
                      <div className="timeline-highlights">
                        <h5>Key Achievements:</h5>
                        <ul>
                          {entry.highlights.map((highlight, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ 
                                opacity: activeElement === index ? 1 : 0,
                                x: activeElement === index ? 0 : -10
                              }}
                              transition={{ duration: 0.3, delay: 0.1 * i }}
                            >
                              {highlight}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {entry.skills && (
                      <div className="timeline-skills">
                        <h5>Skills & Technologies:</h5>
                        <div className="skill-tags">
                          {entry.skills.map((skill, i) => (
                            <motion.span 
                              key={i} 
                              className="skill-tag"
                              style={{ borderColor: entry.color, color: entry.color }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ 
                                opacity: activeElement === index ? 1 : 0,
                                scale: activeElement === index ? 1 : 0.8
                              }}
                              transition={{ duration: 0.3, delay: 0.05 * i }}
                              whileHover={{ 
                                scale: 1.05,
                                backgroundColor: `${entry.color}15`,
                                transition: { duration: 0.2 }
                              }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                  
                  <motion.div 
                    className="timeline-expand"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{activeElement === index ? 'Show less' : 'Show more'}</span>
                  </motion.div>
                </motion.div>
                </VerticalTimelineElement>
            
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;




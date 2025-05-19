// import React, { useState, useEffect } from "react";
// import "../assets/styles/Project.scss";
// import t2v from "../assets/images/t2v.png";
// import ccs from "../assets/images/ccs.png";
// import epms from "../assets/images/epms.jpg";

// // Define TypeScript interface for project data
// interface ProjectData {
//   id: number;
//   title: string;
//   description: string;
//   longDescription: string;
//   techStack: string[];
//   image: string;
//   link: string;
//   github?: string;
//   year: number;
// }

// // Project data based on your resume
// const projectData: ProjectData[] = [
//   {
//     id: 1,
//     title: "Text-to-Video Pipeline",
//     description:
//       "AI-powered system that converts text prompts into coherent short-form videos",
//     longDescription:
//       "Developed an automated pipeline that converts user text prompts into coherent short-form videos using AI and multimedia tools. Implemented LLM-based workflow to transform user prompts into structured storyboards. Integrated Edge-TTS for high-quality audio generation from text. Created a video search engine accessing multiple sources (Pexel, Pixabay, custom library). Built an LLM-powered relevancy checking system to ensure video-prompt coherence. Engineered video assembly process with animations and text overlay capabilities.",
//     techStack: [
//       "Large Language Models (LLM)",
//       "Edge-TTS",
//       "FFmpeg",
//       "Pexels/Pixabay APIs",
//       "Custom Video Library",
//     ],
//     image: t2v,
//     link: "#",
//     github: "https://github.com/sanjay0348/text-to-video-pipeline",
//     year: 2025,
//   },
//   {
//     id: 2,
//     title: "Intelligent Content Creation System",
//     description:
//       "React-based CCS with AI-powered tagging and multimedia content generation",
//     longDescription:
//       "Designed and implemented a React-based CCS with an intelligent tagging system that automatically categorizes content using LLMs. Built a responsive UI with intuitive workflows for creating multimedia-rich lessons using images and YouTube videos. Integrated a user input flow where an LLM generates a course structure and detailed content for each lesson. Enhanced content generation with LLM calls, selecting relevant images via image libraries, and retrieving YouTube videos using SERP API/Selenium. Merged textual and visual content by feeding image and video context back into the LLMs to refine and better align the generated material.",
//     techStack: [
//       "React",
//       "Node.js",
//       "MongoDB",
//       "LLM",
//       "AWS S3",
//       "Selenium",
//       "SERP API",
//     ],
//     image: ccs,
//     link: "#",
//     github: "https://github.com/sanjay0348/intelligent-content-system",
//     year: 2024,
//   },
//   {
//     id: 3,
//     title: "Electronic Project Management System (EPMS)",
//     description:
//       "Full-featured project management platform with workflows, resource allocation and reporting",
//     longDescription:
//       "Developed a full-featured project management platform for handling end-to-end project operations including creation, approval workflows, resource allocation, and reporting. Implemented multi-level approval flows for project creation involving Project Managers and Finance teams, with detailed status tracking and role-based access control. Built modules for timesheet tracking, revenue reporting, task assignment, and employee utilization, with features like AI-generated timesheet summaries and defaulter identification. Designed interactive dashboards and admin panels enabling seamless navigation for PMs, employees, and finance personnel. Integrated invoice generation, holiday tracking, exchange rate management, and LLM-powered automation to support operational efficiency.",
//     techStack: ["React", "Node.js", "MySQL", "AWS", "REST APIs"],
//     image: epms,
//     link: "#",
//     github: "https://github.com/sanjay0348/epms",
//     year: 2023,
//   },
// ];

// function Project({ mode }: any) {
//   const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
//     null
//   );
//   const themeMode = mode === "dark" ? "darkth" : "";
//   const [filter, setFilter] = useState<string>("all");
//   const [filteredProjects, setFilteredProjects] =
//     useState<ProjectData[]>(projectData);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [animatedItems, setAnimatedItems] = useState<number[]>([]);

//   // Extract unique tech stacks for filter dropdown
//   const allTechStacks = Array.from(
//     new Set(projectData.flatMap((project) => project.techStack))
//   );

//   // Handle filter change
//   useEffect(() => {
//     if (filter === "all") {
//       setFilteredProjects(projectData);
//     } else {
//       setFilteredProjects(
//         projectData.filter((project) =>
//           project.techStack.some((tech) =>
//             tech.toLowerCase().includes(filter.toLowerCase())
//           )
//         )
//       );
//     }
//   }, [filter]);

//   // Animation on scroll
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const id = Number(entry.target.getAttribute("data-id"));
//             if (!animatedItems.includes(id)) {
//               setAnimatedItems((prev) => [...prev, id]);
//             }
//           }
//         });
//       },
//       { threshold: 0.2 }
//     );

//     document.querySelectorAll(".project-card").forEach((card) => {
//       observer.observe(card);
//     });

//     return () => observer.disconnect();
//   }, [filteredProjects, animatedItems]);

//   const openModal = (project: ProjectData) => {
//     setSelectedProject(project);
//     setIsModalOpen(true);
//     document.body.style.overflow = "hidden";
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     document.body.style.overflow = "auto";
//   };

//   return (
//     <div className={`projects-container ${themeMode}`} id="projects">
//       <h1 className="text-center my-4" style={{ background: "none" }}>
//         Projects
//       </h1>

//       {filteredProjects.length > 0 ? (
//         <div className="projects-grid">
//           {filteredProjects.map((project) => (
//             <div
//               className={`project-card ${
//                 animatedItems.includes(project.id) ? "animated" : ""
//               }`}
//               key={project.id}
//               data-id={project.id}
//             >
//               <div className="project-image-container">
//                 <img
//                   src={project.image}
//                   className="project-image"
//                   alt={project.title}
//                 />
//                 <div className="project-overlay">
//                   <button
//                     className="view-details-btn"
//                     onClick={() => openModal(project)}
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//               <div className="project-info">
//                 <h3 className="project-title">{project.title}</h3>
//                 <p className="project-description">{project.description}</p>
//                 <div className="project-tech-stack">
//                   {project.techStack.slice(0, 3).map((tech, idx) => (
//                     <span className="tech-badge" key={idx}>
//                       {tech}
//                     </span>
//                   ))}
//                   {project.techStack.length > 3 && (
//                     <span className="tech-badge more-badge">
//                       +{project.techStack.length - 3}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="no-projects">
//           <p>No projects match the selected filter.</p>
//           <button className="reset-filter-btn" onClick={() => setFilter("all")}>
//             Show All Projects
//           </button>
//         </div>
//       )}

//       {/* Project Details Modal */}
//       {isModalOpen && selectedProject && (
//         <div className={themeMode}>
//           <div className="project-modal-overlay" onClick={closeModal}>
//             <div
//               className="project-modal-content"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button className="close-modal" onClick={closeModal}>
//                 ×
//               </button>
//               <h2>{selectedProject.title}</h2>
//               <div className="modal-image-container">
//                 <img src={selectedProject.image} alt={selectedProject.title} />
//               </div>
//               <div className="project-year">Year: {selectedProject.year}</div>
//               <div className="modal-description">
//                 <p>{selectedProject.longDescription}</p>
//               </div>
//               <div className="modal-tech-stack">
//                 <h4>Technologies Used:</h4>
//                 <div className="tech-badges">
//                   {selectedProject.techStack.map((tech, idx) => (
//                     <span className="tech-badge" key={idx}>
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Project;


import React, { useState, useEffect } from "react";
import "../assets/styles/Project.scss";
import t2v from "../assets/images/t2v.png";
import { motion, AnimatePresence } from "framer-motion";
import ccs from "../assets/images/ccs.png";
import epms from "../assets/images/epms.jpg";


// Define TypeScript interface for project data
interface ProjectData {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  image: string;
  link: string;
  github?: string;
  year: number;
}

// Project data based on your resume
const projectData: ProjectData[] =[
  {
    id: 1,
    title: "Text-to-Video Pipeline",
    description:
      "AI-powered system that converts text prompts into coherent short-form videos",
    longDescription:
      "Developed an automated pipeline that converts user text prompts into coherent short-form videos using AI and multimedia tools. Implemented LLM-based workflow to transform user prompts into structured storyboards. Integrated Edge-TTS for high-quality audio generation from text. Created a video search engine accessing multiple sources (Pexel, Pixabay, custom library). Built an LLM-powered relevancy checking system to ensure video-prompt coherence. Engineered video assembly process with animations and text overlay capabilities.",
    techStack: [
      "Large Language Models (LLM)",
      "Edge-TTS",
      "FFmpeg",
      "Pexels/Pixabay APIs",
      "Custom Video Library",
    ],
    image: t2v,
    link: "#",
    github: "https://github.com/sanjay0348/text-to-video-pipeline",
    year: 2025,
  },
  {
    id: 2,
    title: "Intelligent Content Creation System",
    description:
      "React-based CCS with AI-powered tagging and multimedia content generation",
    longDescription:
      "Designed and implemented a React-based CCS with an intelligent tagging system that automatically categorizes content using LLMs. Built a responsive UI with intuitive workflows for creating multimedia-rich lessons using images and YouTube videos. Integrated a user input flow where an LLM generates a course structure and detailed content for each lesson. Enhanced content generation with LLM calls, selecting relevant images via image libraries, and retrieving YouTube videos using SERP API/Selenium. Merged textual and visual content by feeding image and video context back into the LLMs to refine and better align the generated material.",
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "LLM",
      "AWS S3",
      "Selenium",
      "SERP API",
    ],
    image: ccs,
    link: "#",
    github: "https://github.com/sanjay0348/intelligent-content-system",
    year: 2024,
  },
  {
    id: 3,
    title: "Electronic Project Management System (EPMS)",
    description:
      "Full-featured project management platform with workflows, resource allocation and reporting",
    longDescription:
      "Developed a full-featured project management platform for handling end-to-end project operations including creation, approval workflows, resource allocation, and reporting. Implemented multi-level approval flows for project creation involving Project Managers and Finance teams, with detailed status tracking and role-based access control. Built modules for timesheet tracking, revenue reporting, task assignment, and employee utilization, with features like AI-generated timesheet summaries and defaulter identification. Designed interactive dashboards and admin panels enabling seamless navigation for PMs, employees, and finance personnel. Integrated invoice generation, holiday tracking, exchange rate management, and LLM-powered automation to support operational efficiency.",
    techStack: ["React", "Node.js", "MySQL", "AWS", "REST APIs"],
    image: epms,
    link: "#",
    github: "https://github.com/sanjay0348/epms",
    year: 2023,
  },
];

// Animation variants for various elements
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const projectCardVariants = {
  hidden: { 
    y: 50,
    opacity: 0,
    rotateY: -15,
    scale: 0.9,
  },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 12,
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
  hover: {
    y: -10,
    scale: 1.03,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const imageContainerVariants = {
  rest: { 
    scale: 1,
    rotateZ: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: { 
    scale: 1.05,
    rotateZ: 0,
    transition: { 
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const imageVariants = {
  rest: { 
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: { 
    scale: 1.1,
    transition: { 
      duration: 0.4,
      ease: "easeIn"
    }
  }
};

const overlayVariants = {
  rest: { 
    opacity: 0,
    y: 20,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const buttonVariants = {
  rest: { 
    scale: 0.9,
    opacity: 0,
    y: 20
  },
  hover: { 
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { 
      delay: 0.1,
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: { 
    scale: 0.95,
    transition: { 
      duration: 0.1,
    }
  }
};

const techBadgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.05 + 0.3,
      duration: 0.3,
    },
  }),
  hover: {
    y: -3,
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
};

const titleVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  hover: {
    color: "#007bff",
    transition: {
      duration: 0.2
    }
  }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateX: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    rotateX: 10,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const modalContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  }
};

function Project({ mode }: any) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const themeMode = mode === "dark" ? "darkth" : "";
  const [filter, setFilter] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>(projectData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false);

  // Extract unique tech stacks for filter dropdown
  const allTechStacks = Array.from(
    new Set(projectData.flatMap((project) => project.techStack))
  );

  // Handle filter change
  useEffect(() => {
    if (filter === "all") {
      setFilteredProjects(projectData);
    } else {
      setFilteredProjects(
        projectData.filter((project) =>
          project.techStack.some((tech) =>
            tech.toLowerCase().includes(filter.toLowerCase())
          )
        )
      );
    }
  }, [filter]);

  // Set initial load complete after component mounts
  useEffect(() => {
    // Small delay to ensure animations work properly
    const timer = setTimeout(() => {
      setInitialLoadComplete(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const openModal = (project: ProjectData) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div className={`projects-container ${themeMode}`} id="projects">
      <motion.h1 
        className="" 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ background: "none", }}
      >
       
       Projects

       
      </motion.h1>

      {filteredProjects.length > 0 ? (
        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={initialLoadComplete ? "visible" : "hidden"}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              className="project-card"
              key={project.id}
              custom={index}
              variants={projectCardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              layoutId={`project-card-${project.id}`}
            >
              <motion.div 
                className="project-image-container"
                variants={imageContainerVariants}
                initial="rest"
                whileHover="hover"
              >
                <motion.img
                  src={project.image}
                  className="project-image"
                  alt={project.title}
                  variants={imageVariants}
                />
                <motion.div 
                  className="project-overlay"
                  variants={overlayVariants}
                >
                  <motion.button
                    className="view-details-btn"
                    onClick={() => openModal(project)}
                    variants={buttonVariants}
                    whileTap="tap"
                  >
                    View Details
                  </motion.button>
                </motion.div>
              </motion.div>
              <div className="project-info">
                <motion.h3 
                  className="project-title"
                  variants={titleVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  style={{color:mode=='dark'?"":"black"}}
                >
                  {project.title}
                </motion.h3>
                <motion.p 
                  className="project-description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  {project.description}
                </motion.p>
                <div className="project-tech-stack">
                  {project.techStack.slice(0, 3).map((tech, idx) => (
                    <motion.span 
                      className="tech-badge" 
                      key={idx}
                      custom={idx}
                      variants={techBadgeVariants}
                      whileHover="hover"
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.techStack.length > 3 && (
                    <motion.span 
                      className="tech-badge more-badge"
                      custom={3}
                      variants={techBadgeVariants}
                      whileHover="hover"
                    >
                      +{project.techStack.length - 3}
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="no-projects"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>No projects match the selected filter.</p>
          <motion.button 
            className="reset-filter-btn" 
            onClick={() => setFilter("all")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Show All Projects
          </motion.button>
        </motion.div>
      )}

      {/* Project Details Modal */}
      <AnimatePresence>
  {isModalOpen && selectedProject && (
    <motion.div 
      className={`project-modal-overlay ${themeMode}`}
      onClick={closeModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`project-modal-content ${themeMode}`}
        onClick={(e) => e.stopPropagation()}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.button 
          className={`close-modal ${themeMode}`}
          onClick={closeModal}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          ×
        </motion.button>
        
        <motion.h2 
          className={themeMode}
          variants={modalContentVariants}
        >
          {selectedProject.title}
        </motion.h2>
        
        <motion.div 
          className="modal-image-container"
          variants={modalContentVariants}
          whileHover={{ scale: 1.02 }}
        >
          <motion.img 
            src={selectedProject.image} 
            alt={selectedProject.title}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
        
        <motion.div 
          className={`project-year ${themeMode}`}
          variants={modalContentVariants}
        >
          Year: {selectedProject.year}
        </motion.div>
        
        <motion.div 
          className={`modal-description ${themeMode}`}
          variants={modalContentVariants}
        >
          <p>{selectedProject.longDescription}</p>
        </motion.div>
        
        <motion.div 
          className={`modal-tech-stack ${themeMode}`}
          variants={modalContentVariants}
        >
          <h4>Technologies Used:</h4>
          <motion.div 
            className="tech-badges"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
          >
            {selectedProject.techStack.map((tech, idx) => (
              <motion.span 
                className={`tech-badge ${themeMode}`}
                key={idx}
                custom={idx}
                variants={techBadgeVariants}
                whileHover="hover"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
        
        {/* {selectedProject.github && (
          <motion.div 
            className="project-links"
            variants={modalContentVariants}
          >
            <motion.a 
              href={selectedProject.github} 
              target="_blank"
              rel="noopener noreferrer"
              className={`github-link ${themeMode}`}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              View on GitHub
            </motion.a>
            {selectedProject.link && selectedProject.link !== "#" && (
              <motion.a 
                href={selectedProject.link} 
                target="_blank"
                rel="noopener noreferrer"
                className={`live-link ${themeMode}`}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                View Live
              </motion.a>
            )}
          </motion.div>
        )} */}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}

export default Project;
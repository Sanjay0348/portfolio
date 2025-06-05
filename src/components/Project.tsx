// import { useState, useEffect } from "react";
// import "../assets/styles/Project.scss";
// import t2v from "../assets/images/t2v.png";
// import { motion, AnimatePresence } from "framer-motion";
// import ccs from "../assets/images/ccs.png";
// import epms from "../assets/images/epms.jpg";

// import {
//   imageContainerVariants,
//   imageVariants,
//   containerVariants,
//   projectCardVariants,
//   overlayVariants,
//   buttonVariants,
//   techBadgeVariants,
//   titleVariants,
//   modalVariants,
//   modalContentVariants,
// } from "../helpers/animation.helper";

// // Define TypeScript interface for project data
// interface ProjectData {
//   id: number;
//   title: string;
//   description: string;
//   longDescription: string[];
//   techStack: string[];
//   image: string;
//   link: string;
//   github?: string;
//   year: number;
//   category?: string[];
// }

// // Project data based on your resume
// const projectData: ProjectData[] = [
//   {
//     id: 1,
//     title: "Text-to-Video Pipeline",
//     category: [],
//     description:
//       "AI-powered system that converts text prompts into coherent short-form videos",
//     longDescription: [
//       "Developed an automated pipeline that converts user text prompts into coherent short-form videos using AI and multimedia tools.",
//       "Implemented LLM-based workflow to transform user prompts into structured storyboards.",
//       "Integrated Edge-TTS for high-quality audio generation from text.",
//       "Created a video search engine accessing multiple sources (Pexel, Pixabay, custom library).",
//       "Built an LLM-powered relevancy checking system to ensure video-prompt coherence.",
//       "Engineered video assembly process with animations and text overlay capabilities.",
//     ],
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
//     longDescription: [
//       "Designed and implemented a React-based CCS with an intelligent tagging system that automatically categorizes content using LLMs.",
//       "Built a responsive UI with intuitive workflows for creating multimedia-rich lessons using images and YouTube videos.",
//       "Integrated a user input flow where an LLM generates a course structure and detailed content for each lesson.",
//       "Enhanced content generation with LLM calls, selecting relevant images via image libraries, and retrieving YouTube videos using SERP API/Selenium.",
//       "Merged textual and visual content by feeding image and video context back into the LLMs to refine and better align the generated material.",
//     ],
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
//     longDescription: [
//       "Developed a full-featured project management platform for handling end-to-end project operations including creation, approval workflows, resource allocation, and reporting.",
//       "Implemented multi-level approval flows for project creation involving Project Managers and Finance teams, with detailed status tracking and role-based access control.",
//       "Built modules for timesheet tracking, revenue reporting, task assignment, and employee utilization, with features like AI-generated timesheet summaries and defaulter identification.",
//       "Designed interactive dashboards and admin panels enabling seamless navigation for PMs, employees, and finance personnel.",
//       "Integrated invoice generation, holiday tracking, exchange rate management, and LLM-powered automation to support operational efficiency.",
//     ],
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
//   const [initialLoadComplete, setInitialLoadComplete] =
//     useState<boolean>(false);

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

//   // Set initial load complete after component mounts
//   useEffect(() => {
//     // Small delay to ensure animations work properly
//     const timer = setTimeout(() => {
//       setInitialLoadComplete(true);
//     }, 100);

//     return () => clearTimeout(timer);
//   }, []);

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
//       <motion.h1
//         className=""
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         // style={{ background: "none" }}
//       >
//         Projects
//       </motion.h1>

//       {filteredProjects.length > 0 ? (
//         <motion.div
//           className="projects-grid"
//           variants={containerVariants}
//           initial="hidden"
//           animate={initialLoadComplete ? "visible" : "hidden"}
//         >
//           {filteredProjects.map((project, index) => (
//             <motion.div
//               className="project-card"
//               key={project.id}
//               custom={index}
//               variants={projectCardVariants}
//               initial="hidden"
//               animate="visible"
//               whileHover="hover"
//               layoutId={`project-card-${project.id}`}
//             >
//               <motion.div
//                 className="project-image-container"
//                 variants={imageContainerVariants}
//                 initial="rest"
//                 whileHover="hover"
//               >
//                 <motion.img
//                   src={project.image}
//                   className="project-image"
//                   alt={project.title}
//                   variants={imageVariants}
//                 />
//                 <motion.div
//                   className="project-overlay"
//                   variants={overlayVariants}
//                 >
//                   <motion.button
//                     className="view-details-btn"
//                     onClick={() => openModal(project)}
//                     variants={buttonVariants}
//                     whileTap="tap"
//                   >
//                     View Details
//                   </motion.button>
//                 </motion.div>
//               </motion.div>
//               <div className="project-info">
//                 <motion.h3
//                   className="project-title"
//                   variants={titleVariants}
//                   initial="initial"
//                   animate="animate"
//                   whileHover="hover"
//                   style={{ color: mode == "dark" ? "" : "black" }}
//                 >
//                   {project.title}
//                 </motion.h3>
//                 <motion.p
//                   className="project-description"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2, duration: 0.4 }}
//                 >
//                   {project.description}
//                 </motion.p>
//                 <div className="project-tech-stack">
//                   {project.techStack.slice(0, 3).map((tech, idx) => (
//                     <motion.span
//                       className="tech-badge"
//                       key={idx}
//                       custom={idx}
//                       variants={techBadgeVariants}
//                       whileHover="hover"
//                     >
//                       {tech}
//                     </motion.span>
//                   ))}
//                   {project.techStack.length > 3 && (
//                     <motion.span
//                       className="tech-badge more-badge"
//                       custom={3}
//                       variants={techBadgeVariants}
//                       whileHover="hover"
//                     >
//                       +{project.techStack.length - 3}
//                     </motion.span>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       ) : (
//         <motion.div
//           className="no-projects"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <p>No projects match the selected filter.</p>
//           <motion.button
//             className="reset-filter-btn"
//             onClick={() => setFilter("all")}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Show All Projects
//           </motion.button>
//         </motion.div>
//       )}

//       {/* Project Details Modal */}
//       <AnimatePresence>
//         {isModalOpen && selectedProject && (
//           <motion.div
//             className={`project-modal-overlay ${themeMode}`}
//             onClick={closeModal}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <motion.div
//               className={`project-modal-content ${themeMode}`}
//               onClick={(e) => e.stopPropagation()}
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//             >
//               {/* Enhanced Header Section */}
//               <motion.div
//                 className={`modal-header ${themeMode}`}
//                 variants={modalContentVariants}
//               >
//                 <div className="header-content">
//                   <motion.div
//                     className="header-left"
//                     initial={{ x: -20, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     transition={{ delay: 0.2 }}
//                   >
//                     <motion.div className="header-column">
//                       <motion.h2
//                         className={`project-title ${themeMode}`}
//                         initial={{ y: -10, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ delay: 0.3 }}
//                       >
//                         {selectedProject.title}
//                       </motion.h2>
//                       <motion.button
//                         className={`close-modal ${themeMode}`}
//                         onClick={closeModal}
//                         whileHover={{ scale: 1.1, rotate: 90 }}
//                         whileTap={{ scale: 0.9 }}
//                         initial={{ scale: 0.8, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                         transition={{ delay: 0.8 }}
//                       >
//                         ×
//                       </motion.button>
//                     </motion.div>

//                     <motion.div
//                       className={`project-subtitle ${themeMode}`}
//                       initial={{ y: -5, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       transition={{ delay: 0.4 }}
//                     >
//                       <span className={`project-year ${themeMode}`}>
//                         {selectedProject.year}
//                       </span>
//                     </motion.div>
//                   </motion.div>
//                 </div>

//                 {/* Divider Line */}
//                 {/* <motion.div 
//             className={`header-divider ${themeMode}`}
//             initial={{ scaleX: 0 }}
//             animate={{ scaleX: 1 }}
//             transition={{ delay: 0.9, duration: 0.4 }}
//           /> */}
//               </motion.div>

//               {/* Main Content */}
//               <div className="modal-body">
//                 <motion.div
//                   className="modal-image-container"
//                   variants={modalContentVariants}
//                   whileHover={{ scale: 1.02 }}
//                 >
//                   <motion.img
//                     src={selectedProject.image}
//                     alt={selectedProject.title}
//                     initial={{ scale: 1.1, opacity: 0.8 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                   />
//                 </motion.div>

//                 <motion.div
//                   className={`modal-description ${themeMode}`}
//                   variants={modalContentVariants}
//                 >
//                   {/* <p>{selectedProject.longDescription}</p> */}
//                   <ul className="point-list">
//                     {selectedProject.longDescription.map(
//                       (point: string, index: any) => {
//                         return (
//                           <li key={index} className="project-description">
//                             {point}
//                           </li>
//                         );
//                       }
//                     )}
//                   </ul>
//                 </motion.div>

//                 <motion.div
//                   className={`modal-tech-stack ${themeMode}`}
//                   variants={modalContentVariants}
//                 >
//                   <h4>Technologies Used:</h4>
//                   <motion.div
//                     className="tech-badges"
//                     initial="hidden"
//                     animate="visible"
//                     variants={{
//                       visible: {
//                         transition: {
//                           staggerChildren: 0.05,
//                         },
//                       },
//                     }}
//                   >
//                     {selectedProject.techStack.map((tech, idx) => (
//                       <motion.span
//                         className={`tech-badge-modal ${themeMode}`}
//                         key={idx}
//                         custom={idx}
//                         variants={techBadgeVariants}
//                         whileHover="hover"
//                       >
//                         {tech}
//                       </motion.span>
//                     ))}
//                   </motion.div>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default Project;


import { useState, useEffect } from "react";
import "../assets/styles/Project.scss";
import t2v from "../assets/images/t2v.png";
import { motion, AnimatePresence } from "framer-motion";
import ccs from "../assets/images/ccs.png";
import epms from "../assets/images/epms.jpg";
// Define TypeScript interface for project data
interface ProjectData {
  id: number;
  title: string;
  categgory?:string[];
  description: string;
  longDescription: string[];
  techStack: string[];
  image: string;
  link: string;
  github?: string;
  year: number;
  category?: string[];
}
// Mock data for demonstration
const projectData:any =[
  {
    id: 1,
    title: "Text-to-Video Pipeline",
    category: [],
    description:
      "AI-powered system that converts text prompts into coherent short-form videos",
    longDescription: [
      "Developed an automated pipeline that converts user text prompts into coherent short-form videos using AI and multimedia tools.",
      "Implemented LLM-based workflow to transform user prompts into structured storyboards.",
      "Integrated Edge-TTS for high-quality audio generation from text.",
      "Created a video search engine accessing multiple sources (Pexel, Pixabay, custom library).",
      "Built an LLM-powered relevancy checking system to ensure video-prompt coherence.",
      "Engineered video assembly process with animations and text overlay capabilities.",
    ],
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
    longDescription: [
      "Designed and implemented a React-based CCS with an intelligent tagging system that automatically categorizes content using LLMs.",
      "Built a responsive UI with intuitive workflows for creating multimedia-rich lessons using images and YouTube videos.",
      "Integrated a user input flow where an LLM generates a course structure and detailed content for each lesson.",
      "Enhanced content generation with LLM calls, selecting relevant images via image libraries, and retrieving YouTube videos using SERP API/Selenium.",
      "Merged textual and visual content by feeding image and video context back into the LLMs to refine and better align the generated material.",
    ],
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
    longDescription: [
      "Developed a full-featured project management platform for handling end-to-end project operations including creation, approval workflows, resource allocation, and reporting.",
      "Implemented multi-level approval flows for project creation involving Project Managers and Finance teams, with detailed status tracking and role-based access control.",
      "Built modules for timesheet tracking, revenue reporting, task assignment, and employee utilization, with features like AI-generated timesheet summaries and defaulter identification.",
      "Designed interactive dashboards and admin panels enabling seamless navigation for PMs, employees, and finance personnel.",
      "Integrated invoice generation, holiday tracking, exchange rate management, and LLM-powered automation to support operational efficiency.",
    ],
    techStack: ["React", "Node.js", "MySQL", "AWS", "REST APIs"],
    image: epms,
    link: "#",
    github: "https://github.com/sanjay0348/epms",
    year: 2023,
  },
];

function Project({ mode = "dark" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(projectData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  
  const themeMode = mode === "dark" ? "darkth" : "";

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectData.length);
    }, 3000); // Rotate every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projectData.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projectData.length) % projectData.length);
  };

  const goToProject = (index:any) => {
    setCurrentIndex(index);
  };

  const openModal = (project:any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    setIsAutoPlay(false);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsAutoPlay(true);
    document.body.style.overflow = "auto";
  };

  const getProjectPosition = (index:any) => {
    const diff = index - currentIndex;
    const totalProjects = projectData.length;
    
    // Normalize the difference to be between -totalProjects/2 and totalProjects/2
    let normalizedDiff = diff;
    if (Math.abs(diff) > totalProjects / 2) {
      normalizedDiff = diff > 0 ? diff - totalProjects : diff + totalProjects;
    }
    
    return normalizedDiff;
  };

  return (
  <div className={`projects-container ${themeMode}`} id="projects">

   
   <div className={`carousel-container ${themeMode}`}>
      <motion.h1
        className="carousel-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Projects
      </motion.h1>

      {/* Carousel Controls */}
      {/* <div className="carousel-controls">
        <motion.button
          className={`control-btn prev-btn ${themeMode}`}
          onClick={prevProject}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ‹
        </motion.button>

        <div className={`auto-play-toggle ${themeMode}`}>
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`toggle-btn ${isAutoPlay ? 'active' : ''}`}
          >
            {isAutoPlay ? '⏸️' : '▶️'}
          </button>
        </div>

        <motion.button
          className={`control-btn next-btn ${themeMode}`}
          onClick={nextProject}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ›
        </motion.button>
      </div> */}

      {/* Carousel */}
      <div className="carousel-wrapper">
        <div className="carousel-track">
          {projectData.map((project:any, index:any) => {
            const position = getProjectPosition(index);
            const isCenter = position === 0;
            const distance = Math.abs(position);
            
            return (
              <motion.div
                key={project.id}
                className={`carousel-card ${isCenter ? 'center' : ''} ${themeMode}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: position * 300,
                  scale: isCenter ? 1 : Math.max(0.7 - distance * 0.1, 0.5),
                  opacity: distance > 2 ? 0 : Math.max(1 - distance * 0.3, 0.3),
                  filter: isCenter ? 'blur(0px)' : `blur(${Math.min(distance * 2, 8)}px)`,
                  zIndex: 10 - distance,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                style={{
                  position: 'absolute',
                  left: '35%',
                  transform: 'translateX(-50%)',
                }}
                onClick={() => isCenter && openModal(project)}
              >
                <div className="card-image-container">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="card-image"
                  />
                  <div className="card-overlay">
                    {isCenter && (
                      <motion.button
                        className="view-details-btn"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        View Details
                      </motion.button>
                    )}
                  </div>
                </div>
                
                <div className="card-content">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-description">{project.description}</p>
                  
                  <div className="card-tech-stack">
                    {project.techStack.slice(0, 3).map((tech:any, idx:any) => (
                      <span key={idx} className={`tech-badge ${themeMode}`}>
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className={`tech-badge more-badge ${themeMode}`}>
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="carousel-indicators">
        {projectData.map((_:any, index:any) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''} ${themeMode}`}
            onClick={() => goToProject(index)}
          />
        ))}
      </div>

      {/* Modal */}
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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`modal-header ${themeMode}`}>
                <div className="header-content">
                  <div className="header-left">
                    <div className="header-column">
                      <h2 className={`project-title ${themeMode}`}>
                        {selectedProject.title}
                      </h2>
                      <button
                        className={`close-modal ${themeMode}`}
                        onClick={closeModal}
                      >
                        ×
                      </button>
                    </div>
                    <div className={`project-subtitle ${themeMode}`}>
                      <span className={`project-year ${themeMode}`}>
                        {selectedProject.year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-body">
                <div className="modal-image-container">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                  />
                </div>

                <div className={`modal-description ${themeMode}`}>
                  <ul className="point-list">
                    {selectedProject.longDescription.map((point:any, index:any) => (
                      <li key={index} className="project-description">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`modal-tech-stack ${themeMode}`}>
                  <h4>Technologies Used:</h4>
                  <div className="tech-badges">
                    {selectedProject.techStack.map((tech:any, idx:any) => (
                      <span
                        className={`tech-badge-modal ${themeMode}`}
                        key={idx}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    
    </div>
    </div>
  );
}

export default Project;
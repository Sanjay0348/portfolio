import  { useState, useEffect } from "react";
import "../assets/styles/Project.scss";
import t2v from "../assets/images/t2v.png";
import { motion, AnimatePresence } from "framer-motion";
import ccs from "../assets/images/ccs.png";
import epms from "../assets/images/epms.jpg";

import { imageContainerVariants,
  imageVariants,
  containerVariants,projectCardVariants,overlayVariants,buttonVariants,techBadgeVariants,titleVariants,modalVariants,modalContentVariants} from "../helpers/animation.helper"

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
  category?: string[]
}

// Project data based on your resume
const projectData: ProjectData[] =[
  {
    id: 1,
    title: "Text-to-Video Pipeline",
    category:[],
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
        {/* Enhanced Header Section */}
        <motion.div 
          className={`modal-header ${themeMode}`}
          variants={modalContentVariants}
        >
          <div className="header-content">
            <motion.div 
              className="header-left"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.h2 
                className={`project-title ${themeMode}`}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {selectedProject.title}
              </motion.h2>
              <motion.div 
                className={`project-subtitle ${themeMode}`}
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className={`project-year ${themeMode}`}>
                  {selectedProject.year}
                </span>
                {selectedProject.category && (
                  <>
                    <span className="separator">•</span>
                    <span className={`project-category ${themeMode}`}>
                      {selectedProject.category}
                    </span>
                  </>
                )}
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="header-right"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Project Status Badge */}
              {/* {selectedProject.status && (
                <motion.div 
                  className={`status-badge ${selectedProject.status.toLowerCase()} ${themeMode}`}
                  whileHover={{ scale: 1.05 }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {selectedProject.status}
                </motion.div>
              )} */}
              
              {/* Action Buttons */}
              {/* <div className="header-actions">
                {selectedProject.github && (
                  <motion.a 
                    href={selectedProject.github} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`action-btn github-btn ${themeMode}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Code
                  </motion.a>
                )}
                
                {selectedProject.link && selectedProject.link !== "#" && (
                  <motion.a 
                    href={selectedProject.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`action-btn live-btn ${themeMode}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15,3 21,3 21,9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    Live Demo
                  </motion.a>
                )}
              </div> */}
              
              {/* Close Button */}
              <motion.button 
                className={`close-modal ${themeMode}`}
                onClick={closeModal}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                ×
              </motion.button>
            </motion.div>
          </div>
          
          {/* Divider Line */}
          <motion.div 
            className={`header-divider ${themeMode}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          />
        </motion.div>
        
        {/* Main Content */}
        <div className="modal-body">
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
                  className={`tech-badge-modal ${themeMode}`}
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
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}

export default Project;
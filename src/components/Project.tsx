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

const projectData:ProjectData[] =[
  {
    id: 1,
    title: "AI-Powered Text-to-Video Generation Platform",
    category: ["AI/LLM", "Cloud", "Microservices"],
    description:
      "End-to-end automated video generation platform using LLMs and serverless architecture",
    longDescription: [
      "🎯 Problem: Manual video creation took hours; needed scalable AI-driven automation for content generation at scale.",
      
      "🏗️ Architecture: Built event-driven, asynchronous pipeline using AWS Step Functions and Lambda for handling large-scale video generation workloads. Migrated from monolithic to microservices, reducing release cycles by 30%.",
      
      "🤖 AI/LLM Integration: Implemented LLM-based workflow to transform user prompts into structured storyboards with 85% narrative coherence. Built intelligent video search engine with relevancy checking across multiple APIs (Pexels, Pixabay).",
      
      "⚡ Performance: Reduced video production time by 75% through parallel processing and intelligent caching strategies.",
      
      "🔧 Engineering Highlights: Integrated Edge-TTS for high-quality audio generation, FFmpeg for video assembly with animations and text overlays, and S3 for scalable media storage.",
      
      "📊 Impact: Enabled automated generation of 100+ videos/day with minimal human intervention, maintaining high quality standards."
    ],
    techStack: [
      "Node.js",
      "React",
      "LLMs",
      "AWS Step Functions",
      "Lambda",
      "S3",
      "Edge-TTS",
      "FFmpeg",
      "Pexels/Pixabay APIs",
      "Event-Driven Architecture"
    ],
    image: t2v,
    link: "#",
    github: "https://github.com/sanjay0348/text-to-video-pipeline",
    year: 2025,
  },
  {
    id: 2,
    title: "AI-Based Assessment & Question Generation Platform",
    category: ["AI/LLM", "RAG", "Backend"],
    description:
      "Intelligent assessment system using RAG and semantic search for context-aware question generation",
    longDescription: [
      "🎯 Problem: Manual creation of assessment questions from documents was time-consuming and inconsistent. Needed AI system to auto-generate contextual, relevant questions with difficulty control.",
      
      "🏗️ Architecture: Designed RAG (Retrieval-Augmented Generation) pipeline using LangChain and ChromaDB for semantic document retrieval. Built FastAPI backend with MongoDB for scalable question bank management.",
      
      "🤖 AI/LLM Integration: Implemented semantic retrieval pipelines with vector embeddings in ChromaDB, improving answer relevance and reducing hallucinations. Used prompt engineering for dynamic question generation with context and difficulty control.",
      
      "⚡ Performance: Automated question generation reduced manual effort by 70%. Vector search in ChromaDB provides <100ms query latency for document retrieval.",
      
      "🔧 Engineering Highlights: Built document preprocessing pipeline supporting PDFs, DOCx, and text files. Implemented caching layer with Redis for frequently accessed questions. Designed admin dashboard in React for question review and editing.",
      
      "📊 Impact: Generated 1000+ high-quality questions across multiple domains with AI-powered relevance scoring."
    ],
    techStack: [
      "Python",
      "FastAPI",
      "LangChain",
      "RAG",
      "ChromaDB",
      "MongoDB",
      "React",
      "AWS S3",
      "Vector Embeddings",
      "Semantic Search"
    ],
    image: ccs,
    link: "#",
    github: "https://github.com/sanjay0348/intelligent-content-system",
    year: 2024,
  },
  {
    id: 3,
    title: "Electronic Project Management System (EPMS)",
    category: ["Full-Stack", "Cloud", "Enterprise"],
    description:
      "Multi-tenant SaaS platform with RBAC, approval workflows, and real-time dashboards",
    longDescription: [
      "🎯 Problem: Manual project management across teams led to delays, lack of visibility, and inefficient resource allocation. Needed enterprise-grade SaaS solution with role-based access and automated workflows.",
      
      "🏗️ Architecture: Designed multi-tenant SaaS architecture with secure authentication using JWT and OAuth 2.0. Implemented fine-grained RBAC across backend APIs and UI for Admin, User, Project Manager, and Finance roles. Deployed on AWS Lambda with CloudFormation for infrastructure-as-code.",
      
      "🔒 Security: Enforced JWT-based stateless authentication with role-based authorization middleware. Implemented OAuth 2.0 for third-party integrations. Built audit logging for compliance tracking.",
      
      "⚡ Performance: Used Kafka for event streaming and Redis for caching frequently accessed data. Optimized database queries reducing page load time by 40%.",
      
      "🔧 Engineering Highlights: Built multi-level approval workflows with status tracking, real-time dashboards with revenue reporting, automated timesheet summaries using LLMs, and defaulter identification. Integrated invoice generation, holiday tracking, and exchange rate management.",
      
      "📊 Impact: Streamlined project operations by 50%, reduced manual effort by 70%, and improved team productivity by 35%. System supports 100+ concurrent users with <200ms average API response time."
    ],
    techStack: [
      "React",
      "Node.js",
      "MySQL",
      "MongoDB",
      "AWS Lambda",
      "CloudFormation",
      "Kafka",
      "Redis",
      "JWT",
      "OAuth 2.0",
      "REST APIs",
      "RBAC"
    ],
    image: epms,
    link: "#",
    github: "https://github.com/sanjay0348/epms",
    year: 2023,
  },
];

function Project({ mode = "dark" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectData>({
  id: 0,
  title: '',
  description: '',
  longDescription: [],
  techStack: [],
  image: '',
  link: '',
  year: new Date().getFullYear(),
});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  
  const themeMode = mode === "dark" ? "darkth" : "";

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectData.length);
    }, 5000); // Rotate every 5 seconds

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
                  {/* <div className="card-overlay">
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
                  </div> */}
                </div>
                
                <div className="card-content">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-description">{project.description}</p>
                  
                  <div className="card-tech-stack">
                    {project.techStack.map((tech:any, idx:any) => (
                      <span key={idx} className={`tech-badge ${themeMode}`}>
                        {tech}
                      </span>
                    ))}
                    {/* {project.techStack.length > 3 && (
                      <span className={`tech-badge more-badge ${themeMode}`}>
                        +{project.techStack.length - 3}
                      </span>
                    )} */}
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
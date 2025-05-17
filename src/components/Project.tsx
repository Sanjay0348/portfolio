import React, { useState, useEffect } from "react";
import "../assets/styles/Project.scss";
import t2v from "../assets/images/t2v.png";
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
const projectData: ProjectData[] = [
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

function Project({ mode }: any) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );
  const themeMode = mode === "dark" ? "darkth" : "";
  const [filter, setFilter] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] =
    useState<ProjectData[]>(projectData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);

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

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute("data-id"));
            if (!animatedItems.includes(id)) {
              setAnimatedItems((prev) => [...prev, id]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".project-card").forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [filteredProjects, animatedItems]);

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
      <h1 className="text-center my-4" style={{ background: "none" }}>
        Projects
      </h1>

      <div className="filter-container mb-4">
        <div className="filter-label">Filter by technology:</div>
        <select
          className="filter-dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Projects</option>
          {allTechStacks.map((tech, index) => (
            <option key={index} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div
              className={`project-card ${
                animatedItems.includes(project.id) ? "animated" : ""
              }`}
              key={project.id}
              data-id={project.id}
            >
              <div className="project-image-container">
                <img
                  src={project.image}
                  className="project-image"
                  alt={project.title}
                />
                <div className="project-overlay">
                  <button
                    className="view-details-btn"
                    onClick={() => openModal(project)}
                  >
                    View Details
                  </button>
                </div>
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech-stack">
                  {project.techStack.slice(0, 3).map((tech, idx) => (
                    <span className="tech-badge" key={idx}>
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="tech-badge more-badge">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
                {/* <div className="project-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="github-link"
                    >
                      <i className="fab fa-github"></i> Code
                    </a>
                  )}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="demo-link"
                  >
                    <i className="fas fa-external-link-alt"></i> Demo
                  </a>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-projects">
          <p>No projects match the selected filter.</p>
          <button className="reset-filter-btn" onClick={() => setFilter("all")}>
            Show All Projects
          </button>
        </div>
      )}

      {/* Project Details Modal */}
      {isModalOpen && selectedProject && (
        <div className={themeMode}>
          <div className="project-modal-overlay" onClick={closeModal}>
            <div
              className="project-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal" onClick={closeModal}>
                ×
              </button>
              <h2>{selectedProject.title}</h2>
              <div className="modal-image-container">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
              <div className="project-year">Year: {selectedProject.year}</div>
              <div className="modal-description">
                <p>{selectedProject.longDescription}</p>
              </div>
              <div className="modal-tech-stack">
                <h4>Technologies Used:</h4>
                <div className="tech-badges">
                  {selectedProject.techStack.map((tech, idx) => (
                    <span className="tech-badge" key={idx}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              {/* <div className="modal-links">
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="github-link"
                >
                  <i className="fab fa-github"></i> View Code
                </a>
              )}
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noreferrer"
                className="demo-link"
              >
                <i className="fas fa-external-link-alt"></i> Live Demo
              </a>
            </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;

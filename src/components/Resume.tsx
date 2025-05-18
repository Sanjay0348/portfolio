import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileDown, Eye, Download, ExternalLink, Maximize, Minimize } from "lucide-react";
import "../assets/styles/Resume.scss";

const Resume = ({ mode }:any) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const resumePdfPath = "/Sanjay_Venkat.pdf";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Download resume function
  const handleDownload = () => {
    // Create a link element to trigger download
    const link = document.createElement('a');
    link.href = resumePdfPath;
    link.download = 'Sanjay_V.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Toggle fullscreen preview
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Open PDF in new tab
  const handleViewInNewTab = () => {
    window.open(resumePdfPath, '_blank');
  };

  return (
    <div className={`resume-container ${mode}`}>
      <div className="resume-content">
        <motion.div
          className="resume-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>My Resume</h2>
          <p>View my professional resume and download it for your reference.</p>
        </motion.div>

        <motion.div 
          className={`resume-preview-container ${isFullscreen ? 'fullscreen' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`resume-preview-wrapper ${isFullscreen ? 'fullscreen-wrapper' : ''}`}>
            {isFullscreen && (
              <div className="fullscreen-controls">
                <motion.button
                  onClick={toggleFullscreen}
                  className="control-button minimize"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Minimize size={24} />
                </motion.button>
              </div>
            )}

            <motion.div 
              className={`resume-iframe-container ${isFullscreen ? 'fullscreen-iframe' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <iframe 
                src={`${resumePdfPath}#view=FitH`} 
                title="Resume Preview"
              />
            </motion.div>

            {!isFullscreen && (
              <motion.div 
                className="resume-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.button
                  onClick={handleDownload}
                  className="action-button download"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={20} />
                  Download PDF
                </motion.button>
                
                <motion.button
                  onClick={handleViewInNewTab}
                  className="action-button view"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={20} />
                  Open in New Tab
                </motion.button>
                
                <motion.button
                  onClick={toggleFullscreen}
                  className="action-button fullscreen"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Maximize size={20} />
                  Fullscreen View
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {!isFullscreen && (
          <motion.div 
            className="resume-highlights"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3>Resume Highlights</h3>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="highlights-content"
            >
              <motion.div variants={itemVariants} className="highlight-item">
                <h4>Professional Summary</h4>
                <p>
                  Experienced developer with expertise in modern web technologies, creating responsive
                  and interactive applications. Skilled in both frontend and backend development, with
                  a focus on React, TypeScript, and various supporting technologies.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="highlight-item">
                <h4>Key Qualifications</h4>
                <ul>
                  <li>Frontend development with React, TypeScript, and modern CSS frameworks</li>
                  <li>Responsive design and interactive UI/UX implementations</li>
                  <li>Backend development and API integration</li>
                  <li>Version control and collaborative development workflows</li>
                </ul>
              </motion.div>
              
              <motion.div variants={itemVariants} className="highlight-item">
                <h4>Portfolio Showcase</h4>
                <p>
                  This portfolio site demonstrates my technical skills and design aesthetics,
                  featuring responsive layouts, modern animations, and clean code architecture.
                  Download my full resume to see my complete work history and qualifications.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Resume;
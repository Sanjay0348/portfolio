import React, { useState, useEffect } from 'react';
import { GitHub, LinkedIn, Code, CloudQueue, Bolt } from "@mui/icons-material";
import { motion } from "framer-motion";
import '../assets/styles/Main.scss';

function Main() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Building innovative software solutions";
  const typingSpeed = 100;
  const roles = ["Full Stack Developer", "AWS Developer", "Cloud Solutions Architect", "GenAI Engineer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // Typing animation effect
  useEffect(() => {
    if (isLoaded) {
      if (typedText.length < fullText.length) {
        const timer = setTimeout(() => {
          setTypedText(fullText.substring(0, typedText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timer);
      }
    }
  }, [typedText, isLoaded]);

  // Role rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Load effect
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="main-container" id="home">
      <div className="hero-background">
        <div className="overlay"></div>
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
      
      <div className="container">
        <div className="about-section">
          <div className="content-wrapper">
            <motion.div 
              className="content"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="social_icons">
                <motion.a 
                  href="https://github.com/Sanjay0348" 
                  target="_blank" 
                  rel="noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  <GitHub/>
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/sanjay-venkat0348" 
                  target="_blank" 
                  rel="noreferrer"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                >
                  <LinkedIn/>
                </motion.a>
              </div>
              
              <div className="greeting">👋 Hi there, I'm</div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Sanjay V
              </motion.h1>
              
              <div className="role-container">
                <motion.div 
                  className="role"
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {roles[currentRoleIndex]}
                </motion.div>
              </div>
              
              <motion.p 
                className="tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {typedText}
                <span className="cursor">|</span>
              </motion.p>
              
              <div className="skill-highlights">
                <div className="skill-tag">
                  <Code /> React/Node.js
                </div>
                <div className="skill-tag">
                  <CloudQueue /> AWS Services
                </div>
                <div className="skill-tag">
                  <Bolt /> GenAI/LLM
                </div>
              </div>
              
              <div className="cta-buttons">
                <motion.a 
                  href="#project" 
                  className="cta-button primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.a>
                <motion.a 
                  href="#contact" 
                  className="cta-button secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.a>
              </div>
              
              <div className="mobile_social_icons">
                <a href="https://github.com/Sanjay0348" target="_blank" rel="noreferrer"><GitHub/></a>
                <a href="http://www.linkedin.com/in/sanjay-venkat0348" target="_blank" rel="noreferrer"><LinkedIn/></a>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="image-wrapper"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="profile-image-placeholder">
              <div className="avatar-circle">
                <span className="initials">SV</span>
              </div>
              <div className="experience-badge">3+ YRS EXP</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Main;
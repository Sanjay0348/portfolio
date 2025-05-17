import { useState, useEffect, useRef } from "react";
import { GitHub, LinkedIn, Code, CloudQueue, Bolt } from "@mui/icons-material";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import "../assets/styles/Main.scss";

interface MainProps {
  mode: string;
}

function Main({ mode }: MainProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>("");
  const themeMode = mode === "dark" ? "darkth" : "lightth";
  const mainRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mainRef, { once: false, amount: 0.3 });

  // For parallax scrolling effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 200, 300], [1, 0.5, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  // Smooth spring animation for parallax
  const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(y2, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  const fullText = "Building innovative software solutions";
  const typingSpeed = 100;
  const roles = [
    "Full Stack Developer",
    "AWS Developer",
    "Cloud Solutions Architect",
    "GenAI Engineer",
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState<number>(0);

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
  }, [typedText, isLoaded, fullText]);

  // Role rotation effect with improved animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Load effect
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      slowScrollTo(element);
    }
  };

  function slowScrollTo(element: HTMLElement, duration = 1200) {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    function animation(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    }

    function easeInOutQuad(t: number): number {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(animation);
  }

  // Animation variants for staggered children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Social media icon animation variants
  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -5, 0],
      transition: { duration: 0.5 },
    },
    tap: { scale: 0.9 },
  };

  // Floating shapes animation variants
  const floatingShapeVariants = {
    animate: (custom: number) => ({
      y: [0, custom * 20, 0],
      rotate: [0, custom * 5, 0],
      transition: {
        duration: 5 + custom * 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className={`${themeMode}`} ref={mainRef}>
      <motion.div
        className="main-section"
        id="home"
        style={{
          scale: smoothScale,
        }}
      >
        <motion.div className="hero-background">
          <div className="overlay"></div>
          <motion.div
            className="floating-shape shape-1"
            variants={floatingShapeVariants}
            animate="animate"
            custom={1}
            style={{ y: smoothY1 }}
          ></motion.div>
          <motion.div
            className="floating-shape shape-2"
            variants={floatingShapeVariants}
            animate="animate"
            custom={-1.5}
            style={{ y: smoothY2 }}
          ></motion.div>
          <motion.div
            className="floating-shape shape-3"
            variants={floatingShapeVariants}
            animate="animate"
            custom={0.8}
          ></motion.div>
        </motion.div>

        <div className="container">
          <div className="about-section">
            <motion.div
              className="content-wrapper"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <div className="content">
                <motion.div className="social_icons" variants={itemVariants}>
                  <motion.a
                    href="https://github.com/Sanjay0348"
                    target="_blank"
                    rel="noreferrer"
                    variants={socialIconVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <GitHub />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/sanjay-venkat0348"
                    target="_blank"
                    rel="noreferrer"
                    variants={socialIconVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <LinkedIn />
                  </motion.a>
                </motion.div>

                <motion.div className="greeting" variants={itemVariants}>
                  👋 Hi there, I'm
                </motion.div>

                <motion.h1 variants={itemVariants}>Sanjay V</motion.h1>

                <motion.div className="role-container" variants={itemVariants}>
                  <AnimatePresence mode="wait">
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
                  </AnimatePresence>
                </motion.div>

                <motion.p className="tagline" variants={itemVariants}>
                  {typedText}
                  <motion.span
                    className="cursor"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    |
                  </motion.span>
                </motion.p>

                <motion.div
                  className="skill-highlights"
                  variants={itemVariants}
                >
                  <motion.div
                    className="skill-tag"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: mode === "dark" ? "#2a2a3a" : "#f0f0f0",
                    }}
                  >
                    <Code /> React/Node.js
                  </motion.div>
                  <motion.div
                    className="skill-tag"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: mode === "dark" ? "#2a2a3a" : "#f0f0f0",
                    }}
                  >
                    <CloudQueue /> AWS Services
                  </motion.div>
                  <motion.div
                    className="skill-tag"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: mode === "dark" ? "#2a2a3a" : "#f0f0f0",
                    }}
                  >
                    <Bolt /> GenAI/LLM
                  </motion.div>
                </motion.div>

                <motion.div className="cta-buttons" variants={itemVariants}>
                  <motion.a
                    className="cta-button primary"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      scrollToSection("projects");
                    }}
                    id="project"
                  >
                    View Projects
                  </motion.a>
                  <motion.a
                    className="cta-button secondary"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      scrollToSection("contact");
                    }}
                  >
                    Contact Me
                  </motion.a>
                </motion.div>

                <motion.div
                  className="mobile_social_icons"
                  variants={itemVariants}
                >
                  <motion.a
                    href="https://github.com/Sanjay0348"
                    target="_blank"
                    rel="noreferrer"
                    variants={socialIconVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <GitHub />
                  </motion.a>
                  <motion.a
                    href="http://www.linkedin.com/in/sanjay-venkat0348"
                    target="_blank"
                    rel="noreferrer"
                    variants={socialIconVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <LinkedIn />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="image-wrapper"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
            >
              <motion.div
                className="profile-image-placeholder"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="avatar-circle"
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(255, 255, 255, 0.2)",
                      "0 0 20px rgba(255, 255, 255, 0.3)",
                      "0 0 0 rgba(255, 255, 255, 0.2)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="initials">SV</span>
                </motion.div>
                <motion.div
                  className="experience-badge"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  2+ YRS EXP
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Main;

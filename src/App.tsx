// import { useState, useEffect, useRef, createRef, RefObject } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Main,
//   Timeline,
//   Expertise,
//   Project,
//   Contact,
//   Navigation,
//   Footer,
// } from "./components";
// import "./index.scss";

// interface AppProps {}

// function App() {
//   const [mode, setMode] = useState<string>("dark");
//   const [currentSection, setCurrentSection] = useState<number>(0);
//   const sections = ["home", "expertise", "timeline", "projects", "contact"];
//   const sectionRefs = useRef<RefObject<HTMLElement>[]>(
//     sections.map(() => createRef<HTMLElement>())
//   );

//   // Enhanced scroll detection for active section
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY + window.innerHeight / 3;

//       let activeSection = 0;
//       sectionRefs.current.forEach((ref, index) => {
//         if (ref.current) {
//           const element = ref.current;
//           const offsetTop = element.offsetTop;
//           const height = element.offsetHeight;

//           if (
//             scrollPosition >= offsetTop &&
//             scrollPosition < offsetTop + height
//           ) {
//             activeSection = index;
//           }
//         }
//       });

//       setCurrentSection(activeSection);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleModeChange = () => {
//     setMode(mode === "dark" ? "light" : "dark");
//   };

//   useEffect(() => {
//     window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//   }, []);

//   // Page transition variants
//   const pageVariants = {
//     initial: {
//       opacity: 0,
//     },
//     in: {
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         staggerChildren: 0.2,
//       },
//     },
//     out: {
//       opacity: 0,
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };

//   // Background animation based on scroll
//   const bgVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { duration: 1.5 },
//     },
//   };

//   // Animation for each section as they come into view
//   const sectionVariants = {
//     offscreen: {
//       y: 50,
//       opacity: 0,
//     },
//     onscreen: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         bounce: 0.4,
//         duration: 0.8,
//       },
//     },
//   };

//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         className={`main-container ${
//           mode === "dark" ? "dark-mode" : "light-mode"
//         }`}
//         initial="initial"
//         animate="in"
//         exit="out"
//         variants={pageVariants}
//       >
//         <motion.div
//           className="bg-animation"
//           variants={bgVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {/* Optional animated background elements */}
//           <motion.div
//             className="bg-particle"
//             animate={{
//               y: [0, -10, 0],
//               opacity: [0.3, 0.8, 0.3],
//             }}
//             transition={{
//               duration: 6,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//           />
//           <motion.div
//             className="bg-particle particle-2"
//             animate={{
//               y: [0, 15, 0],
//               opacity: [0.2, 0.6, 0.2],
//             }}
//             transition={{
//               duration: 8,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//           />
//         </motion.div>

//         <Navigation
//           parentToChild={{ mode }}
//           modeChange={handleModeChange}
//           activeSection={currentSection}
//         />

//         <motion.section
//           ref={sectionRefs.current[0] as RefObject<HTMLElement>}
//           id="home"
//           initial="offscreen"
//           whileInView="onscreen"
//           viewport={{ once: false, amount: 0.1 }}
//         >
//           <motion.div variants={sectionVariants}>
//             <Main mode={mode} />
//           </motion.div>
//         </motion.section>

//         <motion.section
//           ref={sectionRefs.current[1] as RefObject<HTMLElement>}
//           id="expertise"
//           initial="offscreen"
//           whileInView="onscreen"
//           viewport={{ once: false, amount: 0.1 }}
//         >
//           <motion.div variants={sectionVariants}>
//             <Expertise mode={mode} />
//           </motion.div>
//         </motion.section>

//         <motion.section
//           ref={sectionRefs.current[2] as RefObject<HTMLElement>}
//           id="timeline"
//           initial="offscreen"
//           whileInView="onscreen"
//           viewport={{ once: false, amount: 0.1 }}
//         >
//           <motion.div variants={sectionVariants}>
//             <Timeline mode={mode} />
//           </motion.div>
//         </motion.section>

//         <motion.section
//           ref={sectionRefs.current[3] as RefObject<HTMLElement>}
//           id="projects"
//           initial="offscreen"
//           whileInView="onscreen"
//           viewport={{ once: false, amount: 0.1 }}
//         >
//           <motion.div variants={sectionVariants}>
//             <Project mode={mode} />
//           </motion.div>
//         </motion.section>

//         <motion.section
//           ref={sectionRefs.current[4] as RefObject<HTMLElement>}
//           id="contact"
//           initial="offscreen"
//           whileInView="onscreen"
//           viewport={{ once: false, amount: 0.1 }}
//         >
//           <motion.div variants={sectionVariants}>
//             <Contact mode={mode} />
//           </motion.div>
//         </motion.section>

//         <Footer mode={mode} />
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// export default App;

import { useState, useEffect, useRef, createRef, RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Main,
  Timeline,
  Expertise,
  Project,
  Contact,
  Navigation,
  Footer,
  Resume,
} from "./components";
import "./index.scss";
import { Routes,Route } from "react-router";


interface AppProps {}

function App() {
  const [mode, setMode] = useState<string>("dark");
  const [currentSection, setCurrentSection] = useState<number>(0);
  const sections = ["home", "expertise", "timeline", "projects", "resume", "contact"];
  const sectionRefs = useRef<RefObject<HTMLElement>[]>(
    sections.map(() => createRef<HTMLElement>())
  );

  // Enhanced scroll detection for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let activeSection = 0;
      sectionRefs.current.forEach((ref, index) => {
        if (ref.current) {
          const element = ref.current;
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + height
          ) {
            activeSection = index;
          }
        }
      });

      setCurrentSection(activeSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleModeChange = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
    out: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Background animation based on scroll
  const bgVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.5 },
    },
  };

  // Animation for each section as they come into view
  const sectionVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  const LayoutComponent=()=>{
    return (<></> )
  }

  return (

   <Routes>
  <Route path="/" element={ <AnimatePresence mode="wait">
      <motion.div
        className={`main-container ${
          mode === "dark" ? "dark-mode" : "light-mode"
        }`}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        <motion.div
          className="bg-animation"
          variants={bgVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Optional animated background elements */}
          <motion.div
            className="bg-particle"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="bg-particle particle-2"
            animate={{
              y: [0, 15, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <Navigation
          parentToChild={{ mode }}
          modeChange={handleModeChange}
          activeSection={currentSection}
        />

        <motion.section
          ref={sectionRefs.current[0] as RefObject<HTMLElement>}
          id="home"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false, amount: 0.1 }}
        >
          <motion.div variants={sectionVariants}>
            <Main mode={mode} />
          </motion.div>
        </motion.section>

        <motion.section
          ref={sectionRefs.current[1] as RefObject<HTMLElement>}
          id="expertise"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false, amount: 0.1 }}
        >
          <motion.div variants={sectionVariants}>
            <Expertise mode={mode} />
          </motion.div>
        </motion.section>

        <motion.section
          ref={sectionRefs.current[2] as RefObject<HTMLElement>}
          id="timeline"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false, amount: 0.1 }}
        >
          <motion.div variants={sectionVariants}>
            <Timeline mode={mode} />
          </motion.div>
        </motion.section>

        <motion.section
          ref={sectionRefs.current[3] as RefObject<HTMLElement>}
          id="projects"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false, amount: 0.1 }}
        >
          <motion.div variants={sectionVariants}>
            <Project mode={mode} />
          </motion.div>
        </motion.section>

        {/* <motion.section
          ref={sectionRefs.current[4] as RefObject<HTMLElement>}
          id="resume"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false, amount: 0.1 }}
        >
          <motion.div variants={sectionVariants}>
            <Resume mode={mode} />
          </motion.div>
        </motion.section> */}

        <motion.section
          ref={sectionRefs.current[5] as RefObject<HTMLElement>}
          id="contact"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false, amount: 0.1 }}
        >
          <motion.div variants={sectionVariants}>
            <Contact mode={mode} />
          </motion.div>
        </motion.section>

        <Footer mode={mode} />
      </motion.div>
    </AnimatePresence>  } />
 
  <Route path="/resume" element={ <Resume mode={mode} /> } />
  
  
  //  </Routes> 
   
  );
}

export default App;
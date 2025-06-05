// import { useState, useEffect, useRef, createRef, RefObject } from "react";
// import { motion, AnimatePresence ,useScroll, useTransform} from "framer-motion";
// import {
//   Main,
//   Timeline,
//   Expertise,
//   Project,
//   Contact,
//   Navigation,
//   Footer,
//   Resume,
// } from "./components/index.js";
// import "./index.scss";


// interface AppProps {}

// function App() {
//   const [mode, setMode] = useState<string>("dark");
//   const [currentSection, setCurrentSection] = useState<number>(0);
//   const sections = ["home", "expertise", "timeline", "projects", "resume", "contact"];
//   const sectionRefs = useRef<RefObject<HTMLElement>[]>(
//     sections.map(() => createRef<HTMLElement>())
//   );

//  const mainRef = useRef<HTMLDivElement>(null);

// const { scrollYProgress } = useScroll({
//   target: mainRef,
//   offset:["start start","center center"]
// });
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

//   const LayoutComponent=()=>{
//     return (<></> )
//   }
// const homeTransform:any=useTransform(scrollYProgress,[0,1],[1,0.8] )
//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//       ref={mainRef}
//         className={`main-container ${
//           mode === "dark" ? "dark-mode" : "light-mode"
//         } ` }
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
//           className={`home ${mode}`}
//           whileInView="onscreen"
//           viewport={{ once: false, amount: 0.1 }}
//         >
//           <motion.div variants={sectionVariants} >
//             <Main mode={mode} scrollYProgress={scrollYProgress} />
//           </motion.div>
//         </motion.section>

//         <motion.section
//           ref={sectionRefs.current[1] as RefObject<HTMLElement>}
//           id="expertise"
//           className={`expertise`}
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
//           className="timeline"
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
//           className="projects"
//           initial="offscreen"
//           whileInView="onscreen"
//           viewport={{ once: false, amount: 0.1 }}
//         >
//           <motion.div variants={sectionVariants}>
//             <Project mode={mode} />
//           </motion.div>
//         </motion.section>

//         {/* <motion.section
//           ref={sectionRefs.current[4] as RefObject<HTMLElement>}
//           id="resume"
//           initial="offscreen"
//           whileInView="onscreen"
//           viewport={{ once: false, amount: 0.1 }}
//         >
//           <motion.div variants={sectionVariants}>
//             <Resume mode={mode} />
//           </motion.div>
//         </motion.section> */}

//         <motion.section
//           ref={sectionRefs.current[5] as RefObject<HTMLElement>}
//           id="contact"
//           className="contact"
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

// -------------------------------

// import { useState, useEffect, useRef, createRef, RefObject } from "react";
// import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
// import {
//   Main,
//   Timeline,
//   Expertise,
//   Project,
//   Contact,
//   Navigation,
//   Footer,
//   Resume,
// } from "./components/index.js";
// import "./index.scss";

// interface AppProps {}

// function App() {
//   const [mode, setMode] = useState<string>("dark");
//   const [currentSection, setCurrentSection] = useState<number>(0);
//   const sections = ["home", "expertise", "timeline", "projects", "resume", "contact"];
//   const sectionRefs = useRef<RefObject<HTMLElement>[]>(
//     sections.map(() => createRef<HTMLElement>())
//   );

//   const mainRef = useRef<HTMLDivElement>(null);

//   // Main scroll progress for the entire container
//   const { scrollYProgress } = useScroll({
//     target: mainRef,
//     offset: ["start start", "end end"]
//   });

//   // Create parallax transforms for each section
//   // Each section will have different parallax speeds and effects
//   const homeTransform = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
//   const homeScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
//   const homeOpacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 0.8, 0.6]);

//   const expertiseTransform = useTransform(scrollYProgress, [0.15, 0.4], [100, -50]);
//   const expertiseScale = useTransform(scrollYProgress, [0.2, 0.4], [0.95, 1]);

//   const timelineTransform = useTransform(scrollYProgress, [0.35, 0.6], [100, -50]);
//   const timelineRotate = useTransform(scrollYProgress, [0.4, 0.6], [2, 0]);

//   const projectsTransform = useTransform(scrollYProgress, [0.55, 0.8], [100, -50]);
//   const projectsScale = useTransform(scrollYProgress, [0.6, 0.8], [0.98, 1]);

//   const contactTransform = useTransform(scrollYProgress, [0.75, 1], [100, 0]);
//   const contactOpacity = useTransform(scrollYProgress, [0.8, 1], [0.7, 1]);

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
//         ref={mainRef}
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
//           {/* Parallax background particles */}
//           <motion.div
//             className="bg-particle"
//             style={{
//               y: useTransform(scrollYProgress, [0, 1], [0, -200]),
//             }}
//             animate={{
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
//             style={{
//               y: useTransform(scrollYProgress, [0, 1], [0, -400]),
//             }}
//             animate={{
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

//         {/* Home Section with Parallax */}
//         <motion.section
//           ref={sectionRefs.current[0] as RefObject<HTMLElement>}
//           id="home"
//           className={`home ${mode}`}
          
//           initial="offscreen"
//           whileInView="onscreen"
//           viewport={{ once: false, amount: 0.1 }}
//         >
//           <motion.div variants={sectionVariants}>
//             <Main mode={mode} />
//           </motion.div>
//         </motion.section>

//         {/* Expertise Section with Parallax */}
//         <motion.section
//           ref={sectionRefs.current[1] as RefObject<HTMLElement>}
//           id="expertise"
//           className="expertise"
//           style={{
//             y: expertiseTransform,
//             scale: expertiseScale,
//           }}
//           initial="offscreen"
//           whileInView="onscreen"
//           viewport={{ once: false, amount: 0.1 }}
//         >
//           <motion.div variants={sectionVariants}>
//             <Expertise mode={mode} />
//           </motion.div>
//         </motion.section>

//         {/* Timeline Section with Parallax */}
//         <motion.section
//           ref={sectionRefs.current[2] as RefObject<HTMLElement>}
//           id="timeline"
//           className="timeline"
//           style={{
//             y: timelineTransform,
//             rotate: timelineRotate,
//           }}
//           initial="offscreen"
//           whileInView="onscreen"
//           viewport={{ once: false, amount: 0.1 }}
//         >
//           <motion.div variants={sectionVariants}>
//             <Timeline mode={mode} />
//           </motion.div>
//         </motion.section>

//         {/* Projects Section with Parallax */}
//         <motion.section
//           ref={sectionRefs.current[3] as RefObject<HTMLElement>}
//           id="projects"
//           className="projects"
//           style={{
//             y: projectsTransform,
//             scale: projectsScale,
//           }}
//           initial="offscreen"
//           whileInView="onscreen"
//           viewport={{ once: false, amount: 0.1 }}
//         >
//           <motion.div variants={sectionVariants}>
//             <Project mode={mode} />
//           </motion.div>
//         </motion.section>

//         {/* Resume Section - Commented out in original */}
//         {/* <motion.section
//           ref={sectionRefs.current[4] as RefObject<HTMLElement>}
//           id="resume"
//           initial="offscreen"
//           whileInView="onscreen"
//           viewport={{ once: false, amount: 0.1 }}
//         >
//           <motion.div variants={sectionVariants}>
//             <Resume mode={mode} />
//           </motion.div>
//         </motion.section> */}

//         {/* Contact Section with Parallax */}
//         <motion.section
//           ref={sectionRefs.current[5] as RefObject<HTMLElement>}
//           id="contact"
//           className="contact"
//           style={{
//             y: contactTransform,
//             opacity: contactOpacity,
//           }}
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
} from "./components/index.js";
import "./index.scss";


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
    <AnimatePresence mode="wait">
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
          className="home"
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
          className="expertise"
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
          className="timeline"
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
          className="projects"
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
          className="contact"
          viewport={{ once: false, amount: 0.1 }}
        >
          <motion.div variants={sectionVariants}>
            <Contact mode={mode} />
          </motion.div>
        </motion.section>

        <Footer mode={mode} />
      </motion.div>
    </AnimatePresence>

  //  <Routes>
  // <Route path="/" element={   } />
 
  // <Route path="/resume" element={ <Resume mode={mode} /> } />
  
  
  // </Routes> 
   
  );
}

export default App;
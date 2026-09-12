import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import Main from "./components/Main";
import Navigation from "./components/Navigation";
import Project from "./components/Project";
import EngineeringDNA from "./components/EngineeringDNA";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Impact from "./components/Impact";
import "./index.scss";

export default function App() {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem("mode") === "light" ? "light" : "dark";
    } catch {
      return "dark";
    }
  });
  useEffect(() => {
    document.documentElement.style.colorScheme = mode;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", mode === "dark" ? "#10110f" : "#f4f4ed");
    try {
      localStorage.setItem("mode", mode);
    } catch {
      /* Theme still works without storage. */
    }
  }, [mode]);
  return (
    <MotionConfig reducedMotion="user">
      <div className={`main-container ${mode}-mode`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navigation
          parentToChild={{ mode }}
          modeChange={() =>
            setMode((value) => (value === "dark" ? "light" : "dark"))
          }
        />
        <main id="main-content">
          <section id="home">
            <Main mode={mode} />
          </section>
          <div
            className="skill-marquee"
            aria-label="AI agents, distributed systems, full-stack products, cloud-native engineering"
          >
            <div aria-hidden="true">
              {[0, 1].map((copy) => (
                <div className="marquee-group" key={copy}>
                  {[
                    "AI AGENTS",
                    "DISTRIBUTED SYSTEMS",
                    "FULL STACK PRODUCTS",
                    "CLOUD NATIVE",
                  ].map((item) => (
                    <span key={item}>
                      {item}
                      <b>✳</b>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <Impact />
          <Project mode={mode} />
          <EngineeringDNA />
          <Timeline mode={mode} />
          <Contact mode={mode} />
        </main>
        <Footer mode={mode} />
      </div>
    </MotionConfig>
  );
}

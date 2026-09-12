import { useEffect, useState } from "react";
import {
  Main,
  Timeline,
  Expertise,
  Project,
  Contact,
  Navigation,
  Footer,
} from "./components/index.js";
import "./index.scss";
import AmbientLayer from "./components/AmbientLayer";
import About from "./components/About";
import EngineeringDNA from "./components/EngineeringDNA";
import Impact from "./components/Impact";

function App() {
  const [mode, setMode] = useState<string>("dark");

  useEffect(() => {
    setMode(localStorage.getItem("mode") || "dark");
  }, []);

  const handleModeChange = () => {
    setMode((current) => {
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem("mode", next);
      return next;
    });
  };

  return (
    <div className={`main-container ${mode === "dark" ? "dark-mode" : "light-mode"}`}>
      <AmbientLayer mode={mode} />
      <Navigation parentToChild={{ mode }} modeChange={handleModeChange} />

      <section id="home" className="home">
        <Main mode={mode} />
      </section>
      <About />
      <Expertise mode={mode} />
      <Project mode={mode} />
      <EngineeringDNA />
      <Impact />
      <Timeline mode={mode} />
      <Contact mode={mode} />
      <Footer mode={mode} />
    </div>
  );
}

export default App;

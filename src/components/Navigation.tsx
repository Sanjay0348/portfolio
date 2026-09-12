import { useEffect, useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { profile } from "../data/portfolio";
import "../assets/styles/Navigation.scss";

const navItems = [
  ["Work", "projects"],
  ["Stack", "stack"],
  ["Experience", "experience"],
  ["Contact", "contact"],
];

function Navigation({ parentToChild, modeChange }: { parentToChild: { mode: string }; modeChange: () => void }) {
  const { mode } = parentToChild;
  const isDarkMode = mode === "dark";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pageProgress, setPageProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setPageProgress(maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0);
      setScrolled(window.scrollY > 24);

      let current = "";
      navItems.forEach(([, id]) => {
        const element = document.getElementById(id);
        if (!element) return;
        const rect = element.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) current = id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""} ${isDarkMode ? "dark" : "light"}`}>
      <div className="nav-inner">
        <button type="button" className="nav-mark" onClick={() => go("home")}>
          Sanjay V
        </button>
        <nav className="nav-links">
          {navItems.map(([label, id]) => (
            <button
              key={id}
              type="button"
              className={activeSection === id ? "active" : ""}
              onClick={() => go(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="nav-resume" href={profile.resumePath} target="_blank" rel="noreferrer">
            Resume
          </a>
          <button type="button" className="nav-icon" onClick={modeChange} aria-label="Toggle theme">
            {isDarkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </button>
          <button type="button" className="nav-icon menu" onClick={() => setOpen((value) => !value)} aria-label="Menu">
            {open ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
          </button>
        </div>
      </div>
      <div className="scroll-progress">
        <motion.div className="scroll-progress-bar" style={{ transform: `scaleX(${pageProgress})` }} />
      </div>
      {open && (
        <div className="nav-drawer">
          {navItems.map(([label, id]) => (
            <button key={id} type="button" onClick={() => go(id)}>
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navigation;

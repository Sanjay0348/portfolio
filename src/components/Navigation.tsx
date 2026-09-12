import { useEffect, useState } from "react";
import { ArrowUpRight, Code2, Menu, Moon, Sun, X } from "lucide-react";
import { profile } from "../data/portfolio";
import "../assets/styles/Navigation.scss";
const items = [
  ["The work", "projects"],
  ["My toolkit", "stack"],
  ["Experience", "experience"],
  ["Say hello", "contact"],
];
export default function Navigation({
  parentToChild: { mode },
  modeChange,
}: {
  parentToChild: { mode: string };
  modeChange: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      let current = "";
      items.forEach(([, id]) => {
        const box = document.getElementById(id)?.getBoundingClientRect();
        if (box && box.top <= 160 && box.bottom > 160) current = id;
      });
      setActive(current);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <header className={`nav ${progress > 0 ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <a
          className="nav-mark"
          href="#home"
          onClick={() => setOpen(false)}
          aria-label="Sanjay V, home"
        >
          <span className="brand-icon">
            <Code2 size={19} />
          </span>
          sanjay<span className="brand-period">.</span>
          <span className="brand-role">ENGINEER & BUILDER</span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          {items.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="nav-icon"
            onClick={modeChange}
            aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} theme`}
          >
            {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            className="nav-resume"
            href={profile.resumePath}
            target="_blank"
            rel="noreferrer"
          >
            Resume <ArrowUpRight size={14} />
          </a>
          <button
            id="menu-toggle"
            className="nav-icon menu"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
      />
      {open && (
        <nav
          className="nav-drawer"
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {items.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={16} />
            </a>
          ))}
          <a
            href={profile.resumePath}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            Resume
            <ArrowUpRight size={16} />
          </a>
        </nav>
      )}
    </header>
  );
}

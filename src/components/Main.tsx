import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, MapPin } from "lucide-react";
import { profile } from "../data/portfolio";
import SystemExplorer from "./SystemExplorer";
import "../assets/styles/Main.scss";

export default function Main({ mode }: { mode: string }) {
  return (
    <div className={`hero ${mode}`}>
      <div className="site-wrap">
        <div className="hero-grid">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="hero-eyebrow">
              <span className="status-dot" /> FULL STACK AI ENGINEER{" "}
              <span className="eyebrow-divider">/</span> BUILDER AT HEART
            </p>
            <h1>
              Ideas are cool.
              <br />
              <span className="hero-outline">Shipping</span>
              <br />
              <span className="hero-accent">
                is cooler.
                <svg viewBox="0 0 380 20" aria-hidden="true">
                  <path d="M4 14 Q180 -4 372 9 M35 19 Q240 3 348 16" />
                </svg>
              </span>
              <span className="hero-spark" aria-hidden="true">
                ✳
              </span>
            </h1>
            <p className="hero-description">
              I'm Sanjay. I turn ambitious ideas into{" "}
              <strong>
                AI systems
                <br className="desktop-break" /> and production software
              </strong>{" "}
              that actually work.
            </p>
            <div className="hero-ctas">
              <a href="#projects" className="cta primary">
                Explore the work <ArrowUpRight size={19} />
              </a>
              <a
                href={profile.github}
                className="cta ghost"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={17} /> GitHub <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="hero-location">
              <MapPin size={13} /> Chennai, India <span>·</span> Currently
              building at Perfecter AI
            </div>
          </motion.div>
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, y: 30, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="visual-note">
              less talk. more systems.<span aria-hidden="true">↴</span>
            </div>
            <SystemExplorer />
            <div className="hero-visual-caption">
              <span>
                <span className="status-dot" /> ENGINEERED TO SHIP
              </span>
              <span>AI × FULL STACK × SYSTEMS</span>
            </div>
          </motion.div>
        </div>
        <div className="hero-bottom">
          <a href="#projects">
            <span className="scroll-circle">
              <ArrowDown size={16} />
            </span>{" "}
            SCROLL TO THE GOOD STUFF
          </a>
          <span>FROM FIRST COMMIT TO PRODUCTION.</span>
          <span>PORTFOLIO / 2026</span>
        </div>
      </div>
    </div>
  );
}

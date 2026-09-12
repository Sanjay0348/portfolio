import { MouseEvent, useState } from "react";
import { motion } from "framer-motion";
import "../assets/styles/Main.scss";
import { profile } from "../data/portfolio";
import CommandTerminal from "./CommandTerminal";
import { fadeUp, stagger } from "../helpers/motion";

interface MainProps {
  mode: string;
}

function Main({ mode }: MainProps) {
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });

  const onMagnet = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMagnet({
      x: (event.clientX - rect.left - rect.width / 2) * 0.25,
      y: (event.clientY - rect.top - rect.height / 2) * 0.25,
    });
  };

  return (
    <div className={`hero ${mode === "dark" ? "darkth" : "lightth"}`}>
      <div className="site-wrap hero-grid">
        <motion.div
          className="hero-copy"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="section-kicker" variants={fadeUp}>
            {profile.name}
          </motion.p>
          <motion.h1 variants={fadeUp}>{profile.headline}</motion.h1>
          <motion.p className="hero-role" variants={fadeUp}>
            {profile.roleLine}
          </motion.p>
          <motion.div className="hero-ctas" variants={fadeUp}>
            <motion.a
              href="#projects"
              className="cta primary"
              onMouseMove={onMagnet}
              onMouseLeave={() => setMagnet({ x: 0, y: 0 })}
              animate={{ x: magnet.x, y: magnet.y }}
              transition={{ type: "spring", stiffness: 240, damping: 18, mass: 0.4 }}
            >
              Explore my work →
            </motion.a>
            <a
              className="cta ghost"
              href={profile.resumePath}
              target="_blank"
              rel="noreferrer"
            >
              View resume ↗
            </a>
          </motion.div>
        </motion.div>
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <CommandTerminal />
        </motion.div>
      </div>
    </div>
  );
}

export default Main;

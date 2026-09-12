import { motion } from "framer-motion";
import { profile } from "../data/portfolio";
import { fadeUp, viewportOnce } from "../helpers/motion";
import "../assets/styles/About.scss";

function About() {
  return (
    <section className="site-section about-section" id="about">
      <div className="site-wrap">
        <motion.p
          className="section-kicker"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          Who I am
        </motion.p>
        <motion.h2
          className="section-title about-copy"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          {profile.about}
        </motion.h2>
        <motion.p
          className="about-meta"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          {profile.name} · {profile.location}
        </motion.p>
      </div>
    </section>
  );
}

export default About;

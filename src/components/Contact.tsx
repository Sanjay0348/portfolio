import { motion } from "framer-motion";
import { profile } from "../data/portfolio";
import { fadeUp, stagger, viewportOnce } from "../helpers/motion";
import "../assets/styles/Contact.scss";

function Contact({ mode }: { mode: string }) {
  return (
    <section className={`site-section contact-section ${mode}`} id="contact">
      <div className="site-wrap">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger}>
          <motion.p className="section-kicker" variants={fadeUp}>
            Let's build something
          </motion.p>
          <motion.h2 className="section-title contact-title" variants={fadeUp}>
            If you need production AI systems or backends that hold up under load, write to me.
          </motion.h2>
          <motion.div className="contact-links" variants={fadeUp}>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;

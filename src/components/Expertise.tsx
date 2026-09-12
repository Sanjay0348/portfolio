import { motion } from "framer-motion";
import { whatIBuild } from "../data/portfolio";
import { fadeUp, stagger, viewportOnce } from "../helpers/motion";
import "../assets/styles/Expertise.scss";

function Expertise({ mode }: { mode: string }) {
  return (
    <section className={`site-section expertise-section ${mode}`} id="expertise">
      <div className="site-wrap">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger}>
          <motion.p className="section-kicker" variants={fadeUp}>
            What I build
          </motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>
            Production software, not demos.
          </motion.h2>
          <div className="build-list">
            {whatIBuild.map((item) => (
              <motion.article key={item.index} className="build-row" variants={fadeUp}>
                <span className="build-index">{item.index}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Expertise;

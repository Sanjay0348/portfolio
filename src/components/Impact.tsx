import { motion } from "framer-motion";
import { impactStats } from "../data/portfolio";
import { fadeUp, stagger, viewportOnce } from "../helpers/motion";
import "../assets/styles/Impact.scss";

function Impact() {
  return (
    <section className="site-section impact-section" id="impact">
      <div className="site-wrap">
        <motion.p
          className="section-kicker"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          REAL SYSTEMS. REAL-WORLD IMPACT.
        </motion.p>
        <motion.div
          className="impact-grid"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
        >
          {impactStats.map((stat) => (
            <motion.div
              key={stat.label}
              className="impact-item"
              variants={fadeUp}
            >
              <span className="impact-metric">{stat.metric}</span>
              <span className="impact-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Impact;

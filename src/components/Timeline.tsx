import { motion } from "framer-motion";
import { timelineData } from "../data/portfolio";
import { fadeUp, stagger, viewportOnce } from "../helpers/motion";
import "../assets/styles/Timeline.scss";

function Timeline({ mode }: { mode: string }) {
  const work = timelineData.filter((entry) => !entry.title.startsWith("B.Tech"));
  const education = timelineData.find((entry) => entry.title.startsWith("B.Tech"));

  return (
    <section className={`site-section timeline-section ${mode}`} id="experience">
      <div className="site-wrap">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger}>
          <motion.p className="section-kicker" variants={fadeUp}>
            Experience
          </motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>
            Roles with measurable impact.
          </motion.h2>
        </motion.div>

        <div className="experience-list">
          {work.map((entry) => (
            <motion.article
              key={entry.title}
              className="experience-row"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
            >
              <div className="experience-meta">
                <p className="experience-date">{entry.date}</p>
                <p className="experience-place">{entry.subtitle}</p>
              </div>
              <div className="experience-body">
                <h3>{entry.title}</h3>
                <ul>
                  {entry.highlights.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        {education && (
          <p className="education-note">
            {education.title} · {education.subtitle} · {education.description}
          </p>
        )}
      </div>
    </section>
  );
}

export default Timeline;

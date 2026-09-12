import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectRecord, projects } from "../data/portfolio";
import { fadeUp, viewportOnce } from "../helpers/motion";
import "../assets/styles/Project.scss";

function CodeReviewDemo({ project }: { project: ProjectRecord }) {
  const demo = project.demo!;
  const [phase, setPhase] = useState<"idle" | "analyzing" | "done">("idle");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("done");
      return;
    }
    setPhase("analyzing");
    const timer = window.setTimeout(() => setPhase("done"), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="review-panel">
      <div className="review-head">
        <span>AI Code Review Agent</span>
        <span className="review-status">{phase === "done" ? "READY" : "ANALYZING"}</span>
      </div>
      <div className="review-pr">
        <span>{demo.pr}</span>
        <span>diff · pre-merge</span>
      </div>
      <ul className="review-checks">
        {demo.checks.map((check, index) => (
          <li key={check.label} className={phase === "done" || index === 0 ? "visible" : "pending"}>
            <span>{check.status === "ok" ? "✓" : "⚠"}</span>
            {check.label}
          </li>
        ))}
      </ul>
      <button type="button" className="review-btn" onClick={() => setOpen((value) => !value)} disabled={phase !== "done"}>
        {open ? "Hide AI Analysis" : "View AI Analysis"}
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            className="review-analysis"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {demo.analysis.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function Architecture({ value }: { value: string }) {
  const nodes = value.split("→").map((part) => part.trim()).filter(Boolean);
  return (
    <div className="arch-row">
      {nodes.map((node, index) => (
        <motion.span
          key={node}
          className="arch-node"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: index * 0.06 }}
        >
          {node}
          {index < nodes.length - 1 && <span className="arch-line" />}
        </motion.span>
      ))}
    </div>
  );
}

function Project({ mode = "dark" }) {
  const [openId, setOpenId] = useState<number | null>(projects[0]?.id ?? null);

  return (
    <section className={`site-section projects-section ${mode}`} id="projects">
      <div className="site-wrap">
        <motion.p className="section-kicker" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
          Featured work
        </motion.p>
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
          Case studies from production.
        </motion.h2>

        <div className="project-list">
          {projects.map((project, index) => {
            const open = openId === project.id;
            return (
              <article
                key={project.id}
                id={`project-${project.id}`}
                className={`project-item ${project.flagship ? "" : "quiet"}`}
              >
                <button
                  type="button"
                  className="project-summary"
                  onClick={() => setOpenId(open ? null : project.id)}
                  aria-expanded={open}
                >
                  <span className="project-index">Project {String(index + 1).padStart(2, "0")}</span>
                  <span className="project-name">{project.title}</span>
                  <span className="project-lede">{project.description}</span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      className="project-case"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {project.demo && <CodeReviewDemo project={project} />}
                      <div className="case-grid">
                        <div>
                          <h4>Problem</h4>
                          <p>{project.problem}</p>
                        </div>
                        <div>
                          <h4>What I built</h4>
                          <p>{project.built}</p>
                        </div>
                      </div>
                      <h4>Architecture</h4>
                      <Architecture value={project.architecture} />
                      <h4>AI workflow</h4>
                      <ol className="workflow">
                        {project.workflow.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                      <div className="case-impact">
                        {project.impact.map((item) => (
                          <div key={item.label}>
                            <strong>{item.metric}</strong>
                            <span>{item.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="case-tech">
                        {project.techStack.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Project;

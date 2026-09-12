import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  Code2,
  Cpu,
  FileText,
  GitBranch,
  Layers,
  LockKeyhole,
  Play,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { ProjectRecord, projects } from "../data/portfolio";
import "../assets/styles/Project.scss";

function ProjectVisual({ kind }: { kind: string }) {
  if (kind === "subrogation")
    return (
      <div className="project-visual claims-visual" aria-hidden="true">
        <div className="preview-topline">
          <span>
            <Layers size={13} /> claims / orchestration
          </span>
          <span className="preview-badge">WORKFLOW PREVIEW</span>
        </div>
        <div className="claims-flow">
          <div className="mini-doc">
            <FileText size={25} />
            <i />
            <i />
            <i />
            <span>claim.pdf</span>
          </div>
          <div className="flow-link" />
          <div className="mini-brain">
            <Cpu size={28} />
            <span>AI pipeline</span>
          </div>
          <div className="flow-link" />
          <div className="mini-result">
            <CheckCheck size={20} />
            <span>Ready for review</span>
            <small>Grounded in evidence</small>
          </div>
        </div>
        <div className="preview-bottom">
          <span>
            <span className="status-dot" /> Ingest → Analyze → Review
          </span>
          <span>HUMAN IN THE LOOP</span>
        </div>
      </div>
    );
  if (kind === "codereview")
    return (
      <div className="project-visual code-visual" aria-hidden="true">
        <div className="preview-topline">
          <span>
            <GitBranch size={13} /> agent / review.ts
          </span>
          <span className="preview-badge">ILLUSTRATIVE DIFF</span>
        </div>
        <div className="code-preview">
          <div>
            <em>12</em>
            <span className="code-purple">
              async function
            </span> processClaim() {"{"}
          </div>
          <div className="diff-remove">
            <em>13</em>− await retry(process);
          </div>
          <div className="diff-add">
            <em>13</em>+ await retry(process, {"{"}
          </div>
          <div className="diff-add">
            <em>14</em>+ maxAttempts: 3, jitter: true
          </div>
          <div className="diff-add">
            <em>15</em>+ {"}"});
          </div>
          <div>
            <em>16</em>
            {"}"}
          </div>
        </div>
        <div className="agent-comment">
          <Sparkles size={13} />
          <span>Bounded retries. Safer recovery.</span>
          <span>agent suggestion</span>
        </div>
      </div>
    );
  if (kind === "elearning")
    return (
      <div className="project-visual learning-visual" aria-hidden="true">
        <div className="preview-topline">
          <span>
            <Play size={13} /> learning / generation
          </span>
          <span className="preview-badge">PIPELINE PREVIEW</span>
        </div>
        <div className="learning-preview">
          <div className="lesson-card">
            <span>INPUT / KNOWLEDGE</span>
            <FileText size={23} />
            <i />
            <i />
            <small>Your course material</small>
          </div>
          <div className="learning-arrow">
            <Sparkles size={20} />
            <ArrowRight size={18} />
          </div>
          <div className="video-card">
            <div className="video-orbit" />
            <Play size={21} fill="currentColor" />
            <span>From text to understanding.</span>
            <div className="video-timeline">
              <i />
            </div>
          </div>
        </div>
        <div className="preview-bottom">
          <span>GENERATE · NARRATE · ASSESS</span>
          <span>RAG + LANGGRAPH</span>
        </div>
      </div>
    );
  return (
    <div className="project-visual platform-visual" aria-hidden="true">
      <div className="preview-topline">
        <span>
          <LockKeyhole size={13} /> platform / operations
        </span>
        <span className="preview-badge">CAPABILITY PREVIEW</span>
      </div>
      <div className="platform-preview">
        <div className="platform-sidebar">
          <Layers size={19} />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="platform-content">
          <div className="platform-widgets">
            <div>
              <ShieldCheck size={16} />
              <span>Role-based access</span>
            </div>
            <div>
              <GitBranch size={16} />
              <span>Approval workflows</span>
            </div>
          </div>
          <div className="bar-chart">
            {[35, 58, 44, 76, 62, 86, 74, 95, 81, 100].map((height, i) => (
              <i key={i} style={{ height: `${height}%` }} />
            ))}
          </div>
          <span className="chart-label">OPERATIONAL VISIBILITY</span>
        </div>
      </div>
    </div>
  );
}

function CaseStudy({
  project,
  close,
}: {
  project: ProjectRecord;
  close: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [analysis, setAnalysis] = useState(false);
  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      previousFocus?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="case-dialog"
      aria-labelledby="case-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            close();
        }
      }}
    >
      <div className="case-dialog-top">
        <span className="section-kicker">CASE STUDY / 0{project.id}</span>
        <button
          autoFocus
          className="close-case"
          onClick={close}
          aria-label="Close case study"
        >
          <X size={20} />
        </button>
      </div>
      <div className="case-dialog-body">
        <div className="case-meta">
          {project.category.join(" / ")} <span>{project.year}</span>
        </div>
        <h2 id="case-title">{project.title}</h2>
        <p className="case-intro">{project.description}</p>
        <ProjectVisual kind={project.imageKey} />
        <div className="case-grid">
          <div>
            <h3>01 / The problem</h3>
            <p>{project.problem}</p>
          </div>
          <div>
            <h3>02 / What I built</h3>
            <p>{project.built}</p>
          </div>
        </div>
        <h3>03 / Under the hood</h3>
        <div className="architecture-flow">
          {project.architecture.split("→").map((node, i) => (
            <span key={node}>
              {i > 0 && <ArrowRight size={13} />}
              <b>{node.trim()}</b>
            </span>
          ))}
        </div>
        <ol className="case-workflow">
          {project.workflow.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <h3>04 / The impact</h3>
        <div className="case-impact">
          {project.impact.map((item) => (
            <div key={item.label}>
              <strong>{item.metric}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        {project.demo && (
          <div className="review-example">
            <button
              onClick={() => setAnalysis((value) => !value)}
              aria-expanded={analysis}
              aria-controls="sample-analysis"
            >
              <Code2 size={16} />
              {analysis ? "Hide" : "Explore"} a sample review
              <ArrowUpRight size={16} />
            </button>
            <p>Illustrative analysis from a sample pull request.</p>
            {analysis && (
              <ul id="sample-analysis">
                {project.demo.analysis.map((item) => (
                  <li key={item}>
                    <Check size={15} />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <div className="case-tech">
          {project.techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="case-footer">
          <span>Built in a professional context. Source code is private.</span>
          <a href="#contact" onClick={close}>
            Let's talk architecture <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </dialog>
  );
}

const filters = ["All work", "AI systems", "Full stack"];
export default function Project({ mode = "dark" }) {
  const [filter, setFilter] = useState("All work");
  const [selected, setSelected] = useState<ProjectRecord | null>(null);
  const visible = projects.filter(
    (project) =>
      filter === "All work" ||
      (filter === "AI systems"
        ? project.flagship
        : project.imageKey === "epms"),
  );
  return (
    <section className={`site-section projects-section ${mode}`} id="projects">
      <div className="site-wrap">
        <div className="section-heading">
          <div>
            <p className="section-kicker">01 / SELECTED WORK</p>
            <h2 className="section-title">
              Built it. Shipped it.
              <br />
              <span className="muted-heading">Made it matter.</span>
            </h2>
          </div>
          <p className="section-description">
            Real problems. Thoughtful architecture. Measurable outcomes. Here's
            what happens when AI meets production engineering.
          </p>
        </div>
        <div className="project-filters" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
              className={filter === item ? "active" : ""}
            >
              {item}
              <span>
                {item === "All work"
                  ? "04"
                  : item === "AI systems"
                    ? "03"
                    : "01"}
              </span>
            </button>
          ))}
          <span className="project-hint">
            A FEW THINGS I'VE PUT INTO THE WORLD ↙
          </span>
        </div>
        <div className="project-grid">
          {visible.map((project) => (
            <motion.article
              key={project.id}
              id={`project-${project.id}`}
              className={`project-card project-${project.imageKey}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4 }}
            >
              <button
                className="project-open"
                onClick={() => setSelected(project)}
                aria-label={`Read case study: ${project.title}`}
              >
                <ProjectVisual kind={project.imageKey} />
                <div className="project-card-body">
                  <div className="project-meta">
                    <span>
                      0{project.id} / {project.category.slice(0, 2).join(" + ")}
                    </span>
                    <span>{project.year}</span>
                  </div>
                  <h3>
                    {project.title}
                    <span className="project-arrow">
                      <ArrowUpRight size={21} />
                    </span>
                  </h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <div className="project-card-bottom">
                    <span>
                      <strong>{project.impact[0].metric}</strong>{" "}
                      {project.impact[0].label}
                    </span>
                    <span className="case-link">
                      View case study <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              </button>
            </motion.article>
          ))}
        </div>
        <p className="project-footnote">
          A selection of systems built across Perfecter AI and Sify
          Technologies.
        </p>
        {selected && (
          <CaseStudy project={selected} close={() => setSelected(null)} />
        )}
      </div>
    </section>
  );
}

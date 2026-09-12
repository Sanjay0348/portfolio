import { useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  Box,
  Check,
  Cpu,
  Database,
  FileCode2,
  FileText,
  GitBranch,
  Layers,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const systems = [
  {
    name: "Claims AI",
    file: "claims_pipeline.py",
    input: "Claim documents",
    engine: "LangGraph agent",
    context: "RAG + PostgreSQL",
    output: "Operator review",
    steps: [
      "Documents ingested · OCR text extracted",
      "Context retrieved · claim evidence grounded",
      "Liability analysis drafted · review required",
      "Queued for operator review · trace complete",
    ],
  },
  {
    name: "Code agent",
    file: "review_agent.py",
    input: "Pull request",
    engine: "Review agent",
    context: "Repository context",
    output: "Suggested patch",
    steps: [
      "Pull request received · AST diff parsed",
      "Repository context retrieved",
      "Findings triaged · patch generated",
      "Patch prepared for human review · trace complete",
    ],
  },
  {
    name: "Cloud systems",
    file: "workflow.ts",
    input: "API request",
    engine: "Event orchestration",
    context: "Queue + cache",
    output: "Worker response",
    steps: [
      "Request authenticated · RBAC checked",
      "Event queued · worker assigned",
      "Task processed · state persisted",
      "Response returned · trace complete",
    ],
  },
];
export default function SystemExplorer() {
  const [selected, setSelected] = useState(0);
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [activeNode, setActiveNode] = useState("engine");
  const system = systems[selected];
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(
      () => {
        if (step >= 3) setRunning(false);
        else setStep((value) => value + 1);
      },
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 40 : 700,
    );
    return () => window.clearTimeout(timer);
  }, [running, step]);
  const descriptions: Record<string, string> = {
    input: "Structured inputs. Validated before the work begins.",
    engine: "Orchestrated workflows with explicit state and recovery.",
    context: "Grounded context and durable state for each step.",
    output: "Useful outputs with a human in the loop.",
  };
  return (
    <div className={`system-explorer ${running ? "is-running" : ""}`}>
      <div className="explorer-chrome">
        <div className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span>the_engineering_playground</span>
        <Box size={13} />
      </div>
      <div className="explorer-tabs" aria-label="Explore a system">
        {systems.map((item, index) => (
          <button
            key={item.name}
            type="button"
            aria-pressed={selected === index}
            className={selected === index ? "active" : ""}
            onClick={() => {
              setSelected(index);
              setStep(-1);
              setRunning(false);
            }}
          >
            <span>0{index + 1}</span>
            {item.name}
          </button>
        ))}
      </div>
      <div className="explorer-toolbar">
        <span>
          <FileCode2 size={13} />
          {system.file}
        </span>
        <span className="simulation-label">INTERACTIVE SIMULATION</span>
      </div>
      <div className="system-canvas">
        <div className="canvas-label">
          <GitBranch size={12} /> WORKFLOW ARCHITECTURE
        </div>
        <svg
          className="system-wires"
          viewBox="0 0 460 275"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M100 84 H222 V137 M360 84 H242 V137 M232 177 V222 M100 104 V222 H175 M360 104 V222 H290" />
          <path
            className="wire-pulse"
            d="M100 84 H222 V137 M360 84 H242 V137 M232 177 V222"
          />
        </svg>
        <button
          className={`system-node input-node ${activeNode === "input" ? "selected" : ""}`}
          onClick={() => setActiveNode("input")}
          aria-pressed={activeNode === "input"}
        >
          <FileText size={17} />
          <span>{system.input}</span>
          <small>01 / INGEST</small>
        </button>
        <button
          className={`system-node context-node ${activeNode === "context" ? "selected" : ""}`}
          onClick={() => setActiveNode("context")}
          aria-pressed={activeNode === "context"}
        >
          <Database size={17} />
          <span>{system.context}</span>
          <small>02 / GROUND</small>
        </button>
        <button
          className={`system-node engine-node ${activeNode === "engine" ? "selected" : ""}`}
          onClick={() => setActiveNode("engine")}
          aria-pressed={activeNode === "engine"}
        >
          <div className="engine-icon">
            <Cpu size={24} />
          </div>
          <span>{system.engine}</span>
          <small>
            <Sparkles size={10} /> 03 / REASON + ACT
          </small>
        </button>
        <button
          className={`system-node output-node ${activeNode === "output" ? "selected" : ""}`}
          onClick={() => setActiveNode("output")}
          aria-pressed={activeNode === "output"}
        >
          <ShieldCheck size={16} />
          <span>{system.output}</span>
          <ArrowRight size={14} />
        </button>
        <span className="canvas-coordinate">x: AI / y: PRODUCTION</span>
        <Layers className="canvas-layer-icon" size={16} />
      </div>
      <div className="node-description" aria-live="polite">
        <span className="status-dot" />
        {descriptions[activeNode]}
      </div>
      <div className="explorer-console">
        <div className="console-title">
          <span>
            <Activity size={13} /> EXECUTION TRACE
          </span>
          <span>
            {running
              ? "RUNNING"
              : step === 3
                ? "COMPLETE"
                : "READY WHEN YOU ARE"}
          </span>
        </div>
        <div className="trace-output" role="status" aria-live="polite">
          {step < 0 ? (
            <>
              <span className="console-prompt">❯</span> Run a sample through the
              system.
              <span className="terminal-caret" />
            </>
          ) : (
            <>
              <Check size={13} />
              <span>{system.steps[step]}</span>
              <small>0{step + 1}/04</small>
            </>
          )}
        </div>
        <button
          className="run-button"
          onClick={() => {
            setStep(-1);
            setRunning(true);
          }}
          disabled={running}
        >
          {step === 3 ? (
            <RotateCcw size={13} />
          ) : (
            <Play size={13} fill="currentColor" />
          )}
          {running
            ? "Running workflow…"
            : step === 3
              ? "Replay workflow"
              : "Run workflow"}
          <span>↵</span>
        </button>
      </div>
    </div>
  );
}

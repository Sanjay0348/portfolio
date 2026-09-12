import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { dnaLayers, profile, projects } from "../data/portfolio";
import "../assets/styles/CommandTerminal.scss";

type Line = { kind: "system" | "input" | "output"; text: string };

const COMMANDS = [
  "sanjay --help",
  "sanjay --about",
  "sanjay --projects",
  "sanjay --skills",
  "sanjay --impact",
  "clear",
];

const BOOT = [
  "SYSTEM READY",
  "sanjay@portfolio — type a command or tap one below.",
];

function CommandTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [booted, setBooted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const flagship = useMemo(
    () => projects.filter((project) => project.flagship),
    []
  );

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setLines(BOOT.map((text) => ({ kind: "system", text })));
      setBooted(true);
      return;
    }

    let index = 0;
    const timers: number[] = [];
    const tick = () => {
      if (index >= BOOT.length) {
        setBooted(true);
        return;
      }
      const text = BOOT[index];
      index += 1;
      setLines((prev) => [...prev, { kind: "system", text }]);
      timers.push(window.setTimeout(tick, 420));
    };
    timers.push(window.setTimeout(tick, 280));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [lines]);

  const respond = (command: string): string[] => {
    const raw = command.trim().toLowerCase();
    if (!raw) return [];
    if (raw === "clear") return ["__CLEAR__"];
    if (raw === "help" || raw === "sanjay --help" || raw === "sanjay") {
      return [
        "available commands",
        "  sanjay --about",
        "  sanjay --projects",
        "  sanjay --skills",
        "  sanjay --impact",
        "  open <n>     jump to a project",
        "  clear",
      ];
    }
    if (raw === "sanjay --about") {
      return [profile.about, `${profile.yearsExperience} years · ${profile.location} · ${profile.certification}`];
    }
    if (raw === "sanjay --projects") {
      return [
        ...flagship.map((project, index) => `  ${index + 1}. ${project.title}`),
        "type `open 1` to jump to a case study",
      ];
    }
    if (raw === "sanjay --skills") {
      return dnaLayers.map(
        (layer) => `${layer.title.padEnd(11)} ${layer.nodes.map((node) => node.name).join(" · ")}`
      );
    }
    if (raw === "sanjay --impact") {
      return profile.achievements.map((item) => `${item.metric.padEnd(8)} ${item.label}`);
    }
    const openMatch = raw.match(/^open\s+(\d+)$/);
    if (openMatch) {
      const index = Number(openMatch[1]) - 1;
      const project = flagship[index];
      if (!project) return ["no project at that index"];
      document.getElementById(`project-${project.id}`)?.scrollIntoView({ behavior: "smooth" });
      return [`opening ${project.title}`];
    }
    return [`command not found: ${command}`, "try `sanjay --help`"];
  };

  const run = (command: string) => {
    const output = respond(command);
    if (output[0] === "__CLEAR__") {
      setLines([]);
      return;
    }
    setLines((prev) => [
      ...prev,
      { kind: "input", text: command },
      ...output.map((text) => ({ kind: "output" as const, text })),
    ]);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!value.trim()) return;
    run(value);
    setValue("");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Tab") return;
    event.preventDefault();
    const match = COMMANDS.find((command) => command.startsWith(value.trim()) && command !== value.trim());
    if (match) setValue(match);
  };

  return (
    <div
      className="cli"
      onClick={() => inputRef.current?.focus()}
      role="region"
      aria-label="Interactive terminal"
    >
      <div className="cli-bar">
        <span className="cli-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="cli-title">sanjay — zsh</span>
      </div>
      <div className="cli-log" ref={logRef}>
        {lines.map((line, index) => (
          <pre key={`${line.text}-${index}`} className={`cli-line ${line.kind}`}>
            {line.kind === "input" ? `$ ${line.text}` : line.text}
          </pre>
        ))}
        {booted && (
          <form className="cli-prompt" onSubmit={onSubmit}>
            <span aria-hidden>$</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Terminal command"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        )}
      </div>
      <div className="cli-hints">
        {["--about", "--projects", "--skills", "--impact"].map((flag) => (
          <button key={flag} type="button" onClick={() => run(`sanjay ${flag}`)}>
            sanjay {flag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CommandTerminal;

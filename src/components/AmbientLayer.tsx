import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function AmbientLayer({ mode }: { mode: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glowX = useSpring(x, { stiffness: 50, damping: 22 });
  const glowY = useSpring(y, { stiffness: 50, damping: 22 });
  const frame = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const onMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        x.set(event.clientX);
        y.set(event.clientY);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame.current);
    };
  }, [x, y]);

  return (
    <>
      <div className={`ambient-layer ${mode === "dark" ? "dark" : "light"}`} aria-hidden>
        <div className="ambient-grid" />
      </div>
      <motion.div className="cursor-glow" aria-hidden style={{ x: glowX, y: glowY }} />
    </>
  );
}

export default AmbientLayer;

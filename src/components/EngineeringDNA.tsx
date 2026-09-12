import { useState } from "react";
import { motion } from "framer-motion";
import { dnaLayers } from "../data/portfolio";
import { fadeUp, stagger, viewportOnce } from "../helpers/motion";
import "../assets/styles/EngineeringDNA.scss";

function EngineeringDNA() {
  const [active, setActive] = useState("LLMs");
  const [proof, setProof] = useState(dnaLayers[0].nodes[0].proof);

  return (
    <section className="site-section dna-section" id="stack">
      <div className="site-wrap">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger}>
          <motion.p className="section-kicker" variants={fadeUp}>
            Engineering DNA
          </motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>
            How the stack is actually layered.
          </motion.h2>
        </motion.div>

        <div className="dna-stack">
          {dnaLayers.map((layer, index) => (
            <motion.div
              key={layer.key}
              className="dna-layer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="dna-label">{layer.title}</div>
              <div className="dna-nodes">
                {layer.nodes.map((node) => (
                  <button
                    key={node.name}
                    type="button"
                    className={active === node.name ? "on" : ""}
                    onMouseEnter={() => {
                      setActive(node.name);
                      setProof(node.proof);
                    }}
                    onFocus={() => {
                      setActive(node.name);
                      setProof(node.proof);
                    }}
                  >
                    {node.name}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <p className="dna-proof">{proof}</p>
      </div>
    </section>
  );
}

export default EngineeringDNA;

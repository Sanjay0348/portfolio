import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Github, Linkedin } from "lucide-react";
import { profile } from "../data/portfolio";
import "../assets/styles/Contact.scss";
export default function Contact({ mode }: { mode: string }) {
  const [copyState, setCopyState] = useState("Copy email");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("Email copied!");
    } catch {
      setCopyState("Select the email below to copy");
    }
  };
  return (
    <section className={`site-section contact-section ${mode}`} id="contact">
      <div className="site-wrap">
        <motion.div
          className="contact-panel"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="contact-topline">
            <p className="section-kicker">04 / WHAT'S NEXT?</p>
            <span>GOOD THINGS START WITH A CONVERSATION.</span>
          </div>
          <div className="contact-main">
            <div>
              <h2>
                Have a wild idea?
                <br />
                Let's <span>build it.</span>
              </h2>
              <p>
                AI systems, ambitious products, or a really good engineering
                <br className="desktop-break" /> challenge. I'd love to hear
                what you're thinking.
              </p>
            </div>
            <a
              className="contact-big-arrow"
              href={`mailto:${profile.email}`}
              aria-label="Email Sanjay"
            >
              <ArrowUpRight strokeWidth={1} />
            </a>
          </div>
          <div className="contact-bottom">
            <div className="email-group">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button onClick={copy} aria-label={copyState}>
                {copyState === "Email copied!" ? (
                  <Check size={16} />
                ) : (
                  <Copy size={16} />
                )}
              </button>
              <span role="status" className="copy-status">
                {copyState !== "Copy email" && copyState}
              </span>
            </div>
            <div className="contact-socials">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={14} /> LinkedIn <ArrowUpRight size={13} />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Github size={14} /> GitHub <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
          <span className="contact-decor" aria-hidden="true">
            ✳
          </span>
        </motion.div>
      </div>
    </section>
  );
}

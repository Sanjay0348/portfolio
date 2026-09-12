import { ArrowUp, Code2 } from "lucide-react";
import "../assets/styles/Footer.scss";
export default function Footer({ mode = "dark" }) {
  return (
    <footer className={`footer ${mode}`}>
      <div className="site-wrap footer-inner">
        <a href="#home" className="footer-brand">
          <Code2 size={16} /> sanjay<span>.</span>
        </a>
        <p>
          Thoughtfully engineered. Always evolving.{" "}
          <span>© {new Date().getFullYear()} Sanjay V</span>
        </p>
        <a className="back-top" href="#home">
          BACK TO TOP <ArrowUp size={13} />
        </a>
      </div>
    </footer>
  );
}

import React from "react";
import "../assets/styles/Resume.scss";
import { profile } from "../data/portfolio";

interface ResumeSectionProps {
  mode: string;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ mode }) => {
  return (
    <div className={`resume-section ${mode}`}>
      <h2>Resume</h2>
      <div className="resume-container">
        <a
          href={profile.resumePath}
          download={profile.resumeFileName}
          className="download-button"
        >
          Download Resume
        </a>
      </div>
    </div>
  );
};

export default ResumeSection;

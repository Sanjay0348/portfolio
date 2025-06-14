import React from 'react';
import '../assets/styles/Resume.scss';

interface ResumeSectionProps {
  mode: string;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ mode }) => {
  return (
    <div className={`resume-section ${mode}`}>
      <h2>Resume</h2>
      <div className="resume-container">
        <embed
          src="/Sanjay_Venkat.pdf"
          type="application/pdf"
          className="resume-preview"
        />
        <a
          href="/Sanjay_Venkat"
          download="Sanjay_Venkat"
          className="download-button"
        >
          Download Resume
        </a>
      </div>
    </div>
  );
};

export default ResumeSection;
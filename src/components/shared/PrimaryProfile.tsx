import React from 'react';

const { SocialIcon } = require('react-social-icons');

interface PrimaryProfileProps {
  name: string;
  about: string;
  photoSrc: string;
  resumePath: string;
}

const PrimaryProfile: React.FC<PrimaryProfileProps> = ({
  name,
  about,
  photoSrc,
  resumePath,
}) => {
  const socialLinks = [
    { url: 'mailto:apoorvarajan1997@gmail.com', label: 'Email' },
    { url: 'https://www.linkedin.com/in/apoorva-rajan/', label: 'LinkedIn' },
    { url: 'https://github.com/apoorvarajan', label: 'GitHub' },
  ];

  return (
    <div className="primary-wrap">
      <div className="forborder">
        <div className="primary-details">
          <div className="name-contact">
            <h1 className="name">Hey there, I&apos;m {name} Rajan</h1>
            <div className="contact">
              {socialLinks.map((link, idx) => (
                <div key={`${link.label}-${idx}`} className="resume_download">
                  <SocialIcon url={link.url} />
                  <span className="tooltiptext">{link.label}</span>
                </div>
              ))}
              <div
                onClick={() => (window.location.href = resumePath)}
                data-analytics-destination={resumePath}
                className="resume_download"
                style={{ cursor: 'pointer' }}
              >
                <img alt="resume-icon" src="./resume_icon.svg" width="50em" />
                <span className="tooltiptext">Resume</span>
              </div>
            </div>
            <p className="about-me">{about}</p>
          </div>
          <div className="photo-wrap">
            <img alt="headshot" className="photo" height="250em" src={photoSrc} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryProfile;


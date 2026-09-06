import React from 'react';

const { SocialIcon } = require('react-social-icons');

interface SocialLink {
  url: string;
  label: string;
  isCustom?: boolean;
  icon?: string;
}

interface SocialContactProps {
  links: SocialLink[];
  className?: string;
}

const SocialContact: React.FC<SocialContactProps> = ({ links, className = '' }) => {
  return (
    <div className={className}>
      {links.map((link, idx) => (
        <div key={`${link.label}-${idx}`} className="resume_download">
          {link.isCustom ? (
            <img alt={link.label} src={link.icon} width="50em" />
          ) : (
            <SocialIcon url={link.url} />
          )}
          <span className="tooltiptext">{link.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SocialContact;

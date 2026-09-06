import React from 'react';
import { MdOpenInNew } from 'react-icons/md';

interface TimelineItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  time?: string;
  link?: string;
  description: string[];
  isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  icon,
  title,
  subtitle,
  time,
  link,
  description,
  isLast,
}) => {
  return (
    <div className="wrap-exp">
      <div>
        <div className="exp-icon-wrap">{icon}</div>
        {!isLast && <div className="vertical-line"></div>}
      </div>
      <div className="ach-div">
        <div className="role">
          {link ? (
            <a target="_blank" rel="noreferrer" className="anchor_cd" href={link}>
              {title}
              <MdOpenInNew />
            </a>
          ) : (
            title
          )}
          {time && (
            <span style={{ float: 'right', color: 'darkblue', fontWeight: 'normal' }}>
              {time}
            </span>
          )}
        </div>
        {subtitle && <div className="company-name">{subtitle}</div>}
        <div style={{ minHeight: '2em' }}>
          <ul className="expand-sec">
            {description.map((item: string, idx: number) => (
              <li key={`${item}-${idx}`}>
                <div className="role-desc">{item}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;

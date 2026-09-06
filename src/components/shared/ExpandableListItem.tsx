import React, { useState } from 'react';

interface ExpandableListItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  time?: string;
  imageUrl?: string;
  buttonText?: string;
  isLast: boolean;
}

const ExpandableListItem: React.FC<ExpandableListItemProps> = ({
  icon,
  title,
  subtitle,
  time,
  imageUrl,
  buttonText = 'VIEW CERTIFICATE',
  isLast,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div>
        <div className="exp-icon-wrap">{icon}</div>
        {!isLast && <div className="vertical-line"></div>}
      </div>
      <div className="ach-div">
        <div className="role">
          {title}
          <span style={{ float: 'right', color: 'black', fontWeight: 'normal' }}>
            {subtitle || time}
          </span>
        </div>
        {imageUrl && (
          <>
            <div className="view-button" onClick={handleToggle}>
              {buttonText}
            </div>
            {isExpanded && <img alt="certificate" src={imageUrl} width="500em" />}
          </>
        )}
      </div>
    </div>
  );
};

export default ExpandableListItem;

import React from 'react';

interface ListSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ListSection: React.FC<ListSectionProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`subsec ${className}`}>
      <div className="head">
        {title}
        <div className="line" />
      </div>
      {children}
    </div>
  );
};

export default ListSection;

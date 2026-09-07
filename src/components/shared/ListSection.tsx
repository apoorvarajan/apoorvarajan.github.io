import React from 'react';

interface ListSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ListSection: React.FC<ListSectionProps> = ({ title, children, className = '' }) => {
  return (
    <section className={`subsec ${className}`}>
      <h2 className="head">
        {title}
        <span className="line" />
      </h2>
      {children}
    </section>
  );
};

export default ListSection;

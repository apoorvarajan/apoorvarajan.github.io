import React from 'react';

interface NavItem {
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

interface TabNavigationProps {
  items: NavItem[];
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ items, className = '' }) => {
  return (
    <div className={`header ${className}`}>
      {items.map((item, idx) => (
        <div
          key={`${item.label}-${idx}`}
          onClick={item.onClick}
          style={{
            cursor: 'pointer',
            ...(item.isActive && { fontWeight: 'bold' }),
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default TabNavigation;

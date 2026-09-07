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
        <button
          type="button"
          className="nav-item"
          key={`${item.label}-${idx}`}
          onClick={item.onClick}
          aria-current={item.isActive ? 'page' : undefined}
          style={{
            cursor: 'pointer',
            ...(item.isActive && { fontWeight: 'bold' }),
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;

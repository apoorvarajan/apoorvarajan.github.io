/**
 * Icon mapping utility for different sections
 */
export const getIconForSection = (section: string) => {
  const iconMap: { [key: string]: any } = {};
  return iconMap[section] || null;
};

/**
 * Toggle element visibility by ID
 */
export const toggleElementVisibility = (elementId: string): boolean => {
  const elem = document.getElementById(elementId);
  if (elem) {
    const isHidden = elem.style.display === 'none' || elem.style.display === '';
    elem.style.display = isHidden ? 'block' : 'none';
    return !isHidden;
  }
  return false;
};

/**
 * Generate unique key for list items
 */
export const generateKey = (prefix: string, index: number, value?: string): string => {
  return `${prefix}-${value || index}-${index}`;
};

/**
 * Format content for timeline display
 */
export const formatTimelineItem = (item: any) => {
  return {
    title: item.role,
    subtitle: item.company,
    time: item.time,
    description: item.desc || [],
    link: item.link,
  };
};

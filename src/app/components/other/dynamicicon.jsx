import React from 'react';
import { Circle, icons } from 'lucide-react';

const DynamicIcon = ({ name, className }) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    return <Circle className={className} />;
  }

  return <IconComponent className={className} />;
};

export default DynamicIcon;

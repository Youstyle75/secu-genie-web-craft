
import React, { ReactNode } from 'react';

interface GN6FormSectionProps {
  children: ReactNode;
  isActive: boolean;
}

const GN6FormSection: React.FC<GN6FormSectionProps> = ({ 
  children, 
  isActive 
}) => {
  if (!isActive) return null;
  
  return (
    <div className="space-y-6">
      {children}
    </div>
  );
};

export default GN6FormSection;

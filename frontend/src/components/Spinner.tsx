// src/components/ui/Spinner.tsx
import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-14 w-14 border-4',
    xl: 'h-20 w-20 border-4',
  };

  return (
    <div
      className={`animate-spin rounded-full border-purple-500 border-t-transparent ${sizes[size]}`}
    />
  );
};
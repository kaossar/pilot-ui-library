import React from 'react';

// Utilitaire de concaténation de classes CSS (remplace clsx/cn)
const cn = (...classes) => classes.filter(Boolean).join(' ');

export const KpiGrid = ({ children, cols = 4, gap = 'md', className }) => {
  const gapClass = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6'
  }[gap];

  const colsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }[cols];

  return (
    <div className={cn('grid grid-cols-1 w-full', gapClass, colsClass, className)}>
      {children}
    </div>
  );
};

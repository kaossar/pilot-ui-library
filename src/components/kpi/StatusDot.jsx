import React from 'react';

// Utilitaire de concaténation de classes CSS (remplace clsx/cn)
const cn = (...classes) => classes.filter(Boolean).join(' ');

export const StatusDot = ({
  status,
  pulse = false,
  size = 'md',
  className
}) => {
  const config = {
    online: 'var(--status-nominal-text, #065F46)',
    warning: 'var(--status-warning-text, #92400E)',
    danger: 'var(--status-danger-text, #991B1B)',
    offline: 'var(--text-muted, #646761)'
  };

  const sizeClass = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3'
  }[size];

  const bgColor = config[status] || config.offline;

  return (
    <div className={cn('relative flex items-center justify-center', sizeClass, className)}>
      {pulse && status === 'online' && (
        <span 
          className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
          style={{ backgroundColor: bgColor }}
        />
      )}
      <span 
        className="relative inline-flex rounded-full w-full h-full"
        style={{ backgroundColor: bgColor }}
      />
    </div>
  );
};

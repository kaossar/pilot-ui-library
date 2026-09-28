import React from 'react';

// Utilitaire de concat�nation de classes CSS (remplace clsx/cn)
const cn = (...classes) => classes.filter(Boolean).join(' ');

export const AnnualProgressBar = ({
  dayOfYear,
  totalDays = 365,
  year,
  status,
  className
}) => {
  const validDay = Math.max(0, Math.min(dayOfYear, totalDays));
  const progress = (validDay / totalDays) * 100;

  const statusConfig = {
    OPEN: { color: 'var(--status-nominal-text, #065F46)', label: 'Ouvert' },
    SEALED: { color: 'var(--brand-primary, #4B5320)', label: 'Scellé' },
    ARCHIVED: { color: 'var(--text-muted, #646761)', label: 'Archivé' }
  };

  const currentStatus = statusConfig[status];

  return (
    <div className={cn('w-full flex flex-col gap-2', className)}>
      <div className="flex justify-between items-end text-sm">
        <div className="flex flex-col">
          <span 
            className="font-bold"
            style={{ color: 'var(--text-primary, #21262D)' }}
          >
            {year || 'Année en cours'}
          </span>
          <span 
            className="text-xs"
            style={{ color: 'var(--text-secondary, #4B5563)' }}
          >
            Jour {validDay} / {totalDays}
          </span>
        </div>
        {currentStatus && (
          <span 
            className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
            style={{ 
              color: currentStatus.color,
              borderColor: currentStatus.color,
              backgroundColor: 'var(--bg-surface, #FFFFFF)'
            }}
          >
            {currentStatus.label}
          </span>
        )}
      </div>

      <div 
        className="w-full h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--bg-highlight, #E8EAE0)' }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div 
          className="h-full transition-all duration-500 ease-out rounded-full"
          style={{ 
            width: `${progress}%`,
            backgroundColor: currentStatus ? currentStatus.color : 'var(--brand-primary, #4B5320)'
          }}
        />
      </div>
    </div>
  );
};

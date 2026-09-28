import React, { useEffect, useState } from 'react';

export const ComplianceScoreRing = ({
  score,
  size = 'md',
  label,
  showPercent = true,
  className
}) => {
  const [offset, setOffset] = useState(100);
  
  const sizeMap = {
    sm: 64,
    md: 96,
    lg: 128
  };
  
  const s = sizeMap[size];
  const strokeWidth = s * 0.1;
  const radius = (s - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    // Animation de la bordure
    const timeout = setTimeout(() => {
      const validScore = Math.max(0, Math.min(100, score));
      const progress = validScore / 100;
      setOffset(circumference - progress * circumference);
    }, 100);
    return () => clearTimeout(timeout);
  }, [score, circumference]);

  let color = 'var(--status-danger-text, #991B1B)'; // < 75
  if (score >= 90) color = 'var(--status-nominal-text, #065F46)';
  else if (score >= 75) color = 'var(--status-warning-text, #92400E)';

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className="relative" style={{ width: s, height: s }}>
        <svg
          width={s}
          height={s}
          className="transform -rotate-90"
          aria-label={`Score de conformité: ${score}%`}
        >
          {/* Cercle de fond */}
          <circle
            cx={s / 2}
            cy={s / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            style={{ stroke: 'var(--bg-highlight, #E8EAE0)' }}
          />
          {/* Arc de progression */}
          <circle
            cx={s / 2}
            cy={s / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            style={{
              stroke: color,
              strokeDasharray: circumference,
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 1s ease-in-out'
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className="font-bold font-mono"
            style={{ 
              color: 'var(--text-primary, #21262D)',
              fontSize: size === 'sm' ? '0.875rem' : size === 'lg' ? '1.5rem' : '1.125rem'
            }}
          >
            {score}{showPercent ? '%' : ''}
          </span>
        </div>
      </div>
      {label && (
        <span 
          className="text-sm font-medium text-center"
          style={{ color: 'var(--text-secondary, #4B5563)' }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

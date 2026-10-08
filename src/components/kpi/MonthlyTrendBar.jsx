import React from 'react';

// Utilitaire de concaténation de classes CSS (remplace clsx/cn)
const cn = (...classes) => classes.filter(Boolean).join(' ');

export const MonthlyTrendBar = ({
  data,
  height = 40,
  color,
  showMonthLabels = false,
  maxValue,
  className
}) => {
  const safeData = Array.isArray(data) ? data.slice(0, 12) : [];
  // Remplir avec des 0 si moins de 12 valeurs
  while (safeData.length < 12) safeData.push(0);

  const max = maxValue || Math.max(...safeData, 1);
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  const currentMonth = new Date().getMonth();

  const barColor = color || 'var(--brand-primary, #4B5320)';
  const mutedColor = 'var(--bg-highlight, #E8EAE0)';

  return (
    <div className={cn('flex flex-col gap-1 w-full', className)}>
      <div 
        className="flex items-end justify-between w-full" 
        style={{ height }}
        aria-label="Tendance mensuelle"
      >
        {safeData.map((val, idx) => {
          const barHeight = Math.max((val / max) * 100, 2); // 2% minimum
          const isCurrent = idx === currentMonth;
          return (
            <div
              key={idx}
              className="w-[6%] rounded-t-sm transition-all"
              style={{
                height: `${barHeight}%`,
                backgroundColor: isCurrent ? barColor : mutedColor,
                opacity: isCurrent ? 1 : 0.7
              }}
              title={`${months[idx]}: ${val}`}
            />
          );
        })}
      </div>
      {showMonthLabels && (
        <div className="flex justify-between w-full mt-1">
          {months.map((m, idx) => (
            <span
              key={idx}
              className="text-[10px] w-[6%] text-center font-medium"
              style={{
                color: idx === currentMonth ? 'var(--text-primary, #21262D)' : 'var(--text-muted, #646761)'
              }}
            >
              {m}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

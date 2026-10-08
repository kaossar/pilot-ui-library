import React from 'react';

// Utilitaire de concaténation de classes CSS (remplace clsx/cn)
const cn = (...classes) => classes.filter(Boolean).join(' ');
import { ArrowUp, ArrowDown, ArrowRight, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

export const KpiCard = ({
  value,
  label,
  target,
  trend,
  status,
  sublabel,
  compact = false,
  className
}) => {
  const statusConfig = {
    ok: { icon: CheckCircle, color: 'var(--status-nominal-text, #065F46)', bg: 'var(--status-nominal-bg, #ECFDF5)', border: 'var(--status-nominal-border, #A7F3D0)' },
    warning: { icon: AlertTriangle, color: 'var(--status-warning-text, #92400E)', bg: 'var(--status-warning-bg, #FFFBEB)', border: 'var(--status-warning-border, #FDE68A)' },
    danger: { icon: XCircle, color: 'var(--status-danger-text, #991B1B)', bg: 'var(--status-danger-bg, #FEF2F2)', border: 'var(--status-danger-border, #FECACA)' },
    neutral: { icon: Info, color: 'var(--status-info-text, #075985)', bg: 'var(--status-info-bg, #F0F9FF)', border: 'var(--status-info-border, #BAE6FD)' }
  };

  const trendConfig = {
    up: { icon: ArrowUp, color: 'var(--status-nominal-text, #065F46)' },
    down: { icon: ArrowDown, color: 'var(--status-danger-text, #991B1B)' },
    stable: { icon: ArrowRight, color: 'var(--text-muted, #646761)' }
  };

  const activeStatus = statusConfig[status];
  const activeTrend = trendConfig[trend];

  return (
    <div 
      className={cn(
        'bg-white rounded-xl border p-4 flex flex-col',
        compact ? 'gap-2' : 'gap-4',
        className
      )}
      style={{
        backgroundColor: 'var(--bg-surface, #FFFFFF)',
        borderColor: 'var(--bg-border, #DADCD7)'
      }}
    >
      <div className="flex justify-between items-start">
        <span 
          className="text-sm font-medium" 
          style={{ color: 'var(--text-secondary, #4B5563)' }}
        >
          {label}
        </span>
        {activeStatus && (
          <div 
            className="flex items-center justify-center p-1 rounded-full border"
            style={{
              color: activeStatus.color,
              backgroundColor: activeStatus.bg,
              borderColor: activeStatus.border
            }}
          >
            <activeStatus.icon size={16} />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span 
          className="text-2xl font-bold font-mono" 
          style={{ color: 'var(--text-primary, #21262D)' }}
        >
          {value}
        </span>
        {activeTrend && (
          <span 
            className="flex items-center text-sm font-semibold"
            style={{ color: activeTrend.color }}
          >
            <activeTrend.icon size={16} className="mr-0.5" />
          </span>
        )}
      </div>

      {(target || sublabel) && (
        <div 
          className="flex flex-wrap items-center gap-1.5 text-xs mt-auto pt-1"
          style={{ color: 'var(--text-muted, #646761)' }}
        >
          {target && (
            <span className="font-medium" style={{ color: 'var(--brand-primary, #4B5320)' }}>
              {target}
            </span>
          )}
          {target && sublabel && <span>â€¢</span>}
          {sublabel && <span>{sublabel}</span>}
        </div>
      )}
    </div>
  );
};

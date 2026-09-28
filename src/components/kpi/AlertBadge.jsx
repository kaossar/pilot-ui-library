import React from 'react';

// Utilitaire de concaténation de classes CSS (remplace clsx/cn)
const cn = (...classes) => classes.filter(Boolean).join(' ');
import { AlertCircle, AlertTriangle, ShieldAlert, FileWarning, Clock, Info } from 'lucide-react';

export const AlertBadge = ({
  type,
  message,
  severity,
  daysLeft,
  onClick,
  compact = false,
  className
}) => {
  const iconMap = {
    CNAPS_EXPIRY: ShieldAlert,
    UNFILLED_SHIFT: Clock,
    OPEN_ANOMALY: AlertTriangle,
    OVERDUE_INVOICE: FileWarning,
    MISSING_CLOSING: AlertCircle,
    CUSTOM: Info
  };

  const severityConfig = {
    info: { color: 'var(--status-info-text, #075985)', bg: 'var(--status-info-bg, #F0F9FF)', border: 'var(--status-info-border, #BAE6FD)' },
    warning: { color: 'var(--status-warning-text, #92400E)', bg: 'var(--status-warning-bg, #FFFBEB)', border: 'var(--status-warning-border, #FDE68A)' },
    danger: { color: 'var(--status-danger-text, #991B1B)', bg: 'var(--status-danger-bg, #FEF2F2)', border: 'var(--status-danger-border, #FECACA)' }
  };

  const Icon = iconMap[type] || Info;
  const config = severityConfig[severity];

  return (
    <div
      role={onClick ? 'button' : 'alert'}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 w-full border rounded-lg',
        compact ? 'p-2 min-h-[40px]' : 'p-3 min-h-[48px]',
        onClick && 'cursor-pointer active:scale-[0.98] transition-transform',
        className
      )}
      style={{
        backgroundColor: config.bg,
        borderColor: config.border,
        color: config.color
      }}
    >
      <Icon size={compact ? 18 : 20} className="shrink-0" />
      <span className={cn('font-medium flex-1', compact ? 'text-sm' : 'text-base')}>
        {message}
      </span>
      {daysLeft !== undefined && (
        <span 
          className={cn(
            'font-bold whitespace-nowrap',
            compact ? 'text-sm' : 'text-base'
          )}
        >
          J{daysLeft >= 0 ? `+${daysLeft}` : daysLeft}
        </span>
      )}
    </div>
  );
};

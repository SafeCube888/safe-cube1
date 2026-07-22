import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertTriangle, AlertOctagon, Info, Circle, ShieldCheck, Clock, CheckCheck, type LucideIcon } from 'lucide-react';

export type StatusType = 'new' | 'contacted' | 'in_progress' | 'closed' | 'success' | 'warning' | 'critical' | 'info';

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'observation' | 'good_practice';

const statusConfig: Record<StatusType, { label: string; text: string; bg: string; icon: LucideIcon }> = {
  new: { label: 'New', text: 'text-cube-blue', bg: 'bg-cube-blue/10', icon: Info },
  contacted: { label: 'Contacted', text: 'text-cube-navy', bg: 'bg-cube-navy/10', icon: Circle },
  in_progress: { label: 'In Progress', text: 'text-cube-amber', bg: 'bg-cube-amber/10', icon: Clock },
  closed: { label: 'Closed', text: 'text-cube-success', bg: 'bg-cube-success/10', icon: CheckCheck },
  success: { label: 'Strong Readiness', text: 'text-cube-success', bg: 'bg-cube-success/10', icon: CheckCircle2 },
  warning: { label: 'Improvement Required', text: 'text-cube-amber', bg: 'bg-cube-amber/10', icon: AlertTriangle },
  critical: { label: 'Urgent Attention Required', text: 'text-cube-red', bg: 'bg-cube-red/10', icon: AlertOctagon },
  info: { label: 'Information', text: 'text-cube-blue', bg: 'bg-cube-blue/10', icon: Info },
};

const riskConfig: Record<RiskLevel, { label: string; text: string; bg: string; icon: LucideIcon }> = {
  critical: { label: 'Critical', text: 'text-cube-red', bg: 'bg-cube-red/10', icon: AlertOctagon },
  high: { label: 'High', text: 'text-cube-amber', bg: 'bg-cube-amber/10', icon: AlertTriangle },
  medium: { label: 'Medium', text: 'text-cube-blue', bg: 'bg-cube-blue/10', icon: Info },
  low: { label: 'Low', text: 'text-cube-success', bg: 'bg-cube-success/10', icon: CheckCircle2 },
  observation: { label: 'Observation', text: 'text-muted-foreground', bg: 'bg-cube-soft', icon: Circle },
  good_practice: { label: 'Good Practice', text: 'text-cube-green', bg: 'bg-cube-green/10', icon: ShieldCheck },
};

function getScoreLevel(percentage: number): { text: string } {
  if (percentage >= 75) return { text: 'text-cube-success' };
  if (percentage >= 50) return { text: 'text-cube-amber' };
  return { text: 'text-cube-red' };
}

export interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  const displayLabel = label ?? config.label;

  return (
    <span
      role="status"
      aria-label={displayLabel}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
        config.text,
        config.bg,
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {displayLabel}
    </span>
  );
}

export interface RiskBadgeProps {
  level: RiskLevel;
  label?: string;
  className?: string;
}

export function RiskBadge({ level, label, className }: RiskBadgeProps) {
  const config = riskConfig[level];
  const Icon = config.icon;
  const displayLabel = label ?? config.label;

  return (
    <span
      role="status"
      aria-label={displayLabel}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium',
        config.text,
        config.bg,
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {displayLabel}
    </span>
  );
}

export interface ScoreIndicatorProps {
  score: number;
  max?: number;
  label?: string;
  className?: string;
}

export function ScoreIndicator({ score, max = 100, label, className }: ScoreIndicatorProps) {
  const percentage = Math.min(Math.max((score / max) * 100, 0), 100);
  const level = getScoreLevel(percentage);
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          strokeWidth="4"
          className="stroke-cube-soft"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          strokeWidth="4"
          stroke="currentColor"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          className={level.text}
        />
      </svg>
      <div className="relative -ml-[42px] flex h-[56px] w-[56px] items-center justify-center">
        <span className={cn('text-sm font-semibold', level.text)}>{score}</span>
      </div>
      <div className="flex flex-col">
        {label && <span className="text-sm font-medium text-foreground">{label}</span>}
        <span className="text-xs text-muted-foreground">Out of {max}</span>
      </div>
    </div>
  );
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
}

export function ProgressBar({ value, max = 100, label, className }: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const level = getScoreLevel(percentage);

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-1 flex items-center justify-between">
        {label && <span className="text-sm font-medium text-foreground">{label}</span>}
        <span className={cn('text-xs font-medium', level.text)}>{Math.round(percentage)}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? 'progress'}
        className="h-2 w-full rounded-full bg-cube-soft"
      >
        <div
          className={cn('h-2 rounded-full transition-all duration-500', level.text, 'bg-current')}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export interface ScoreRingProps {
  score: number;
  max?: number;
  size?: number;
  label?: string;
  className?: string;
}

export function ScoreRing({ score, max = 100, size = 120, label, className }: ScoreRingProps) {
  const percentage = Math.min(Math.max((score / max) * 100, 0), 100);
  const level = getScoreLevel(percentage);
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
  const center = size / 2;

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth="6"
          className="stroke-cube-soft"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth="6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          className={level.text}
        />
      </svg>
      <div className="flex flex-col items-center -mt-[calc(50%+12px)] pointer-events-none">
        <span className={cn('text-2xl font-bold', level.text)}>{score}</span>
        <span className="text-xs text-muted-foreground">/ {max}</span>
      </div>
      {label && <span className="text-sm font-medium text-foreground">{label}</span>}
    </div>
  );
}

export interface PriorityLegendProps {
  className?: string;
}

export function PriorityLegend({ className }: PriorityLegendProps) {
  const levels: RiskLevel[] = ['critical', 'high', 'medium', 'low', 'observation', 'good_practice'];

  return (
    <div className={cn('flex flex-wrap gap-3', className)} aria-label="Priority legend">
      {levels.map((level) => (
        <RiskBadge key={level} level={level} />
      ))}
    </div>
  );
}

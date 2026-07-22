import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  HeartPulse,
  HardHat,
  Leaf,
  BadgeCheck,
  ShieldCheck,
  Settings,
  ClipboardCheck,
  Search,
  GraduationCap,
  ShoppingBag,
  Phone,
  FileText,
  Wrench,
  FileCheck,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * SAFE CUBE icon system
 * Centralized icon mapping for consistent usage across the platform.
 */
export const iconMap: Record<string, LucideIcon> = {
  'occupational-health': HeartPulse,
  'workplace-safety': HardHat,
  'environment': Leaf,
  'quality': BadgeCheck,
  'compliance': ShieldCheck,
  'management-systems': Settings,
  'assessment': ClipboardCheck,
  'inspection': Search,
  'training': GraduationCap,
  'store': ShoppingBag,
  'contact': Phone,
  'reports': FileText,
  'corrective-actions': Wrench,
  'documents': FileCheck,
  'industries': Building2,
};

/**
 * Returns the mapped Lucide icon for a given key, or BadgeCheck as fallback.
 */
export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? BadgeCheck;
}

type Size = 'sm' | 'md' | 'lg';

const circleSizeMap: Record<Size, { container: string; icon: string }> = {
  sm: { container: 'h-9 w-9', icon: 'h-4 w-4' },
  md: { container: 'h-12 w-12', icon: 'h-5 w-5' },
  lg: { container: 'h-16 w-16', icon: 'h-7 w-7' },
};

const outlineSizeMap: Record<Size, { container: string; icon: string }> = {
  sm: { container: 'h-9 w-9', icon: 'h-4 w-4' },
  md: { container: 'h-12 w-12', icon: 'h-5 w-5' },
  lg: { container: 'h-16 w-16', icon: 'h-7 w-7' },
};

const featureSizeMap: Record<Size, { container: string; icon: string }> = {
  sm: { container: 'h-14 w-14', icon: 'h-6 w-6' },
  md: { container: 'h-16 w-16', icon: 'h-7 w-7' },
  lg: { container: 'h-20 w-20', icon: 'h-9 w-9' },
};

const hexagonColorMap: Record<'green' | 'blue' | 'navy', string> = {
  green: 'bg-cube-green/10 text-cube-green',
  blue: 'bg-cube-blue/10 text-cube-blue',
  navy: 'bg-cube-navy/10 text-cube-navy',
};

const featureColorMap: Record<'green' | 'blue' | 'navy', string> = {
  green: 'bg-cube-green/10 text-cube-green',
  blue: 'bg-cube-blue/10 text-cube-blue',
  navy: 'bg-cube-navy/10 text-cube-navy',
};

const riskStatusMap: Record<'success' | 'warning' | 'critical' | 'info', string> = {
  success: 'bg-cube-success/10 text-cube-success',
  warning: 'bg-cube-amber/10 text-cube-amber',
  critical: 'bg-cube-red/10 text-cube-red',
  info: 'bg-cube-blue/10 text-cube-blue',
};

interface IconContainerProps {
  icon: LucideIcon;
  className?: string;
  size?: Size;
  label?: string;
}

interface ColorIconContainerProps extends IconContainerProps {
  color?: 'green' | 'blue' | 'navy';
}

interface RiskStatusIconProps {
  icon: LucideIcon;
  className?: string;
  label?: string;
  status?: 'success' | 'warning' | 'critical' | 'info';
}

/**
 * Green circular icon container with filled background.
 */
export function IconCircleGreen({ icon: Icon, className, size = 'md', label }: IconContainerProps) {
  const { container, icon: iconSize } = circleSizeMap[size];
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-full bg-cube-green/10 text-cube-green',
        container,
        className
      )}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Icon className={iconSize} />
    </span>
  );
}

/**
 * Blue circular icon container with filled background.
 */
export function IconCircleBlue({ icon: Icon, className, size = 'md', label }: IconContainerProps) {
  const { container, icon: iconSize } = circleSizeMap[size];
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-full bg-cube-blue/10 text-cube-blue',
        container,
        className
      )}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Icon className={iconSize} />
    </span>
  );
}

/**
 * Navy circular icon container with filled background.
 */
export function IconCircleNavy({ icon: Icon, className, size = 'md', label }: IconContainerProps) {
  const { container, icon: iconSize } = circleSizeMap[size];
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-full bg-cube-navy/10 text-cube-navy',
        container,
        className
      )}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Icon className={iconSize} />
    </span>
  );
}

/**
 * Green outlined icon container with border.
 */
export function IconOutlineGreen({ icon: Icon, className, size = 'md', label }: IconContainerProps) {
  const { container, icon: iconSize } = outlineSizeMap[size];
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-md border border-cube-green text-cube-green',
        container,
        className
      )}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Icon className={iconSize} />
    </span>
  );
}

/**
 * Blue outlined icon container with border.
 */
export function IconOutlineBlue({ icon: Icon, className, size = 'md', label }: IconContainerProps) {
  const { container, icon: iconSize } = outlineSizeMap[size];
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-md border border-cube-blue text-cube-blue',
        container,
        className
      )}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Icon className={iconSize} />
    </span>
  );
}

/**
 * Hexagon-shaped icon container with configurable color.
 * Uses the `hexagon-clip` CSS class for the hexagonal shape.
 */
export function IconHexagon({ icon: Icon, className, size = 'md', label, color = 'green' }: ColorIconContainerProps) {
  const { container, icon: iconSize } = circleSizeMap[size];
  return (
    <span
      className={cn(
        'hexagon-clip flex items-center justify-center',
        hexagonColorMap[color],
        container,
        className
      )}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Icon className={iconSize} />
    </span>
  );
}

/**
 * Small inline icon for use within text flows.
 */
export function IconInline({ icon: Icon, className, label }: Omit<IconContainerProps, 'size'>) {
  return (
    <span
      className={cn('inline-block h-4 w-4', className)}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Icon className="h-4 w-4" />
    </span>
  );
}

/**
 * Larger feature icon container with rounded-lg corners and configurable color.
 */
export function FeatureIcon({ icon: Icon, className, size = 'lg', label, color = 'green' }: ColorIconContainerProps) {
  const { container, icon: iconSize } = featureSizeMap[size];
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-lg',
        featureColorMap[color],
        container,
        className
      )}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Icon className={iconSize} />
    </span>
  );
}

/**
 * Small badge-like icon for risk status indicators.
 */
export function RiskStatusIcon({ icon: Icon, className, label, status = 'success' }: RiskStatusIconProps) {
  return (
    <span
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded-full',
        riskStatusMap[status],
        className
      )}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Icon className="h-3.5 w-3.5" />
    </span>
  );
}

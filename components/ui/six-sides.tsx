'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { HeartPulse, HardHat, Leaf, BadgeCheck, ShieldCheck, Settings, type LucideIcon } from 'lucide-react';

type Side = {
  id: number;
  title: string;
  icon: LucideIcon;
  description: string;
};

const sides: Side[] = [
  {
    id: 0,
    title: 'Occupational Health',
    icon: HeartPulse,
    description:
      'SAFE CUBE helps organizations identify and control workplace conditions that may affect employee health and wellbeing. This includes occupational exposure, hygiene, ergonomics, heat, noise, fatigue, welfare facilities, manual handling, and other health-related risks. The objective is to create working conditions that protect people while supporting attendance, productivity, dignity, and long-term wellbeing.',
  },
  {
    id: 1,
    title: 'Workplace Safety',
    icon: HardHat,
    description:
      'Workplace safety is the foundation of responsible operations. SAFE CUBE identifies unsafe conditions, unsafe acts, fire hazards, machinery risks, electrical concerns, emergency weaknesses, and gaps in everyday controls. We then help businesses prioritize realistic actions that prevent injuries, protect assets, and strengthen confidence across the workforce.',
  },
  {
    id: 2,
    title: 'Environment',
    icon: Leaf,
    description:
      'SAFE CUBE supports businesses in managing waste, spills, emissions, resource use, pollution risks, storage practices, and environmental responsibilities. Our approach helps organizations reduce unnecessary environmental impact, improve workplace cleanliness, manage materials responsibly, and prepare for customer, regulatory, or ISO 14001-related expectations.',
  },
  {
    id: 3,
    title: 'Quality',
    icon: BadgeCheck,
    description:
      'Quality means consistently delivering products and services that meet requirements and build customer confidence. SAFE CUBE reviews processes, responsibilities, records, controls, complaints, recurring errors, and improvement opportunities. We help organizations reduce inconsistency, prevent repeated failures, and develop practical systems that support reliable performance.',
  },
  {
    id: 4,
    title: 'Compliance',
    icon: ShieldCheck,
    description:
      'Compliance can become difficult when legal obligations, client expectations, internal policies, and international standards are managed separately. SAFE CUBE helps organizations understand applicable requirements, identify evidence gaps, organize documentation, clarify responsibilities, and create a structured approach to maintaining workplace compliance.',
  },
  {
    id: 5,
    title: 'Management Systems',
    icon: Settings,
    description:
      'Strong performance depends on systems that people can understand and use. SAFE CUBE helps businesses turn workplace requirements into clear policies, procedures, responsibilities, inspections, records, reviews, and improvement actions. The goal is not unnecessary paperwork, but a practical and documented management system that supports consistent execution.',
  },
];

export interface SixSidesProps {
  activeSide?: number;
  onSideSelect?: (id: number) => void;
  showDetailPanel?: boolean;
  className?: string;
}

export function SixSides({
  activeSide,
  onSideSelect,
  showDetailPanel = true,
  className,
}: SixSidesProps) {
  const [internalActive, setInternalActive] = useState<number>(0);
  const currentActive = activeSide ?? internalActive;

  const handleSelect = (id: number) => {
    if (onSideSelect) onSideSelect(id);
    if (activeSide === undefined) setInternalActive(id);
  };

  const activeSideData = sides.find((s) => s.id === currentActive) ?? sides[0];

  return (
    <div className={cn('flex flex-col items-center gap-8', className)}>
      <div className="flex flex-col items-center gap-2">
        <div
          role="img"
          aria-label="SAFE CUBE logo"
          className="flex items-center justify-center gap-1"
        >
          <div className="grid grid-cols-2 gap-1" aria-hidden="true">
            <div className="h-8 w-8 rounded-sm bg-cube-green" />
            <div className="h-8 w-8 rounded-sm bg-cube-navy" />
            <div className="h-8 w-8 rounded-sm bg-cube-navy" />
            <div className="h-8 w-8 rounded-sm bg-cube-green" />
          </div>
        </div>
        <span
          aria-hidden="true"
          className="text-xs font-bold tracking-widest text-cube-navy uppercase"
        >
          SAFE CUBE
        </span>
      </div>

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sides.map((side) => {
          const isActive = side.id === currentActive;
          const isEven = side.id % 2 === 0;
          const Icon = side.icon;

          return (
            <button
              key={side.id}
              type="button"
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={side.title}
              onClick={() => handleSelect(side.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect(side.id);
                }
              }}
              className={cn(
                'flex flex-col items-center gap-2 rounded-lg p-4 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cube-green focus-visible:ring-offset-2',
                isActive ? 'bg-cube-soft ring-1 ring-cube-green/30' : 'hover:bg-cube-soft/50'
              )}
            >
              <div
                className={cn(
                  'hexagon-clip flex h-14 w-14 items-center justify-center',
                  isEven
                    ? isActive
                      ? 'bg-cube-green/25 text-cube-green'
                      : 'bg-cube-green/15 text-cube-green'
                    : isActive
                      ? 'bg-cube-blue/25 text-cube-blue'
                      : 'bg-cube-blue/15 text-cube-blue'
                )}
              >
                <Icon className="h-6 w-6" />
              </div>
              <span className="mt-2 text-sm font-semibold text-cube-navy">
                {side.title}
              </span>
            </button>
          );
        })}
      </div>

      {showDetailPanel && (
        <div
          aria-live="polite"
          className="mx-auto mt-6 max-w-narrow rounded-lg border border-cube-soft bg-white p-6"
        >
          <h3 className="text-lg font-semibold text-cube-navy">
            {activeSideData.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {activeSideData.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default SixSides;

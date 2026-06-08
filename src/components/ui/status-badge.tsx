import React from 'react';

export interface StatusBadgeProps {
  /** The label text to display */
  text: string;
  /** Tailwind color class for the dot (e.g. 'bg-green-500', 'bg-red-500') */
  colorClass?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ text, colorClass = 'bg-emerald-500' }) => {
  return (
    <span className="inline-flex items-center border border-border bg-muted/50 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
      <span
        className={`h-2 w-2 rounded-full animate-pulse ${colorClass} mr-2`}
        aria-hidden="true"
      />
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{text}</span>
    </span>
  );
};

export default StatusBadge;

import React from 'react';

export interface StatusBadgeProps {
  /** The label text to display */
  text: string;
  /** Tailwind color class for the dot (e.g. 'bg-green-500', 'bg-red-500') */
  colorClass?: string;
}

/**
 * A simple status badge component that shows a colored dot and a label.
 *
 * @example
 * <StatusBadge text="Available for projects" />
 * <StatusBadge text="Busy" colorClass="bg-red-500" />
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({ text, colorClass = 'bg-green-500' }) => {
  return (
    <span className="inline-flex items-center border border-gray-700 rounded-full px-3 py-1 text-sm font-medium bg-gray-800">
      <span
        className={`h-3 w-3 rounded-full animate-pulse ${colorClass} mr-2`}
        aria-hidden="true"
      />
      <span className="text-sm font-medium text-white-900">{text}</span>
    </span>
  );
};

export default StatusBadge;

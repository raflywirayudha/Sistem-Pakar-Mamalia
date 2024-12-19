import React from "react";

interface ProgressProps {
  value: number;
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({ value, className = "" }) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div
      className={`w-full h-4 bg-gray-200 rounded-full overflow-hidden ${className}`}
    >
      <div
        className="h-full bg-green-500 transition-all duration-500"
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
};

export default Progress;

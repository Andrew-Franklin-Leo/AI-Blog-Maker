
import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      {children}
      {isTooltipVisible && (
        <div
          className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-90 bottom-full -translate-x-1/2 left-1/2"
          role="tooltip"
        >
          {text}
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;

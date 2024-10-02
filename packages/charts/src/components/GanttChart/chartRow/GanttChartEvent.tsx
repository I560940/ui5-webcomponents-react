import { Icon } from '@ui5/webcomponents-react';
import React from 'react';

interface GanttChartEventProps {
  date: string;
  icon: string;
  startTime: number;
  GanttStart: number;
  totalDuration: number;
  iconSize?: number;
  shiftIconPx?: number;
  iconColor?: string;
}

export const GanttChartEvent = ({
  icon,
  startTime,
  GanttStart,
  totalDuration,
  iconSize = 16,
  shiftIconPx = 0,
  iconColor
}: GanttChartEventProps) => {
  return (
    <foreignObject
      x={`${((startTime + 1.2 - GanttStart) / totalDuration) * 100}%`}
      width={iconSize}
      height="100%"
      transform={`translate(${-shiftIconPx}, 0)`}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          zIndex: 2
        }}
      >
        <Icon name={icon} style={{ width: iconSize, color: iconColor && iconColor }} />
      </div>
    </foreignObject>
  );
};

import { Icon } from '@ui5/webcomponents-react';
import React from 'react';

interface GanttChartEventProps {
  date: string;
  icon: string;
  startTime: number;
  GanttStart: number;
  totalDuration: number;
}

export const GanttChartEvent = ({ icon, startTime, GanttStart, totalDuration }: GanttChartEventProps) => {
  return (
    <foreignObject x={`${((startTime + 1 - GanttStart) / totalDuration) * 100}%`} width={`10%`} height="100%">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          zIndex: 2
        }}
      >
        <Icon name={icon} />
      </div>
    </foreignObject>
  );
};

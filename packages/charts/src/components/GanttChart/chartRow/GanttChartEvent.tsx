import { Icon } from '@ui5/webcomponents-react';
import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';
import type { IGanttChartEvent } from '../types/GanttChartTypes.js';

interface GanttChartEventProps {
  date?: string;
  icon?: string;
  iconSize?: number;
  shiftIconPx?: number;
  iconColor?: string;
  events: IGanttChartEvent[];
  position: number | string;
  handleEventsClick: (events: IGanttChartEvent[], e: React.MouseEvent) => void;
}

export const GanttChartEvent = ({
  iconSize = 16,
  shiftIconPx = 0,
  events = [],
  position,
  handleEventsClick
}: GanttChartEventProps) => {
  const handleEventClickEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleEventsClick(events, e);
  };

  return (
    <foreignObject
      x={position}
      width={iconSize}
      height="100%"
      transform={`translate(${-shiftIconPx}, 0)`}
      style={{ overflow: 'visible', pointerEvents: 'none' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '48px',
          width: '48px',
          zIndex: 2,
          pointerEvents: 'auto',
          cursor: 'pointer'
        }}
        onClick={handleEventClickEvent}
      >
        <Icon name={events[0].icon} style={{ width: iconSize, color: events[0].color }} />
        {events.length > 1 && (
          <span
            style={{
              marginLeft: -7,
              marginBottom: 12,
              backgroundColor: ThemingParameters.sapBrandColor,
              color: 'white',
              borderRadius: '50%',
              width: '12px',
              height: '12px',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'center'
            }}
          >
            {events.length}
          </span>
        )}
      </div>
    </foreignObject>
  );
};

import React from 'react';
import type { DateRange } from '../types/GanttChartTypes.js';
import { formatContractDuration } from '../util/utils.js';

export interface GanttContractDurationProps {
  contractDuration: DateRange;
}

export const GanttContractDuration = (props: GanttContractDurationProps) => {
  const { contractDuration } = props;

  const formattedContractDuration = formatContractDuration(contractDuration);

  return (
    <svg
      x="0"
      y="0"
      width="100%"
      height={48}
      style={{ pointerEvents: 'none', userSelect: 'none', fontSize: 14 }}
      data-component-name="GanttContractDuration"
    >
      <rect
        data-component-name="GanttContractDuration"
        id="GanttContractDuration"
        x={1}
        y={16}
        rx={8}
        ry={8}
        width={`100%`}
        height={24}
        style={{ fill: 'var(--sapActiveColor)' }}
      />
      <text x={8} dx={0} y={33} dy={0} color={'black'} fill="var(--sapTextColor)">
        Contract Duration: {formattedContractDuration}
      </text>
    </svg>
  );
};

GanttContractDuration.displayName = 'GanttContractDuration';

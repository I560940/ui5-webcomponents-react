import React from 'react';
import type { IGanttChartRow } from '../../types/GanttChartTypes.js';
import { GanttChartRow } from './GanttChartRow.js';

interface GanttChartRowGroupProps {
  dataset: IGanttChartRow[];
  rowHeight: number;
  totalDuration: number;
  GanttStart: number;
  showTooltip: (...x: unknown[]) => void;
  hideTooltip: () => void;
  handleTaskClick: (task: Record<string, any>) => void;
}
export const GanttChartRowGroup = ({
  dataset,
  rowHeight,
  totalDuration,
  GanttStart,
  showTooltip,
  hideTooltip,
  handleTaskClick
}: GanttChartRowGroupProps) => {
  return (
    <svg width="100%" height="100%">
      {dataset.map((data, index) => {
        return (
          <GanttChartRow
            key={index}
            rowData={data}
            rowHeight={rowHeight}
            rowIndex={index}
            totalDuration={totalDuration}
            GanttStart={GanttStart}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
            handleTaskClick={handleTaskClick}
          />
        );
      })}
    </svg>
  );
};

GanttChartRowGroup.displayName = 'GanttChartRowGroup';

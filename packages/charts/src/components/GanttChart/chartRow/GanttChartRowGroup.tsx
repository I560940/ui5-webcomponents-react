import React from 'react';
import type { DateRange, IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
import { GanttChartRow } from './GanttChartRow.js';
import { GanttContractDuration } from './GanttContractDuration.js';

export interface GanttChartRowGroupProps {
  dataset: IGanttChartRow[];
  rowHeight: number;
  totalDuration: number;
  contractDuration: DateRange;
  GanttStart: number;
  showTooltip: (...x: unknown[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleTaskClick: (task: Record<string, any>, event: React.MouseEvent) => void;
  hideTooltip: () => void;
  openRowIndex: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
}
export const GanttChartRowGroup = (props: GanttChartRowGroupProps) => {
  const { dataset, rowHeight, totalDuration, contractDuration, GanttStart, showTooltip, handleTaskClick, hideTooltip } =
    props;

  return (
    <svg width="100%" height="100%">
      <GanttContractDuration contractDuration={contractDuration} />
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
            contractDuration={contractDuration}
          />
        );
      })}
    </svg>
  );
};

GanttChartRowGroup.displayName = 'GanttChartRowGroup';

import React from 'react';
import type { IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../../types/GanttChartTypes.js';
import { flattenDataset } from '../../util/utils.js';
import { GanttChartRow } from './GanttChartRow.js';

export interface GanttChartRowGroupProps {
  dataset: IGanttChartRow[];
  rowHeight: number;
  totalDuration: number;
  GanttStart: number;
  showTooltip: (...x: unknown[]) => void;
  handleTaskClick: (task: Record<string, any>, event: React.MouseEvent) => void;
  hideTooltip: () => void;
  openRowIndex: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
}
export const GanttChartRowGroup = (props: GanttChartRowGroupProps) => {
  const {
    dataset,
    rowHeight,
    totalDuration,
    GanttStart,
    showTooltip,
    handleTaskClick,
    hideTooltip,
    openRowIndex,
    openSubRowIndexes
  } = props;

  const flattenedDataset = flattenDataset(dataset, openRowIndex, openSubRowIndexes);

  return (
    <svg width="100%" height="100%">
      {flattenedDataset.map((data, index) => {
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

import React, { useEffect, useState } from 'react';
import type {
  DateRange,
  IGanttChartRow,
  OpenRowIndex,
  OpenSubRowIndexes,
  IGanttChartEvent
} from '../types/GanttChartTypes.js';
import { flattenDataset } from '../util/utils.js';
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
  handleEventsClick: (events: IGanttChartEvent[], e: React.MouseEvent) => void;
  hideTooltip: () => void;
  openRowIndex: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
  chartBodyScale: number;
  ganttChartBodyWidth: number;
}
export const GanttChartRowGroup = (props: GanttChartRowGroupProps) => {
  const {
    dataset,
    rowHeight,
    totalDuration,
    contractDuration,
    GanttStart,
    showTooltip,
    handleTaskClick,
    hideTooltip,
    openRowIndex,
    openSubRowIndexes,
    chartBodyScale,
    ganttChartBodyWidth,
    handleEventsClick
  } = props;

  const [flattenedDataset, setFlattenedDataset] = useState<IGanttChartRow[]>([]);

  useEffect(() => {
    setFlattenedDataset(flattenDataset(dataset, openRowIndex, openSubRowIndexes));
  }, [dataset, openRowIndex, openSubRowIndexes]);

  return (
    <svg width="100%" height="100%">
      <GanttContractDuration contractDuration={contractDuration} />
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
            contractDuration={contractDuration}
            chartBodyScale={chartBodyScale}
            ganttChartBodyWidth={ganttChartBodyWidth}
            handleEventsClick={handleEventsClick}
          />
        );
      })}
    </svg>
  );
};

GanttChartRowGroup.displayName = 'GanttChartRowGroup';

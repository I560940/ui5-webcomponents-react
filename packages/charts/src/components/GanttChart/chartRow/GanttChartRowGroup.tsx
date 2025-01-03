import React, { useEffect, useState } from 'react';
import type {
  DateRange,
  IGanttChartRow,
  OpenRowIndex,
  OpenSubRowIndexes,
  IGanttChartEvent,
  IGanttChartTask
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
  handleTaskClick: (parentId: string, task: IGanttChartTask, event: React.MouseEvent) => void;
  handleEventsClick: (events: IGanttChartEvent[], e: React.MouseEvent) => void;
  hideTooltip: () => void;
  openRowIndexes: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
  chartBodyScale: number;
  ganttChartBodyWidth: number;
  shouldEventsBeGrouped: boolean;
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
    openRowIndexes,
    openSubRowIndexes,
    chartBodyScale,
    ganttChartBodyWidth,
    handleEventsClick,
    shouldEventsBeGrouped
  } = props;

  const [flattenedDataset, setFlattenedDataset] = useState<IGanttChartRow[]>([]);

  useEffect(() => {
    setFlattenedDataset(flattenDataset(dataset, openRowIndexes, openSubRowIndexes));
  }, [dataset, openRowIndexes, openSubRowIndexes]);

  return (
    <svg width="100%" height="100%" overflow={'visible'}>
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
            shouldEventsBeGrouped={shouldEventsBeGrouped}
          />
        );
      })}
    </svg>
  );
};

GanttChartRowGroup.displayName = 'GanttChartRowGroup';

import React from 'react';
import type { DateRange, IGanttChartRow, IGanttChartEvent, IGanttChartTask } from '../types/GanttChartTypes.js';
import { ROW_CONTRACT_DURATION_HEIGHT } from '../util/constants.js';
import { countTaskDuration, getStartTime } from '../util/utils.js';
import { GanttTask } from './GanttTask.js';

interface GanttChartRowProps {
  rowData: IGanttChartRow;
  rowHeight: number;
  rowIndex: number;
  totalDuration: number;
  GanttStart: number;
  showTooltip: (...x: unknown[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleTaskClick: (parentId: string, task: IGanttChartTask, event: React.MouseEvent) => void;
  handleEventsClick: (events: IGanttChartEvent[], e: React.MouseEvent) => void;
  hideTooltip: () => void;
  contractDuration: DateRange;
  chartBodyScale: number;
  ganttChartBodyWidth: number;
  shouldEventsBeGrouped: boolean;
}

/**
 * This represents each row of the GanttChart. It is used to display
 * the task items and milestones.
 */
export const GanttChartRow = ({
  rowData,
  rowHeight,
  rowIndex,
  totalDuration,
  GanttStart,
  showTooltip,
  hideTooltip,
  handleTaskClick,
  contractDuration,
  chartBodyScale,
  ganttChartBodyWidth,
  handleEventsClick,
  shouldEventsBeGrouped,
  ...rest
}: GanttChartRowProps) => {
  return (
    <svg
      x="0"
      y={`${rowIndex * rowHeight + ROW_CONTRACT_DURATION_HEIGHT}`}
      width="100%"
      overflow={'visible'}
      height={`${rowHeight}`}
      style={{ pointerEvents: 'none' }}
      data-component-name="GanttChartRow"
      {...rest}
    >
      {rowData.tasks?.map((task, index) => {
        return (
          <GanttTask
            key={task.id + index + task.dateStart + task.dateEnd}
            id={task.id}
            startTime={getStartTime(contractDuration?.dateStart, task.dateStart)}
            duration={countTaskDuration(task.dateStart, task.dateEnd)}
            totalDuration={totalDuration}
            GanttStart={GanttStart}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
            handleTaskClick={handleTaskClick}
            contractStartDate={contractDuration.dateStart}
            chartBodyScale={chartBodyScale}
            ganttChartBodyWidth={ganttChartBodyWidth}
            handleEventsClick={handleEventsClick}
            task={task}
            parentId={rowData.id}
            shouldEventsBeGrouped={shouldEventsBeGrouped}
          />
        );
      })}
    </svg>
  );
};

GanttChartRow.displayName = 'GanttChartRow';

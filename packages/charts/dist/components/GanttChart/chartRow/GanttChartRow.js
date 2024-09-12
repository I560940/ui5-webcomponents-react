import React from 'react';
// import { GanttMilestone } from './GanttMilestone.js';
import { ROW_CONTRACT_DURATION_HEIGHT } from '../util/constants.js';
import { GanttTask } from './GanttTask.js';
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
  handleTaskClick
}) => {
  rowData.color = rowData.color ?? `var(--sapChart_OrderedColor_${(rowIndex % 11) + 1})`;
  return React.createElement(
    'svg',
    {
      x: '0',
      y: `${rowIndex * rowHeight + ROW_CONTRACT_DURATION_HEIGHT}`,
      width: '100%',
      height: `${rowHeight}`,
      style: { pointerEvents: 'none' },
      'data-component-name': 'GanttChartRow'
    },
    rowData.tasks?.map((task, index) => {
      return React.createElement(GanttTask, {
        key: index + 1,
        id: task.id,
        label: task.label ?? rowData.label,
        startTime: task.start,
        duration: task.duration,
        totalDuration: totalDuration,
        color: task.color ?? rowData.color,
        GanttStart: GanttStart,
        showTooltip: showTooltip,
        hideTooltip: hideTooltip,
        handleTaskClick: handleTaskClick
      });
    })
  );
};
GanttChartRow.displayName = 'GanttChartRow';

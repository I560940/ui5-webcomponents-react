import React from 'react';
import { ROW_CONTRACT_DURATION_HEIGHT } from '../util/constants.js';
import { countTaskDuration, getTaskStartTime } from '../util/utils.js';
import { GanttTask } from './GanttTask.js';
/**
 * This represents each row of the GanttChart. It is used to display
 * the task items and milestones.
 */
export const GanttChartRow = ({ rowData, rowHeight, rowIndex, totalDuration, GanttStart, showTooltip, hideTooltip, handleTaskClick, contractDuration, ...rest }) => {
    return (React.createElement("svg", { x: "0", y: `${rowIndex * rowHeight + ROW_CONTRACT_DURATION_HEIGHT}`, width: "100%", height: `${rowHeight}`, style: { pointerEvents: 'none' }, "data-component-name": "GanttChartRow", ...rest }, rowData.tasks?.map((task, index) => {
        return (React.createElement(GanttTask, { key: index + 1, id: task.id, label: task.status ?? 'Elo', startTime: getTaskStartTime(contractDuration?.dateStart, task.dateStart), duration: countTaskDuration(task.dateStart, task.dateEnd), totalDuration: totalDuration, color: task.color, GanttStart: GanttStart, showTooltip: showTooltip, hideTooltip: hideTooltip, handleTaskClick: handleTaskClick, events: task.events, contractStartDate: contractDuration.dateStart }));
    })));
};
GanttChartRow.displayName = 'GanttChartRow';

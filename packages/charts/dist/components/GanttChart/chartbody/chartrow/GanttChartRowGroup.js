import React from 'react';
import { GanttChartRow } from './GanttChartRow.js';
export const GanttChartRowGroup = ({ dataset, rowHeight, totalDuration, GanttStart, showTooltip, hideTooltip, handleTaskClick }) => {
    return (React.createElement("svg", { width: "100%", height: "100%" }, dataset.map((data, index) => {
        return (React.createElement(GanttChartRow, { key: index, rowData: data, rowHeight: rowHeight, rowIndex: index, totalDuration: totalDuration, GanttStart: GanttStart, showTooltip: showTooltip, hideTooltip: hideTooltip, handleTaskClick: handleTaskClick }));
    })));
};
GanttChartRowGroup.displayName = 'GanttChartRowGroup';

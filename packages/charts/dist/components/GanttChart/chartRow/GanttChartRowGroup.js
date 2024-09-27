import React from 'react';
import { GanttChartRow } from './GanttChartRow.js';
import { GanttContractDuration } from './GanttContractDuration.js';
export const GanttChartRowGroup = (props) => {
    const { dataset, rowHeight, totalDuration, contractDuration, GanttStart, showTooltip, handleTaskClick, hideTooltip } = props;
    return (React.createElement("svg", { width: "100%", height: "100%" },
        React.createElement(GanttContractDuration, { contractDuration: contractDuration }),
        dataset.map((data, index) => {
            return (React.createElement(GanttChartRow, { key: index, rowData: data, rowHeight: rowHeight, rowIndex: index, totalDuration: totalDuration, GanttStart: GanttStart, showTooltip: showTooltip, hideTooltip: hideTooltip, handleTaskClick: handleTaskClick, contractDuration: contractDuration }));
        })));
};
GanttChartRowGroup.displayName = 'GanttChartRowGroup';

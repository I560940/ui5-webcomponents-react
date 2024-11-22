import React from 'react';
import { GanttChartRowLabels } from '../headers/GanttChartRowLabels.js';
import { GanttChartRowTitle } from '../headers/GanttChartRowTitle.js';
import { COLUMN_COMPONENT_WIDTH, COLUMN_HEADER_HEIGHT } from '../util/constants.js';
import { solidOutline } from '../util/styles.js';
export const GanttChartColumn = (props) => {
    const { height, columnTitle, rowHeight, dataset, dataType, handleClick, handleSubClick, openRowIndexes, openSubRowIndexes, numberOfRows, showStatus } = props;
    return (React.createElement("div", { style: {
            width: !showStatus ? 'auto' : COLUMN_COMPONENT_WIDTH,
            height: height,
            textAlign: dataType === 'status' ? 'center' : 'left',
            borderRight: dataType === 'status' || !showStatus ? solidOutline : ''
        } },
        React.createElement(GanttChartRowTitle, { height: COLUMN_HEADER_HEIGHT, title: columnTitle }),
        React.createElement(GanttChartRowLabels, { height: height - COLUMN_HEADER_HEIGHT, rowHeight: rowHeight, dataset: dataset, dataType: dataType, handleClick: handleClick ?? null, handleSubClick: handleSubClick ?? null, openRowIndexes: openRowIndexes, openSubRowIndexes: openSubRowIndexes, numOfRows: numberOfRows })));
};

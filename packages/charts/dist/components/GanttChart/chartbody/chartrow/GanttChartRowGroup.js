import React from 'react';
import { flattenDataset } from '../../util/utils.js';
import { GanttChartRow } from './GanttChartRow.js';
export const GanttChartRowGroup = (props) => {
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
  return React.createElement(
    'svg',
    { width: '100%', height: '100%' },
    flattenedDataset.map((data, index) => {
      return React.createElement(GanttChartRow, {
        key: index,
        rowData: data,
        rowHeight: rowHeight,
        rowIndex: index,
        totalDuration: totalDuration,
        GanttStart: GanttStart,
        showTooltip: showTooltip,
        hideTooltip: hideTooltip,
        handleTaskClick: handleTaskClick
      });
    })
  );
};
GanttChartRowGroup.displayName = 'GanttChartRowGroup';

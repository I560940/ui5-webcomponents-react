import React from 'react';
import { useStyles } from '../util/styles.js';
export const GanttChartRowLabels = ({ width, height, rowHeight, rowLabels }) => {
  const classes = useStyles();
  const style = {
    width: width,
    height: `${rowLabels.length * rowHeight}px`
  };
  const itemStyle = {
    height: `${rowHeight}px`,
    lineHeight: `${rowHeight}px`
  };
  return React.createElement(
    'div',
    { style: { height: height } },
    React.createElement(
      'div',
      { className: classes.rowLabels, style: style },
      rowLabels.map((label, index) => {
        return React.createElement(
          'div',
          { key: index, className: classes.rowLabelsItem, style: itemStyle },
          React.createElement('span', { style: { paddingInline: '10px' }, title: `Item ${label}` }, label)
        );
      })
    )
  );
};

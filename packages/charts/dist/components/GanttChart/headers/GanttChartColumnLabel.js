import React from 'react';
import { useStyles } from '../util/styles.js';
import { DayLabels } from './DayLabels.js';
import { MonthLabels } from './MonthLabels.js';
import { QuaterLabels } from './QuaterLabels.js';
export const GanttChartColumnLabel = (props) => {
  const { width, height, totalDuration, contractDuration } = props;
  const classes = useStyles();
  const segmentWidth = width / totalDuration;
  const style = {
    width: width,
    height: height
  };
  return React.createElement(
    'div',
    { className: classes.columnLabel, style: style, 'data-component-name': 'GanttChartColumnLabel' },
    segmentWidth > 20
      ? React.createElement(DayLabels, {
          segmentWidth: segmentWidth,
          height: height,
          contractDuration: contractDuration
        })
      : null,
    segmentWidth > 1.2 && segmentWidth <= 20
      ? React.createElement(MonthLabels, {
          segmentWidth: segmentWidth,
          height: height,
          contractDuration: contractDuration
        })
      : null,
    segmentWidth <= 1.2
      ? React.createElement(QuaterLabels, {
          segmentWidth: segmentWidth,
          height: height,
          contractDuration: contractDuration
        })
      : null
  );
};

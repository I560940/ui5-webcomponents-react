import React from 'react';
import { FONT_SIZE, SEGMENT_WIDTH_FULL_LABEL, SEGMENT_WIDTH_THRESHOLD } from '../../util/constants.js';
import { useStyles } from '../../util/styles.js';
import { prepareTimelineData } from '../../util/utils.js';
import { MonthsDaysLabel } from './MonthsDaysLabel.js';
import { YearsMonthsLabel } from './YearsMonthsLabel.js';
import { YearsQuartersLabel } from './YearsQuartersLabel.js';
export const GanttChartTimeline = (props) => {
  const { width, height, totalDuration, contractDuration } = props;
  const classes = useStyles();
  const segmentWidth = width / totalDuration;
  const style = {
    width: width,
    height: height
  };
  const data = prepareTimelineData(contractDuration);
  return React.createElement(
    'div',
    { className: classes.columnLabel, style: style, 'data-component-name': 'GanttChartTimeline' },
    React.createElement(
      'svg',
      { height: height, width: '100%', fontFamily: 'inherit', fontSize: FONT_SIZE },
      segmentWidth > SEGMENT_WIDTH_FULL_LABEL
        ? React.createElement(MonthsDaysLabel, { segmentWidth: segmentWidth, height: height, months: data.months })
        : null,
      segmentWidth > SEGMENT_WIDTH_THRESHOLD && segmentWidth <= SEGMENT_WIDTH_FULL_LABEL
        ? React.createElement(YearsMonthsLabel, {
            segmentWidth: segmentWidth,
            height: height,
            months: data.months,
            years: data.years
          })
        : null,
      segmentWidth <= SEGMENT_WIDTH_THRESHOLD
        ? React.createElement(YearsQuartersLabel, {
            segmentWidth: segmentWidth,
            height: height,
            quarters: data.quarters,
            years: data.years
          })
        : null
    )
  );
};

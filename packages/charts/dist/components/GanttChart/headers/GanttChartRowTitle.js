import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';
import { useStyles } from '../util/styles.js';
export const GanttChartRowTitle = ({ width, height, rowTitle }) => {
  const classes = useStyles();
  const style = {
    width: width,
    height: height,
    color: ThemingParameters.sapTitleColor
  };
  return React.createElement(
    'div',
    { className: classes.onlyOutline, style: style },
    React.createElement('div', { className: classes.rowTitleTop }),
    React.createElement('div', { className: classes.rowTitleBottom }, rowTitle)
  );
};

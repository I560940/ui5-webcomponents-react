import { FlexBox } from '@ui5/webcomponents-react';
import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';
import { useStyles } from '../util/styles.js';
export const GanttChartRowTitle = (props) => {
  const { width, height, title } = props;
  const classes = useStyles();
  const style = {
    width: width,
    height: height,
    color: ThemingParameters.sapTitleColor
  };
  return React.createElement(
    'div',
    { style: style },
    React.createElement('div', { className: classes.rowTitleTop }),
    React.createElement(FlexBox, { className: classes.rowTitleBottom, alignItems: 'Center' }, title)
  );
};

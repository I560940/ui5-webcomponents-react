import { ThemingParameters } from '@ui5/webcomponents-react-base';
import type { CSSProperties } from 'react';
import React from 'react';
import { useStyles } from '../util/styles.js';

export interface GanttChartRowTitleProps {
  width: number;
  height: number;
  title: string;
}

export const GanttChartRowTitle = (props: GanttChartRowTitleProps) => {
  const { width, height, title } = props;
  const classes = useStyles();
  const style: CSSProperties = {
    width: width,
    height: height,
    color: ThemingParameters.sapTitleColor
  };
  return (
    <div className={classes.onlyOutline} style={style}>
      <div className={classes.rowTitleTop}></div>
      <div className={classes.rowTitleBottom}>{title}</div>
    </div>
  );
};

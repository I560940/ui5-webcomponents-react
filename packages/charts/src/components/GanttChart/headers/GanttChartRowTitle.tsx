import { ThemingParameters } from '@ui5/webcomponents-react-base';
import type { CSSProperties } from 'react';
import React from 'react';
import { useStyles } from '../util/styles.js';

interface GanttChartRowTitleProps {
  width: number;
  height: number;
  rowTitle: string;
}

export const GanttChartRowTitle = ({ width, height, rowTitle }: GanttChartRowTitleProps) => {
  const classes = useStyles();
  const style: CSSProperties = {
    width: width,
    height: height,
    color: ThemingParameters.sapTitleColor
  };
  return (
    <div className={classes.onlyOutline} style={style}>
      <div className={classes.rowTitleTop}></div>
      <div className={classes.rowTitleBottom}>{rowTitle}</div>
    </div>
  );
};

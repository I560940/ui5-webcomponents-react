import { FlexBox } from '@ui5/webcomponents-react';
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
    <div style={style}>
      <div className={classes.rowTitleTop}></div>
      <FlexBox className={classes.rowTitleBottom} alignItems="Center">
        {title}
      </FlexBox>
    </div>
  );
};

import { FlexBox, FlexBoxAlignItems, FlexBoxJustifyContent } from '@ui5/webcomponents-react';
import { ThemingParameters } from '@ui5/webcomponents-react-base';
import type { CSSProperties } from 'react';
import React from 'react';
import { useStyles } from '../util/styles.js';

export interface GanttChartRowTitleProps {
  width: number;
  height: number;
  title: string;
  showStatus: boolean;
}

export const GanttChartRowTitle = (props: GanttChartRowTitleProps) => {
  const { width, height, title, showStatus } = props;
  const classes = useStyles();
  const style: CSSProperties = {
    width: width,
    height: height,
    color: ThemingParameters.sapTitleColor
  };

  return (
    <div style={style}>
      <div className={classes.rowTitleTop}></div>
      <FlexBox
        className={classes.rowTitleBottom}
        alignItems={FlexBoxAlignItems.Center}
        justifyContent={!showStatus && FlexBoxJustifyContent.Center}
      >
        {title}
      </FlexBox>
    </div>
  );
};

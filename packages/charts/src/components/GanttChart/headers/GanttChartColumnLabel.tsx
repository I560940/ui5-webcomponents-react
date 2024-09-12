import type { CSSProperties } from 'react';
import React from 'react';
import type { DateRange } from '../types/GanttChartTypes.js';
import { useStyles } from '../util/styles.js';
import { DayLabels } from './DayLabels.js';
import { MonthsLabels } from './MonthsLabels.js';
import { QuaterLabels } from './QuaterLabels.js';

export interface GanttChartColumnLabelProps {
  width: number;
  height: number;
  totalDuration: number;
  contractDuration: DateRange;
}

export const GanttChartColumnLabel = (props: GanttChartColumnLabelProps) => {
  const { width, height, totalDuration, contractDuration } = props;
  const classes = useStyles();
  const segmentWidth = width / totalDuration;
  const style: CSSProperties = {
    width: width,
    height: height
  };

  return (
    <div className={classes.columnLabel} style={style} data-component-name="GanttChartColumnLabel">
      {segmentWidth > 20 ? (
        <DayLabels segmentWidth={segmentWidth} height={height} contractDuration={contractDuration} />
      ) : null}
      {segmentWidth > 1.2 && segmentWidth <= 20 ? (
        <MonthsLabels segmentWidth={segmentWidth} height={height} contractDuration={contractDuration} />
      ) : null}
      {segmentWidth <= 1.2 ? (
        <QuaterLabels segmentWidth={segmentWidth} height={height} contractDuration={contractDuration} />
      ) : null}
    </div>
  );
};

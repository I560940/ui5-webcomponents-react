import React from 'react';
import type { TimeUnit } from '../../types/GanttChartTypes.js';
export interface MonthsDaysLabelProps {
  segmentWidth: number;
  height: number;
  months: TimeUnit[];
}
export declare const MonthsDaysLabel: (props: MonthsDaysLabelProps) => React.JSX.Element;

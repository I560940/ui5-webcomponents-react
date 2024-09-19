import React from 'react';
import type { TimeUnit } from '../../types/GanttChartTypes.js';
export interface YearsMonthsLabelProps {
  segmentWidth: number;
  height: number;
  years: TimeUnit[];
  months: TimeUnit[];
}
export declare const YearsMonthsLabel: (props: YearsMonthsLabelProps) => React.JSX.Element;

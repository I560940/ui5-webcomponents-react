import React from 'react';
import type { DateRange } from '../types/GanttChartTypes.js';
export interface MonthLabelsProps {
  height: number;
  segmentWidth: number;
  contractDuration: DateRange;
}
export declare const MonthLabels: (props: MonthLabelsProps) => React.JSX.Element;

import React from 'react';
import type { DateRange } from '../types/GanttChartTypes.js';
export interface DayLabelsProps {
  height: number;
  segmentWidth: number;
  contractDuration: DateRange;
}
export declare const DayLabels: (props: DayLabelsProps) => React.JSX.Element;

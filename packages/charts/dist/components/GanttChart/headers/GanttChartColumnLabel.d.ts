import React from 'react';
import type { DateRange } from '../types/GanttChartTypes.js';
export interface GanttChartColumnLabelProps {
  width: number;
  height: number;
  totalDuration: number;
  contractDuration: DateRange;
}
export declare const GanttChartColumnLabel: (props: GanttChartColumnLabelProps) => React.JSX.Element;

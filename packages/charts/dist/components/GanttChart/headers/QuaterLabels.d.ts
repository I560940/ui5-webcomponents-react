import React from 'react';
import type { DateRange } from '../types/GanttChartTypes.js';
export interface QuaterLabelsProps {
  height: number;
  segmentWidth: number;
  contractDuration: DateRange;
}
export declare const QuaterLabels: (props: QuaterLabelsProps) => React.JSX.Element;

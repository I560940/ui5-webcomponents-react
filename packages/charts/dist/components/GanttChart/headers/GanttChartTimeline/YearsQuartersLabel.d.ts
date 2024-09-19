import React from 'react';
import type { TimeUnit } from '../../types/GanttChartTypes.js';
export interface YearsQuartersLabelProps {
  segmentWidth: number;
  height: number;
  years: TimeUnit[];
  quarters: TimeUnit[];
}
export declare const YearsQuartersLabel: (props: YearsQuartersLabelProps) => React.JSX.Element;

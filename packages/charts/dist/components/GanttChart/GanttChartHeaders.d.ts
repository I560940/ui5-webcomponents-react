import React from 'react';
import type { IGanttChartRow } from './types/GanttChartTypes.js';
interface GanttChartRowLabelsProps {
  width: number;
  height: number;
  rowHeight: number;
  dataset: IGanttChartRow[];
}
declare const GanttChartRowLabels: ({
  width,
  height,
  rowHeight,
  dataset
}: GanttChartRowLabelsProps) => React.JSX.Element;
interface GanttChartColumnLabelProps {
  width: number;
  height: number;
  isDiscrete: boolean;
  totalDuration: number;
  unit: string;
  columnLabels?: string[];
  start: number;
  unscaledWidth: number;
  valueFormat?: (value: number) => string;
}
declare const GanttChartColumnLabel: ({
  width,
  height,
  isDiscrete,
  totalDuration,
  columnLabels,
  start,
  unscaledWidth,
  valueFormat
}: GanttChartColumnLabelProps) => React.JSX.Element;
interface GanttChartRowTitleProps {
  width: number;
  height: number;
  rowTitle: string;
}
declare const GanttChartRowTitle: ({ width, height, rowTitle }: GanttChartRowTitleProps) => React.JSX.Element;
export { GanttChartColumnLabel, GanttChartRowTitle, GanttChartRowLabels };

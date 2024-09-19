import type { ReactNode } from 'react';
import React from 'react';
import type { DateRange, IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
export interface GanttChartBodyProps {
  dataset: IGanttChartRow[];
  width?: number;
  height?: number;
  rowHeight: number;
  numOfItems: number;
  totalDuration: number;
  contractDuration: DateRange;
  annotations?: ReactNode | ReactNode[];
  onTaskClick?: (task: Record<string, any>, event: React.MouseEvent) => void;
  showAnnotation?: boolean;
  showVerticalLineOnHover?: boolean;
  showStaticVerticalLine?: boolean;
  staticVerticalLinePosition?: number;
  unscaledWidth?: number;
  openRowIndex: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
}
declare const GanttChartBody: (props: GanttChartBodyProps) => React.JSX.Element;
export { GanttChartBody };

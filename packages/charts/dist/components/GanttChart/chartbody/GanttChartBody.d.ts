import type { ReactNode } from 'react';
import React from 'react';
import type { DateRange, IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
interface GanttChartBodyProps {
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
  showConnection?: boolean;
  showVerticalLineOnHover?: boolean;
  showStaticVerticalLine?: boolean;
  staticVerticalLinePosition?: number;
  start: number;
  unscaledWidth?: number;
  valueFormat?: (value: number) => string;
  openRowIndex: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
  updateCurrentChartBodyWidth: (newWidth: number) => void;
}
declare const GanttChartBody: (props: GanttChartBodyProps) => React.JSX.Element;
export { GanttChartBody };

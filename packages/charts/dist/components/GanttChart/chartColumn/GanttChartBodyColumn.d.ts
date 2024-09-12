import type { ReactNode } from 'react';
import React from 'react';
import type {
  DateRange,
  DimensionsState,
  IGanttChartRow,
  OpenRowIndex,
  OpenSubRowIndexes
} from '../types/GanttChartTypes.js';
export interface GanttChartBodyColumnProps {
  dataset: IGanttChartRow[];
  dimensions: DimensionsState;
  chartBodyScale: number;
  height: number;
  rowHeight: number;
  numOfRows: number;
  totalDuration: number;
  contractDuration: DateRange;
  start: number;
  showAnnotation?: boolean;
  showVerticalLineOnHover?: boolean;
  showStaticVerticalLine?: boolean;
  showStatus?: boolean;
  staticVerticalLinePosition?: number;
  valueFormat?: (value: number) => string;
  annotations?: ReactNode | ReactNode[];
  openRowIndex: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
  updateCurrentChartBodyWidth: (newWidth: number) => void;
  onTaskClick?: (task: Record<string, any>, event: React.MouseEvent) => void;
}
export declare const GanttChartBodyColumn: (props: GanttChartBodyColumnProps) => React.JSX.Element;

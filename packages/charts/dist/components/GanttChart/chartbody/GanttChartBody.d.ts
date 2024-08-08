import type { ReactNode } from 'react';
import type { IGanttChartRow } from '../types/GanttChartTypes.js';
interface GanttChartBodyProps {
  dataset: IGanttChartRow[];
  width?: number;
  height?: number;
  rowHeight: number;
  numOfItems: number;
  totalDuration: number;
  isDiscrete: boolean;
  annotations?: ReactNode | ReactNode[];
  showAnnotation?: boolean;
  showConnection?: boolean;
  showTooltip?: boolean;
  unit: string;
  start: number;
  unscaledWidth?: number;
  onScale: (x: number) => void;
  valueFormat?: (value: number) => string;
  resetScroll: () => void;
}
declare const GanttChartBody: {
  ({
    dataset,
    width,
    rowHeight,
    numOfItems,
    totalDuration,
    isDiscrete,
    annotations,
    showAnnotation,
    showConnection,
    showTooltip,
    unit,
    start,
    unscaledWidth,
    onScale,
    valueFormat,
    resetScroll
  }: GanttChartBodyProps): import('react/jsx-runtime').JSX.Element;
  displayName: string;
};
export { GanttChartBody };

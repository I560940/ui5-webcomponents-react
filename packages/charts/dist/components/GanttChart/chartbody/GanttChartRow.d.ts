import React from 'react';
import type { IGanttChartRow } from '../types/GanttChartTypes.js';
interface GanttChartRowGroupProps {
  dataset: IGanttChartRow[];
  rowHeight: number;
  totalDuration: number;
  GanttStart: number;
  showTooltip: (...x: unknown[]) => void;
  hideTooltip: () => void;
  postRender: () => void;
}
declare const GanttChartRowGroup: {
  ({
    dataset,
    rowHeight,
    totalDuration,
    GanttStart,
    showTooltip,
    hideTooltip,
    postRender
  }: GanttChartRowGroupProps): React.JSX.Element;
  displayName: string;
};
export { GanttChartRowGroup };

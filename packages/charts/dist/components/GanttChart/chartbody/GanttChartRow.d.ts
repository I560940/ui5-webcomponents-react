import type { IGanttChartRow } from '../types/GanttChartTypes.js';
interface GanttChartRowGroupProps {
  dataset: IGanttChartRow[];
  rowHeight: number;
  totalDuration: number;
  timelineStart: number;
  showTooltip: (...x: unknown[]) => void;
  hideTooltip: () => void;
  postRender: () => void;
}
declare const GanttChartRowGroup: {
  ({
    dataset,
    rowHeight,
    totalDuration,
    timelineStart,
    showTooltip,
    hideTooltip,
    postRender
  }: GanttChartRowGroupProps): import('react/jsx-runtime').JSX.Element;
  displayName: string;
};
export { GanttChartRowGroup };

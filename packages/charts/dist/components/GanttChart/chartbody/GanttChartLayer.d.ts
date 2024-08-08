import type { ReactNode } from 'react';
interface GanttChartLayerProps {
  ignoreClick?: boolean;
  children?: ReactNode | ReactNode[];
  isAnnotation?: boolean;
  name?: string;
}
/**
 * The GanttChartLayer represents each layer of the chart rendering. This
 * is used to seperate the chart into different rendering concerns. One layer
 * can be used to render the grid lines and another can be used to render
 * annotations or tasks.
 */
declare const GanttChartLayer: {
  ({ ignoreClick, isAnnotation, children, name }: GanttChartLayerProps): import('react/jsx-runtime').JSX.Element;
  displayName: string;
};
export { GanttChartLayer };

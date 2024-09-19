import type { CommonProps } from '@ui5/webcomponents-react';
import type { ReactNode } from 'react';
import React from 'react';
import type { DateRange, IGanttChartRow } from './types/GanttChartTypes.js';
export interface GanttChartProps extends CommonProps {
  dataset?: IGanttChartRow[];
  contractDuration: DateRange;
  rowHeight?: number;
  annotations?: ReactNode | ReactNode[];
  onTaskClick?: (task: Record<string, any>, event: React.MouseEvent) => void;
  showAnnotation?: boolean;
  showStatus?: boolean;
  showVerticalLineOnHover?: boolean;
  showStaticVerticalLine?: boolean;
  staticVerticalLinePosition?: number;
}
declare const GanttChart: React.ForwardRefExoticComponent<GanttChartProps & React.RefAttributes<HTMLDivElement>>;
export { GanttChart };

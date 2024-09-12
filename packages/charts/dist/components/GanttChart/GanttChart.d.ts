import type { CommonProps } from '@ui5/webcomponents-react';
import type { CSSProperties, ReactNode } from 'react';
import React from 'react';
import type { DateRange, IGanttChartRow } from './types/GanttChartTypes.js';
export interface GanttChartProps extends CommonProps {
  dataset?: IGanttChartRow[];
  contractDuration: DateRange;
  width?: CSSProperties['width'];
  rowHeight?: number;
  annotations?: ReactNode | ReactNode[];
  onTaskClick?: (task: Record<string, any>, event: React.MouseEvent) => void;
  showAnnotation?: boolean;
  showConnection?: boolean;
  showStatus?: boolean;
  showVerticalLineOnHover?: boolean;
  showStaticVerticalLine?: boolean;
  staticVerticalLinePosition?: number;
  start?: number;
  valueFormat?: (value: number) => string;
}
declare const GanttChart: React.ForwardRefExoticComponent<GanttChartProps & React.RefAttributes<HTMLDivElement>>;
export { GanttChart };

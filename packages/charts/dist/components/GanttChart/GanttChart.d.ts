import type { CommonProps } from '@ui5/webcomponents-react';
import type { ReactNode } from 'react';
import React from 'react';
import type { DateRange, IGanttChartRow, IGanttChartEvent } from './types/GanttChartTypes.js';
export interface GanttChartProps extends CommonProps {
    dataset?: IGanttChartRow[];
    contractDuration: DateRange;
    rowHeight?: number;
    annotations?: ReactNode | ReactNode[];
    onTaskClick?: (task: Record<string, any>, event: React.MouseEvent) => void;
    onEventClick: (events: IGanttChartEvent[], e: React.MouseEvent) => void;
    onLegendClick?: (event: React.MouseEvent) => void;
    showAnnotation?: boolean;
    showStatus?: boolean;
    showVerticalLineOnHover?: boolean;
    showStaticVerticalLine?: boolean;
    staticVerticalLinePosition?: string;
}
declare const GanttChart: React.ForwardRefExoticComponent<GanttChartProps & React.RefAttributes<HTMLDivElement>>;
export { GanttChart };

import type { ReactNode } from 'react';
import React from 'react';
import type { DateRange, IGanttChartRow, OpenRowIndex, OpenSubRowIndexes, IGanttChartEvent } from '../types/GanttChartTypes.js';
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
    onEventClick: (events: IGanttChartEvent[], e: React.MouseEvent) => void;
    showAnnotation?: boolean;
    showVerticalLineOnHover?: boolean;
    showStaticVerticalLine?: boolean;
    staticVerticalLinePosition?: string;
    unscaledWidth?: number;
    openRowIndex: OpenRowIndex;
    openSubRowIndexes: OpenSubRowIndexes;
    chartBodyScale: number;
}
declare const GanttChartBody: (props: GanttChartBodyProps) => React.JSX.Element;
export { GanttChartBody };

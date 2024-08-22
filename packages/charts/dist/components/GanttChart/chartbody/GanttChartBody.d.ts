import type { ReactNode } from 'react';
import React from 'react';
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
    showVerticalLineOnHover?: boolean;
    showStaticVerticalLine?: boolean;
    staticVerticalLinePosition?: number;
    showTooltip?: boolean;
    showTaskTooltip?: boolean;
    renderTaskTooltip?: (task: Record<string, any>, onClose: () => void) => ReactNode;
    unit: string;
    start: number;
    unscaledWidth?: number;
    valueFormat?: (value: number) => string;
}
declare const GanttChartBody: ({ dataset, width, rowHeight, numOfItems, totalDuration, isDiscrete, annotations, showAnnotation, showTooltip, showVerticalLineOnHover, showStaticVerticalLine, staticVerticalLinePosition, showTaskTooltip, renderTaskTooltip, unit, start, unscaledWidth, valueFormat }: GanttChartBodyProps) => React.JSX.Element;
export { GanttChartBody };

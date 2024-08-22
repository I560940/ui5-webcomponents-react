import React from 'react';
import type { IGanttChartRow } from '../../types/GanttChartTypes.js';
interface GanttChartRowGroupProps {
    dataset: IGanttChartRow[];
    rowHeight: number;
    totalDuration: number;
    GanttStart: number;
    showTooltip: (...x: unknown[]) => void;
    hideTooltip: () => void;
    handleTaskClick: (task: Record<string, any>) => void;
}
export declare const GanttChartRowGroup: {
    ({ dataset, rowHeight, totalDuration, GanttStart, showTooltip, hideTooltip, handleTaskClick }: GanttChartRowGroupProps): React.JSX.Element;
    displayName: string;
};
export {};

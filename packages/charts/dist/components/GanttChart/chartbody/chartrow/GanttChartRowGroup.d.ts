import React from 'react';
import type { IGanttChartRow } from '../../types/GanttChartTypes.js';
interface GanttChartRowGroupProps {
    dataset: IGanttChartRow[];
    rowHeight: number;
    totalDuration: number;
    GanttStart: number;
    showTooltip: (...x: unknown[]) => void;
    handleTaskClick: (task: Record<string, any>, event: React.MouseEvent) => void;
    hideTooltip: () => void;
}
export declare const GanttChartRowGroup: {
    ({ dataset, rowHeight, totalDuration, GanttStart, showTooltip, hideTooltip, handleTaskClick }: GanttChartRowGroupProps): React.JSX.Element;
    displayName: string;
};
export {};

import React from 'react';
import type { DateRange, IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
export interface GanttChartRowGroupProps {
    dataset: IGanttChartRow[];
    rowHeight: number;
    totalDuration: number;
    contractDuration: DateRange;
    GanttStart: number;
    showTooltip: (...x: unknown[]) => void;
    handleTaskClick: (task: Record<string, any>, event: React.MouseEvent) => void;
    hideTooltip: () => void;
    openRowIndex: OpenRowIndex;
    openSubRowIndexes: OpenSubRowIndexes;
}
export declare const GanttChartRowGroup: {
    (props: GanttChartRowGroupProps): React.JSX.Element;
    displayName: string;
};

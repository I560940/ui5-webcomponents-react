import React from 'react';
interface GanttChartEventProps {
    date: string;
    icon: string;
    startTime: number;
    GanttStart: number;
    totalDuration: number;
    iconSize?: number;
    shiftIconPx?: number;
}
export declare const GanttChartEvent: ({ icon, startTime, GanttStart, totalDuration, iconSize, shiftIconPx }: GanttChartEventProps) => React.JSX.Element;
export {};

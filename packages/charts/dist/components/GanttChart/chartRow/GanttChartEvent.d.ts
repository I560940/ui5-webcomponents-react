import React from 'react';
interface GanttChartEventProps {
    date: string;
    icon: string;
    startTime: number;
    GanttStart: number;
    totalDuration: number;
    iconSize?: number;
    shiftIconPx?: number;
    iconColor?: string;
}
export declare const GanttChartEvent: ({ icon, startTime, GanttStart, totalDuration, iconSize, shiftIconPx, iconColor }: GanttChartEventProps) => React.JSX.Element;
export {};

import React from 'react';
interface GanttChartEventProps {
    date: string;
    icon: string;
    startTime: number;
    GanttStart: number;
    totalDuration: number;
}
export declare const GanttChartEvent: ({ icon, startTime, GanttStart, totalDuration }: GanttChartEventProps) => React.JSX.Element;
export {};

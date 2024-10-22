import React from 'react';
import type { IGanttChartEvent } from '../types/GanttChartTypes.js';
interface GanttChartEventProps {
    date?: string;
    icon?: string;
    iconSize?: number;
    shiftIconPx?: number;
    iconColor?: string;
    events: IGanttChartEvent[];
    position: number;
    handleEventsClick: (events: IGanttChartEvent[], e: React.MouseEvent) => void;
}
export declare const GanttChartEvent: ({ iconSize, shiftIconPx, events, position, handleEventsClick }: GanttChartEventProps) => React.JSX.Element;
export {};

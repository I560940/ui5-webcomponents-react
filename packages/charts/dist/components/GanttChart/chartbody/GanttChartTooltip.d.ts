import React from 'react';
export interface GanttTooltipHandle {
  onHoverItem: (
    mouseX: number,
    mouseY: number,
    label: string,
    startTime: number,
    duration: number,
    color: string,
    isMilestone: boolean
  ) => void;
  onLeaveItem: () => void;
}
interface GanttTooltipChartProps {
  valueFormat?: (value: number) => string;
}
export declare const GanttChartTooltip: React.ForwardRefExoticComponent<
  GanttTooltipChartProps & React.RefAttributes<GanttTooltipHandle>
>;
export {};

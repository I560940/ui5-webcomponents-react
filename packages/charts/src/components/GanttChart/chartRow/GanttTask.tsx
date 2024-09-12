import { throttle } from '@ui5/webcomponents-react-base';
import type { CSSProperties } from 'react';
import React, { useState } from 'react';
import { HOVER_OPACITY, NORMAL_OPACITY, THROTTLE_INTERVAL } from '../util/constants.js';

interface GanttTaskProps {
  /**
   * The unique id of the task. This is used to get the position
   * in the DOM and draw any connection arrows pointing to or away
   * from it.
   */
  id?: string;

  /**
   * The task item label. If not set, the label of the row is used.
   */
  label?: string;

  /**
   * The starting time of the task on the Gantt. Can
   * also be seen as the x-offset of the task. It is a
   * percentage of the total rendered duration of the
   * Gantt.
   */
  startTime: number;

  /**
   * Duration of the task.
   */
  duration: number;

  /**
   * The total duration of the Gantt. This helps in knowing
   * where to position the milestone.
   */
  totalDuration: number;

  color: CSSProperties['color'];

  GanttStart: number;

  showTooltip: (
    mouseX: number,
    mouseY: number,
    name: string,
    startTime: number,
    duration: number,
    color: string,
    isMilestone: boolean
  ) => void;

  /**
   * Callback function to handle the click event on the task.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleTaskClick: (task: Record<string, any>, event: React.MouseEvent) => void;

  hideTooltip: () => void;
}

export const GanttTask = ({
  id,
  label,
  startTime,
  duration,
  totalDuration,
  color,
  GanttStart,
  showTooltip,
  hideTooltip,
  handleTaskClick
}: GanttTaskProps) => {
  const [opacity, setOpacity] = useState(NORMAL_OPACITY);
  const onMouseLeave = (evt: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    evt.stopPropagation();
    hideTooltip();
    setOpacity(NORMAL_OPACITY);
  };

  const mouseMoveHandler = (evt: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    evt.stopPropagation();
    setOpacity(HOVER_OPACITY);
    showTooltip(evt.clientX, evt.clientY, label, startTime, duration, color, false);
  };

  const onMouseMove = throttle(mouseMoveHandler, THROTTLE_INTERVAL, { trailing: false });

  const handleClick = (event: React.MouseEvent) => {
    handleTaskClick({ id, label, startTime, duration, color }, event);
  };

  // The 10% y value is to create a little gap between the top grid line and the
  // rendered GanttTask itself. The height is set to 80% to allow for an
  // equal gap at the bottom with the bottom grid line.
  return (
    <rect
      data-component-name="GanttChartTask"
      id={id}
      x={`${((startTime - GanttStart) / totalDuration) * 100}%`}
      y="10%"
      width={`${(duration / totalDuration) * 100}%`}
      height="80%"
      rx="4"
      ry="4"
      style={{ fill: color, pointerEvents: 'auto', cursor: 'pointer', opacity: opacity }}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onClick={handleClick}
    />
  );
};

GanttTask.displayName = 'GanttTask';

import { throttle } from '@ui5/webcomponents-react-base';
import type { CSSProperties } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { HOVER_OPACITY, NORMAL_OPACITY, THROTTLE_INTERVAL } from '../util/constants.js';

interface GanttMilestoneProps {
  /**
   * The unique id of the milestone. This is used to get the position
   * in the DOM and draw any connection arrows pointing to or away
   * from it.
   */
  id?: string;

  /**
   * The milestone label. If not set, the label is just 'Milestone'.
   */
  label?: string;

  /**
   * The position of a milestone on the Gantt. Can
   * also be seen as the x-offset of the milestone. It is a
   * percentage of the total rendered duration of the
   * Gantt.
   */
  time: number;

  /**
   * The total duration of the Gantt. This helps in knowing
   * where to position the milestone.
   */
  totalDuration: number;

  color?: CSSProperties['color'];

  GanttStart: number;

  showTooltip: (
    mouseX: number,
    mouseY: number,
    label: string,
    startTime: number,
    duration: number,
    color: string,
    isMilestone: boolean
  ) => void;

  hideTooltip: () => void;
}

export const GanttMilestone = ({
  id,
  label = 'Milestone',
  time,
  totalDuration,
  color = '#007D00',
  GanttStart,
  showTooltip,
  hideTooltip
}: GanttMilestoneProps) => {
  const milestoneRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const milestone = milestoneRef.current;

    // Replace the zero-width Rect with a Rhombus.
    // Draw a rhombus shape with the length of the diagonals equal
    // to the height of the initial rect. A square is drawn first
    // then that square is translated to the left and downwards so
    // that the center aligns with the initial x position and the
    // center of the row. Then it is rotated 45° about that its center.
    const { height: rhombusDiagonal } = milestone.getBoundingClientRect();
    const rhombusSideLength = Math.sqrt(Math.pow(rhombusDiagonal, 2) / 2);
    milestone.setAttribute('width', rhombusSideLength.toString());
    milestone.setAttribute('height', rhombusSideLength.toString());
    milestone.setAttribute(
      'transform',
      `translate(
        ${-rhombusSideLength / 2}, 
        ${(rhombusDiagonal - rhombusSideLength) / 2}) 
      rotate(45, ${rhombusSideLength / 2}, 
        ${rhombusSideLength / 2}
      )`
    );
  }, []);

  const [opacity, setOpacity] = useState(NORMAL_OPACITY);

  const onMouseLeave = (evt: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    evt.stopPropagation();
    hideTooltip();
    setOpacity(NORMAL_OPACITY);
  };

  const mouseMoveHandler = (evt: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    evt.stopPropagation();
    setOpacity(HOVER_OPACITY);
    showTooltip(evt.clientX, evt.clientY, label, time, 0, color, true);
  };

  const onMouseMove = throttle(mouseMoveHandler, THROTTLE_INTERVAL, { trailing: false });

  // The 10% y value is to create a little gap between the top grid line and the
  // rendered Milestone itself. The height is set to 80% to allow for an
  // equal gap at the bottom with the bottom grid line.
  return (
    <svg
      data-component-name="GanttChartMilestone"
      x={`${((time - GanttStart) / totalDuration) * 100}%`}
      y="10%"
      height="80%"
      overflow="visible"
    >
      <rect // Zero-width rect. 1px width is used as a place-holder. Height is used to draw a rhombus after component is mounted.
        id={id}
        ref={milestoneRef}
        width="1"
        height="100%"
        rx="3"
        ry="3"
        style={{ fill: color, pointerEvents: 'auto', cursor: 'pointer', opacity: opacity }}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
      />
    </svg>
  );
};

GanttMilestone.displayName = 'GanttMilestone';

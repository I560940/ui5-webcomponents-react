import { throttle } from '@ui5/webcomponents-react-base';
import React, { useEffect, useRef, useState } from 'react';
import type { IGanttChartTask } from '../types/GanttChartTypes.js';
import { HOVER_OPACITY, NORMAL_OPACITY, THROTTLE_INTERVAL } from '../util/constants.js';

interface GanttTaskProps {
  /**
   * The unique id of the task. This is used to get the position
   * in the DOM and draw any connection arrows pointing to or away
   * from it.
   */
  id?: string;

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
  handleTaskClick: (parentId: string, task: IGanttChartTask, event: React.MouseEvent) => void;

  hideTooltip: () => void;

  task: IGanttChartTask;

  parentId: string;
}

export const GanttTask = ({
  id,
  startTime,
  duration,
  totalDuration,
  GanttStart,
  showTooltip,
  hideTooltip,
  handleTaskClick,
  task,
  parentId
}: GanttTaskProps) => {
  const [opacity, setOpacity] = useState(NORMAL_OPACITY);
  const rectRef = useRef<SVGRectElement>(null);
  const [shouldRectBeVisible, setShouldRectBeVisible] = useState(false);
  const EVENT_ICON_SIZE = 16;

  useEffect(() => {
    const rectElement = rectRef.current;
    if (!rectElement) return;

    const updateRectVisibility = () => {
      const width = rectElement.getBBox().width;
      if (width - 2 > EVENT_ICON_SIZE) {
        setShouldRectBeVisible(true);
      } else {
        setShouldRectBeVisible(false);
      }
    };

    updateRectVisibility(); // Initial check

    const resizeObserver = new ResizeObserver(() => {
      updateRectVisibility();
    });

    resizeObserver.observe(rectElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [rectRef]);

  const onMouseLeave = (evt: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    evt.stopPropagation();
    hideTooltip();
    setOpacity(NORMAL_OPACITY);
  };

  const mouseMoveHandler = (evt: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    evt.stopPropagation();
    setOpacity(HOVER_OPACITY);
    showTooltip(evt.clientX, evt.clientY, task.status && '', startTime, duration, task.color, false);
  };

  const onMouseMove = throttle(mouseMoveHandler, THROTTLE_INTERVAL, { trailing: false });

  const handleClickEvent = (event: React.MouseEvent) => {
    handleTaskClick(parentId, task, event);
  };

  // The 10% y value is to create a little gap between the top grid line and the
  // rendered GanttTask itself. The height is set to 80% to allow for an
  // equal gap at the bottom with the bottom grid line.
  if (!totalDuration) {
    return null;
  }

  return (
    <g>
      <rect
        ref={rectRef}
        data-component-name="GanttChartTaskRect"
        id={id}
        x={`${((startTime + 1 - GanttStart) / totalDuration) * 100}%`}
        y="10%"
        width={`${(duration / totalDuration) * 100}%`}
        height="70%"
        rx="4"
        ry="4"
        style={{
          fill: shouldRectBeVisible ? task.color : 'none',
          pointerEvents: 'auto',
          cursor: 'pointer',
          opacity: opacity,
          stroke: shouldRectBeVisible ? '#788FA6' : 'none',
          strokeWidth: 1.5,
          zIndex: 1
        }}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        onClick={handleClickEvent}
      >
        {task.tooltipText && <title>{task.tooltipText}</title>}
      </rect>
    </g>
  );
};

GanttTask.displayName = 'GanttTask';

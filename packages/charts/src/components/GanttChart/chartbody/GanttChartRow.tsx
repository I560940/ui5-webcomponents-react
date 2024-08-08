import { throttle } from '@ui5/webcomponents-react-base';
import type { CSSProperties } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import type { IGanttChartRow } from '../types/GanttChartTypes.js';
import { HOVER_OPACITY, NORMAL_OPACITY, THROTTLE_INTERVAL } from '../util/constants.js';

interface GanttChartRowProps {
  rowData: IGanttChartRow;
  rowHeight: number;
  rowIndex: number;
  totalDuration: number;
  GanttStart: number;
  showTooltip: (...x: unknown[]) => void;
  hideTooltip: () => void;
}

/**
 * This represents each row of the GanttChart. It is used to display
 * the task items and milestones.
 */
const GanttChartRow = ({
  rowData,
  rowHeight,
  rowIndex,
  totalDuration,
  GanttStart,
  showTooltip,
  hideTooltip
}: GanttChartRowProps) => {
  rowData.color = rowData.color ?? `var(--sapChart_OrderedColor_${(rowIndex % 11) + 1})`;

  return (
    <svg
      x="0"
      y={`${rowIndex * rowHeight}`}
      width="100%"
      height={`${rowHeight}`}
      style={{ pointerEvents: 'none' }}
      data-component-name="GanttChartRow"
    >
      {rowData.tasks?.map((task, index) => {
        return (
          <GanttTask
            key={index}
            id={task.id}
            label={task.label ?? rowData.label}
            startTime={task.start}
            duration={task.duration}
            totalDuration={totalDuration}
            color={task.color ?? rowData.color}
            GanttStart={GanttStart}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
          />
        );
      })}
      {rowData.milestones?.map((mStone, index) => {
        return (
          <GanttMilestone
            key={index}
            id={mStone.id}
            label={mStone.label}
            time={mStone.start}
            color={mStone.color}
            totalDuration={totalDuration}
            GanttStart={GanttStart}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
          />
        );
      })}
    </svg>
  );
};

GanttChartRow.displayName = 'GanttChartRow';

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

  hideTooltip: () => void;
}

const GanttTask = ({
  id,
  label,
  startTime,
  duration,
  totalDuration,
  color,
  GanttStart,
  showTooltip,
  hideTooltip
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
    />
  );
};

GanttTask.displayName = 'GanttTask';

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

const GanttMilestone = ({
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

interface GanttChartRowGroupProps {
  dataset: IGanttChartRow[];
  rowHeight: number;
  totalDuration: number;
  GanttStart: number;
  showTooltip: (...x: unknown[]) => void;
  hideTooltip: () => void;
  postRender: () => void;
}
const GanttChartRowGroup = ({
  dataset,
  rowHeight,
  totalDuration,
  GanttStart,
  showTooltip,
  hideTooltip,
  postRender
}: GanttChartRowGroupProps) => {
  useEffect(() => {
    postRender();
  }, []);

  return (
    <svg width="100%" height="100%">
      {dataset.map((data, index) => {
        return (
          <GanttChartRow
            key={index}
            rowData={data}
            rowHeight={rowHeight}
            rowIndex={index}
            totalDuration={totalDuration}
            GanttStart={GanttStart}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
          />
        );
      })}
    </svg>
  );
};

GanttChartRowGroup.displayName = 'GanttChartRowGroup';

export { GanttChartRowGroup };

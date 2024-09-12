import type { CSSProperties } from 'react';
export interface IGanttChartRow {
  tasks?: IGanttChartTask[];
  milestones?: IGanttChartMileStone[];
  label: string;
  rowNumber?: number;
  color?: CSSProperties['color'];
  status?: string;
  details?: IGanttChartRow[];
  subDetails?: IGanttChartRow[];
}
/**
 * This is the data representing each task on the row.
 */
export interface IGanttChartTask {
  /**
   * A unique id for identifying the task or milestone in the Gantt.
   * This id must be provided if this task or milestone is connected to
   * another task or milestone because it will be used to render the
   * connection arrow between the two tasks. Without it, no arrow will
   * be drawn.
   */
  id?: string;
  /**
   * The start time of the task or milestone. This is used to determine the
   * proportional starting point of the task or milestone on the Gantt.
   */
  start: number;
  /**
   * The duration of the task. This is used to determine the proportional
   * ending point of the task on the Gantt.
   */
  duration: number;
  /**
   * The label of the task in the row. If not provided, the label of the
   * `IGanttChartRow` is used.
   */
  label?: string;
  /**
   * The color of the task in the row. If not provided, the color
   * of the `IGanttChartRow` is used. Any valid CSS color will do.
   */
  color?: CSSProperties['color'];
  /**
   * A list of relationships between the task and other tasks on
   * the Gantt.
   */
  connections?: IGanttChartConn[];
}
/**
 * The data representing the connection between two tasks on the Gantt.
 * The tasks can be on the same row or on different rows.
 */
export interface IGanttChartConn {
  /**
   * The type of connection between a task and another task whose Id is
   * specified by `itemId`.
   */
  type?: GanttChartConnection;
  /**
   * The id of the task to be connected to. If the id does not exist, no
   * connection is made.
   */
  itemId: string;
}
export interface DateRange {
  dateStart: string;
  dateEnd: string;
}
export declare enum GanttChartConnection {
  Finish_To_Start = 'F2S',
  Start_To_Finish = 'S2F',
  Start_To_Start = 'S2S',
  Finish_To_Finish = 'F2F'
}
export type IGanttChartMileStone = Omit<IGanttChartTask, 'duration'>;
export type OpenRowIndex = number | null;
export type OpenSubRowIndexes = {
  [key: string]: boolean;
};
export type DimensionsState = {
  width: number;
  height: number;
  chartWidth: number;
  chartHeight: number;
  currentChartWidth: number;
};
export type ColumnDataType = 'label' | 'status';

import type { CommonProps } from '@ui5/webcomponents-react';
import type { CSSProperties, ReactNode } from 'react';
import React from 'react';
import type { IGanttChartRow } from './types/GanttChartTypes.js';
interface GanttChartProps extends CommonProps {
    /**
     * The data is an array of objects that is displayed on the chart.
     */
    dataset?: IGanttChartRow[];
    /**
     * The total duration of the Gantt.
     */
    totalDuration?: number;
    /**
     * The total width of the chart. If not supplied, the chart's
     * width expands to fill its conatainer.
     */
    width?: CSSProperties['width'];
    /**
     * The height the row of the Gantt.
     */
    rowHeight?: number;
    /**
     * Whether the Gantt is a continuous Gantt or broken
     * into discrete sections.
     */
    isDiscrete?: boolean;
    /**
     * Defines the annonations to be applied on top on the chart.
     *
     * **Note:** Use the `GanttChartAnnotation` component here.
     */
    annotations?: ReactNode | ReactNode[];
    /**
     * A callback function that is applied when a task is clicked.
     */
    onTaskClick?: (task: Record<string, any>, event: React.MouseEvent) => void;
    /**
     * Toggles the visibility of the annotations applied to the chart.
     */
    showAnnotation?: boolean;
    /**
     * Toggles the visibility of the connections of the task and milestone
     * items in the chart.
     */
    showConnection?: boolean;
    /**
     * Toggles the visibility of the status column in the chart.
     */
    showStatus?: boolean;
    /**
     * Toggles the visibility of the line that appears when hovering over
     * the chart.
     */
    showVerticalLineOnHover?: boolean;
    /**
     * Toggles the visibility of the static vertical line in the chart.
     */
    showStaticVerticalLine?: boolean;
    /**
     * The position of the static vertical line in the
     */
    staticVerticalLinePosition?: number;
    /**
     * Toggles the visibility of the tooltip.
     */
    hideTooltip?: boolean;
    /**
     * The unit of the duration of the Gantt.
     */
    unit?: string;
    /**
     * The label for the activity axis.
     */
    rowTitle?: string;
    /**
     * The label for the title of the duration axis.
     */
    columnTitle?: string;
    /**
     * The label for the columns if the chart is separated into discrete columns
     * based on if `isDiscrete` is true. If set, the length of this array
     * __must__ be equal to the `totalDuration`. If not set, an
     * array of numbers with size equal to the `totalDuration` and with values
     * starting from the value __start__ prop of the `GanttChart` will be used.
     */
    discreteLabels?: string[];
    /**
     * The starting value of the Gantt duration.
     */
    start?: number;
    /**
     * A callback function that is applied to each value in the tick and tootltip
     * to format how it is displayed.
     */
    valueFormat?: (value: number) => string;
}
/**
 * > __Experimental Component!__ <br />
 * > This component is experimental and not subject to semantic versioning.
 * > Therefore, you could face breaking changes when updating versions.
 * > Please use with caution!
 *
 * A `GanttChart` is a data visualization chart that can be used to represent
 * Gantt charts or any other Gantt-based visualizations. The component has a
 * rich set of various properties that allows the user to:
 * * Zoom the chart body to see the visualizations clearer using the mouse wheel.
 * * Pan the zoomed chart horizonatally by holding down the left click button.
 * * Add annotations to highlight or illustrate different points on the Gantt.
 * * Use annotations to create custom Gantt visualizations.
 * * Choose whether the Gantt is discrete or continous.
 * * Show relationships between different items on the Gantt using different
 * connections.
 */
declare const GanttChart: React.ForwardRefExoticComponent<GanttChartProps & React.RefAttributes<HTMLDivElement>>;
export { GanttChart };

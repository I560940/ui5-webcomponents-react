import type { CSSProperties } from 'react';
import React from 'react';
import type { IChartBaseProps } from '../../interfaces/IChartBaseProps.js';
import type { IChartDimension } from '../../interfaces/IChartDimension.js';
import type { IChartMeasure } from '../../interfaces/IChartMeasure.js';
interface MeasureConfig extends IChartMeasure {
    /**
     * width of the current chart element, defaults to `1` for `lines` and `20` for bars
     */
    width?: number;
    /**
     * Opacity
     * @default 1
     */
    opacity?: number;
    /**
     * Chart type
     */
    type: AvailableChartTypes;
    /**
     * Highlight color of defined elements
     * @param value {string | number} Current value of the highlighted measure
     * @param measure {IChartMeasure} Current measure object
     * @param dataElement {object} Current data element
     */
    highlightColor?: (value: number, measure: MeasureConfig, dataElement: Record<string, any>) => CSSProperties['color'];
}
interface DimensionConfig extends IChartDimension {
    interval?: number;
}
export interface BulletChartProps extends IChartBaseProps {
    /**
     * An array of config objects. Each object will define one dimension of the chart.
     *
     * **Required Properties**
     * - `accessor`: string containing the path to the dataset key the dimension should display. Supports object structures by using <code>'parent.child'</code>.
     *   Can also be a getter.
     *
     * **Optional Properties**
     * - `formatter`: function will be called for each data label and allows you to format it according to your needs
     * - `interval`: number that controls how many ticks are rendered on the x axis
     *
     */
    dimensions: DimensionConfig[];
    /**
     * An array of config objects. Each object is defining one element in the chart.
     *
     * **Required properties**
     * - `accessor`: string containing the path to the dataset key this element should display. Supports object structures by using <code>'parent.child'</code>.
     *   Can also be a getter.
     * - `type`: string which chart element (value type) to show. Possible values: `primary`, `comparison`, `additional`.
     *
     * **Optional properties**
     *
     * - `label`: Label to display in legends or tooltips. Falls back to the <code>accessor</code> if not present.
     * - `color`: any valid CSS Color or CSS Variable. Defaults to the `sapChart_Ordinal` colors
     * - `formatter`: function will be called for each data label and allows you to format it according to your needs
     * - `hideDataLabel`: flag whether the data labels should be hidden in the chart for this element.
     * - `DataLabel`: a custom component to be used for the data label
     * - `width`: width of the current chart element, defaults to `1` for `lines` and `20` for bars
     * - `opacity`: element opacity, defaults to `1`
     * - `highlightColor`: function will be called to define a custom color of a specific element which matches the
     *    defined condition. Overwrites code>color</code> of the element.
     *
     */
    measures: MeasureConfig[];
    /**
     * layout for showing measures. `horizontal` bars would equal the column chart, `vertical` would be a bar chart.
     * Default Value: `horizontal`
     */
    layout?: 'horizontal' | 'vertical';
}
type AvailableChartTypes = 'primary' | 'comparison' | 'additional' | string;
/**
 * The `BulletChart` is used to compare primary and secondary (comparison) values. The primary and additional values
 * are rendered as a stacked Bar Chart while the comparison value is displayed as a line above.
 */
declare const BulletChart: React.ForwardRefExoticComponent<BulletChartProps & React.RefAttributes<HTMLDivElement>>;
export { BulletChart };

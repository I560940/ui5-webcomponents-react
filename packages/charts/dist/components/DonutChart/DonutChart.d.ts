import React from 'react';
import type { PieChartProps } from '../PieChart/PieChart.js';
/**
 * A `DonutChart` is a type of graph that displays data in a circular graph with a cut-out hole in the middle.
 * The pieces of the graph are proportional to the fraction of the whole in each category.
 * A `DonutChart` is basically a `PieChart` with a hole.
 */
declare const DonutChart: React.ForwardRefExoticComponent<PieChartProps & React.RefAttributes<HTMLDivElement>>;
export { DonutChart };

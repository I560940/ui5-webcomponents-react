import { jsx as _jsx } from 'react/jsx-runtime';
import { useStylesheet } from '@ui5/webcomponents-react-base';
import { forwardRef } from 'react';
import { DEFAULT_ROW_HEIGHT } from './util/constants.js';
import { classNames, styleData } from './util/GanttChart.module.css.js';
/**
 * This is designed to be used for creating custom annotations, markers
 * or illustrations on the timeline of the chart.
 */
const GanttChartAnnotation = forwardRef((props, ref) => {
  const { width = 'auto', height, rowIndex = 0, rowHeight = DEFAULT_ROW_HEIGHT, figure, ...rest } = props;
  useStylesheet(styleData, GanttChartAnnotation.displayName);
  const style = {
    width: width,
    height: height != null ? height : rowHeight,
    insetBlockStart: `${rowIndex * rowHeight}px`
  };
  return _jsx('div', {
    ref: ref,
    className: classNames.annotation,
    ...rest,
    style: style,
    'data-component-name': 'GanttChartAnnotation',
    children: figure
  });
});
GanttChartAnnotation.displayName = 'GanttChartAnnotation';
export { GanttChartAnnotation };

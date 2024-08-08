import { jsx as _jsx } from 'react/jsx-runtime';
import { useStylesheet } from '@ui5/webcomponents-react-base';
import { classNames, styleData } from '../util/GanttChart.module.css.js';
/**
 * The GanttChartLayer represents each layer of the chart rendering. This
 * is used to seperate the chart into different rendering concerns. One layer
 * can be used to render the grid lines and another can be used to render
 * annotations or tasks.
 */
const GanttChartLayer = ({ ignoreClick = false, isAnnotation, children, name }) => {
  useStylesheet(styleData, GanttChartLayer.displayName);
  const position = 'absolute';
  const pointerEvents = ignoreClick ? 'none' : 'auto';
  if (isAnnotation) {
    return _jsx('div', {
      'data-component-name': name,
      className: classNames.layer,
      style: { position: position, pointerEvents: pointerEvents },
      children: children
    });
  }
  return _jsx('svg', {
    'data-component-name': name,
    width: '100%',
    height: '100%',
    style: { position: position, pointerEvents: pointerEvents },
    children: children
  });
};
GanttChartLayer.displayName = 'GanttChartLayer';
export { GanttChartLayer };

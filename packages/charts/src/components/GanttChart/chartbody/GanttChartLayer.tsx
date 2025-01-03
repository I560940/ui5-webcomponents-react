import type { ReactNode } from 'react';
import React from 'react';
import { useStyles } from '../util/styles.js';

interface GanttChartLayerProps {
  ignoreClick?: boolean;
  children?: ReactNode | ReactNode[];
  isAnnotation?: boolean;
  name?: string;
}

/**
 * The GanttChartLayer represents each layer of the chart rendering. This
 * is used to seperate the chart into different rendering concerns. One layer
 * can be used to render the grid lines and another can be used to render
 * annotations or tasks.
 */
const GanttChartLayer = ({ ignoreClick = false, isAnnotation, children, name }: GanttChartLayerProps) => {
  const classes = useStyles();
  const position = 'absolute';
  const pointerEvents = ignoreClick ? 'none' : 'auto';

  if (isAnnotation) {
    return (
      <div
        data-component-name={name}
        className={classes.layer}
        style={{ position: position, pointerEvents: pointerEvents }}
      >
        {children}
      </div>
    );
  }
  return (
    <svg
      data-component-name={name}
      width="100%"
      height="100%"
      style={{ position: position, pointerEvents: pointerEvents, overflow: 'visible' }}
    >
      {children}
    </svg>
  );
};

export { GanttChartLayer };

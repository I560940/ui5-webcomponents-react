import React, { useEffect, useRef, useState } from 'react';
import { GanttChartRowGroup } from '../chartRow/GanttChartRowGroup.js';
import { ROW_CONTRACT_DURATION_HEIGHT } from '../util/constants.js';
import { GanttChartBodyCtx } from '../util/context.js';
import { useStyles } from '../util/styles.js';
import { GanttChartHoverVerticalLine } from './GanttChartHoverVerticalLine.js';
import { GanttChartLayer } from './GanttChartLayer.js';
import { GanttChartStaticVerticalLine } from './GanttChartStaticVerticalLine.js';
import { GanttChartTooltip } from './GanttChartTooltip.js';
const GanttChartBody = (props) => {
  const {
    dataset,
    width,
    rowHeight,
    numOfItems,
    totalDuration,
    contractDuration,
    onTaskClick,
    annotations,
    showAnnotation,
    showVerticalLineOnHover,
    showStaticVerticalLine,
    staticVerticalLinePosition,
    start,
    valueFormat,
    openRowIndex,
    openSubRowIndexes,
    updateCurrentChartBodyWidth
  } = props;
  const classes = useStyles();
  const tooltipRef = useRef(null);
  const bodyRef = useRef(null);
  const [verticalLinePosition, setVerticalLinePosition] = useState(null);
  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        updateCurrentChartBodyWidth(newWidth);
      }
    });
    if (bodyRef.current) {
      ro.observe(bodyRef.current);
    }
    return () => {
      if (bodyRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ro.unobserve(bodyRef.current);
      }
    };
  }, [updateCurrentChartBodyWidth]);
  const style = {
    width: `${width}px`,
    height: `${numOfItems * rowHeight + ROW_CONTRACT_DURATION_HEIGHT}px`
  };
  const showTooltipOnHover = (mouseX, mouseY, label, startTime, duration, color, isMilestone) => {
    tooltipRef.current?.onHoverItem(mouseX, mouseY, label, startTime, duration, color, isMilestone);
  };
  const hideTooltip = () => tooltipRef.current?.onLeaveItem();
  const onMouseMove = (e) => {
    const rect = bodyRef.current.getBoundingClientRect();
    if (rect) {
      setVerticalLinePosition(e.clientX - rect.left);
    }
  };
  const onMouseLeave = () => {
    setVerticalLinePosition(null);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTaskClick = (task, event) => {
    onTaskClick?.(task, event);
  };
  return React.createElement(
    'div',
    {
      'data-component-name': 'GanttChartBody',
      ref: bodyRef,
      className: classes.chartBody,
      style: style,
      onMouseMove: onMouseMove,
      onMouseLeave: onMouseLeave
    },
    React.createElement(GanttChartLayer, { name: 'GanttChartGridLayer', ignoreClick: true }),
    React.createElement(
      GanttChartLayer,
      { name: 'GanttChartRowsLayer', ignoreClick: true },
      React.createElement(GanttChartRowGroup, {
        dataset: dataset,
        rowHeight: rowHeight,
        totalDuration: totalDuration,
        contractDuration: contractDuration,
        GanttStart: start,
        showTooltip: showTooltipOnHover,
        hideTooltip: hideTooltip,
        handleTaskClick: handleTaskClick,
        openRowIndex: openRowIndex,
        openSubRowIndexes: openSubRowIndexes
      })
    ),
    showAnnotation && annotations != null
      ? React.createElement(
          GanttChartLayer,
          { name: 'GanttChartAnnotationLayer', isAnnotation: true, ignoreClick: true },
          React.createElement(GanttChartBodyCtx.Provider, { value: { chartBodyWidth: width } }, annotations)
        )
      : null,
    false ? React.createElement(GanttChartTooltip, { ref: tooltipRef, valueFormat: valueFormat }) : null,
    showVerticalLineOnHover &&
      verticalLinePosition &&
      React.createElement(GanttChartHoverVerticalLine, { verticalLinePosition: verticalLinePosition }),
    showStaticVerticalLine &&
      React.createElement(GanttChartStaticVerticalLine, { verticalLinePosition: staticVerticalLinePosition })
  );
};
export { GanttChartBody };

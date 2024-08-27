import React, { useRef } from 'react';
import { GanttChartBodyCtx } from '../util/context.js';
import { useStyles } from '../util/styles.js';
import { GanttChartRowGroup } from './chartrow/GanttChartRowGroup.js';
import { GanttChartGrid } from './GanttChartGrid.js';
import { GanttChartHoverVerticalLine } from './GanttChartHoverVerticalLine.js';
import { GanttChartLayer } from './GanttChartLayer.js';
import { GanttChartStaticVerticalLine } from './GanttChartStaticVerticalLine.js';
import { GanttChartTooltip } from './GanttChartTooltip.js';
const GanttChartBody = ({ dataset, width, rowHeight, numOfItems, totalDuration, isDiscrete, onTaskClick, annotations, showAnnotation, showTooltip, showVerticalLineOnHover, showStaticVerticalLine, staticVerticalLinePosition, showTaskTooltip, renderTaskTooltip, unit, start, unscaledWidth, 
// onScale,
valueFormat
// resetScroll
 }) => {
    const classes = useStyles();
    const tooltipRef = useRef(null);
    const bodyRef = useRef(null);
    // const scaleExpRef = useRef(0);
    const [verticalLinePosition, setVerticalLinePosition] = React.useState(null);
    const [selectedTask, setSelectedTask] = React.useState(null);
    const style = {
        width: `${width}px`,
        height: `${numOfItems * rowHeight}px`
    };
    const showTooltipOnHover = (mouseX, mouseY, label, startTime, duration, color, isMilestone) => {
        tooltipRef.current?.onHoverItem(mouseX, mouseY, label, startTime, duration, color, isMilestone);
    };
    const hideTooltip = () => tooltipRef.current?.onLeaveItem();
    // const onMouseWheelEvent = (evt: WheelEvent) => {
    //   evt.preventDefault();
    //   if (evt.deltaY < 0) {
    //     // Only scale up if scaled width will not exceed MAX_BODY_WIDTH
    //     const msrWidth = bodyRef.current.getBoundingClientRect().width;
    //     if (msrWidth * SCALE_FACTOR < MAX_BODY_WIDTH) {
    //       scaleExpRef.current++;
    //     }
    //   } else {
    //     // Only scale down if scaled width will not be less than original
    //     // width
    //     if (scaleExpRef.current > 0) {
    //       resetScroll();
    //       scaleExpRef.current--;
    //     }
    //   }
    //   onScale(Math.pow(SCALE_FACTOR, scaleExpRef.current));
    // };
    const onMouseMove = (e) => {
        const rect = bodyRef.current.getBoundingClientRect();
        if (rect) {
            setVerticalLinePosition(e.clientX - rect.left);
        }
    };
    const onMouseLeave = () => {
        setVerticalLinePosition(null);
    };
    const handleTaskClick = (task) => {
        onTaskClick?.(task);
        if (showTaskTooltip) {
            setSelectedTask(task);
        }
    };
    const handleCloseTaskPopup = () => {
        setSelectedTask(null);
    };
    return (React.createElement("div", { "data-component-name": "GanttChartBody", ref: bodyRef, className: classes.chartBody, style: style, onMouseMove: onMouseMove, onMouseLeave: onMouseLeave },
        React.createElement(GanttChartLayer, { name: "GanttChartGridLayer", ignoreClick: true },
            React.createElement(GanttChartGrid, { isDiscrete: isDiscrete, numOfRows: numOfItems, totalDuration: totalDuration, rowHeight: rowHeight, width: width, unscaledWidth: unscaledWidth })),
        React.createElement(GanttChartLayer, { name: "GanttChartRowsLayer", ignoreClick: true },
            React.createElement(GanttChartRowGroup, { dataset: dataset, rowHeight: rowHeight, totalDuration: totalDuration, GanttStart: start, showTooltip: showTooltipOnHover, hideTooltip: hideTooltip, handleTaskClick: handleTaskClick })),
        showAnnotation && annotations != null ? (React.createElement(GanttChartLayer, { name: "GanttChartAnnotationLayer", isAnnotation: true, ignoreClick: true },
            React.createElement(GanttChartBodyCtx.Provider, { value: { chartBodyWidth: width } }, annotations))) : null,
        showTooltip ? React.createElement(GanttChartTooltip, { ref: tooltipRef, unit: unit, valueFormat: valueFormat }) : null,
        verticalLinePosition && showVerticalLineOnHover && (React.createElement(GanttChartHoverVerticalLine, { verticalLinePosition: verticalLinePosition })),
        showStaticVerticalLine && React.createElement(GanttChartStaticVerticalLine, { verticalLinePosition: staticVerticalLinePosition }),
        selectedTask && renderTaskTooltip && renderTaskTooltip(selectedTask, handleCloseTaskPopup)));
};
export { GanttChartBody };

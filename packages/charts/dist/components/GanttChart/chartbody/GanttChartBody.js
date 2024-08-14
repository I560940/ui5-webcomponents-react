import React, { useRef } from 'react';
import { GanttChartBodyCtx } from '../util/context.js';
import { useStyles } from '../util/styles.js';
import { GanttChartGrid } from './GanttChartGrid.js';
import { GanttChartLayer } from './GanttChartLayer.js';
import { GanttChartRowGroup } from './GanttChartRow.js';
import { GanttChartTooltip } from './GanttChartTooltip.js';
const GanttChartBody = ({ dataset, width, rowHeight, numOfItems, totalDuration, isDiscrete, annotations, showAnnotation, showTooltip, unit, start, unscaledWidth, 
// onScale,
valueFormat
// resetScroll
 }) => {
    const classes = useStyles();
    const tooltipRef = useRef(null);
    const bodyRef = useRef(null);
    // const scaleExpRef = useRef(0);
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
    return (React.createElement("div", { "data-component-name": "GanttChartBody", ref: bodyRef, className: classes.chartBody, style: style },
        React.createElement(GanttChartLayer, { name: "GanttChartGridLayer", ignoreClick: true },
            React.createElement(GanttChartGrid, { isDiscrete: isDiscrete, numOfRows: numOfItems, totalDuration: totalDuration, rowHeight: rowHeight, width: width, unscaledWidth: unscaledWidth })),
        React.createElement(GanttChartLayer, { name: "GanttChartRowsLayer", ignoreClick: true },
            React.createElement(GanttChartRowGroup, { dataset: dataset, rowHeight: rowHeight, totalDuration: totalDuration, GanttStart: start, showTooltip: showTooltipOnHover, hideTooltip: hideTooltip })),
        showAnnotation && annotations != null ? (React.createElement(GanttChartLayer, { name: "GanttChartAnnotationLayer", isAnnotation: true, ignoreClick: true },
            React.createElement(GanttChartBodyCtx.Provider, { value: { chartBodyWidth: width } }, annotations))) : null,
        showTooltip ? React.createElement(GanttChartTooltip, { ref: tooltipRef, unit: unit, valueFormat: valueFormat }) : null));
};
export { GanttChartBody };

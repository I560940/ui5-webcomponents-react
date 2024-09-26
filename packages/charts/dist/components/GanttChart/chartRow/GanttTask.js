import { throttle } from '@ui5/webcomponents-react-base';
import React, { useState } from 'react';
import { HOVER_OPACITY, NORMAL_OPACITY, THROTTLE_INTERVAL } from '../util/constants.js';
import { getEventStartTime } from '../util/utils.js';
import { GanttChartEvent } from './GanttChartEvent.js';
export const GanttTask = ({ id, label, startTime, duration, totalDuration, color, GanttStart, showTooltip, hideTooltip, handleTaskClick, events, contractStartDate }) => {
    const [opacity, setOpacity] = useState(NORMAL_OPACITY);
    const onMouseLeave = (evt) => {
        evt.stopPropagation();
        hideTooltip();
        setOpacity(NORMAL_OPACITY);
    };
    const mouseMoveHandler = (evt) => {
        evt.stopPropagation();
        setOpacity(HOVER_OPACITY);
        showTooltip(evt.clientX, evt.clientY, label, startTime, duration, color, false);
    };
    const onMouseMove = throttle(mouseMoveHandler, THROTTLE_INTERVAL, { trailing: false });
    const handleClick = (event) => {
        handleTaskClick({ id, label, startTime, duration, color }, event);
    };
    // The 10% y value is to create a little gap between the top grid line and the
    // rendered GanttTask itself. The height is set to 80% to allow for an
    // equal gap at the bottom with the bottom grid line.
    if (!totalDuration) {
        return null;
    }
    return (React.createElement("g", null,
        React.createElement("rect", { "data-component-name": "GanttChartTaskRect", id: id, x: `${((startTime + 1 - GanttStart) / totalDuration) * 100}%`, y: "10%", width: `${(duration / totalDuration) * 100}%`, height: "70%", rx: "4", ry: "4", style: {
                fill: color,
                pointerEvents: 'auto',
                cursor: 'pointer',
                opacity: opacity,
                stroke: '#788FA6',
                strokeWidth: 1.5
            }, onMouseLeave: onMouseLeave, onMouseMove: onMouseMove, onClick: handleClick }),
        events.map((event) => (React.createElement(GanttChartEvent, { date: event.date, icon: event.icon, startTime: getEventStartTime(contractStartDate, event.date), GanttStart: GanttStart, totalDuration: totalDuration })))));
};
GanttTask.displayName = 'GanttTask';

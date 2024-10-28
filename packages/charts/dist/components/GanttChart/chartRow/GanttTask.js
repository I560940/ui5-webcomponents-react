import { throttle } from '@ui5/webcomponents-react-base';
import React, { useEffect, useRef, useState } from 'react';
import { HOVER_OPACITY, NORMAL_OPACITY, THROTTLE_INTERVAL } from '../util/constants.js';
import { getStartTime, groupOverlappingEvents } from '../util/utils.js';
import { GanttChartEvent } from './GanttChartEvent.js';
export const GanttTask = ({ id, startTime, duration, totalDuration, GanttStart, showTooltip, hideTooltip, handleTaskClick, contractStartDate, ganttChartBodyWidth, chartBodyScale, handleEventsClick, task, parentId, shouldEventsBeGrouped }) => {
    const [opacity, setOpacity] = useState(NORMAL_OPACITY);
    const rectRef = useRef(null);
    const [shouldRectBeVisible, setShouldRectBeVisible] = useState(false);
    const [eventIconShift, setEventIconShift] = useState(0);
    const [groupedEvents, setGroupedEvents] = useState([]);
    const EVENT_ICON_SIZE = 16;
    useEffect(() => {
        const rectElement = rectRef.current;
        if (!rectElement)
            return;
        const updateRectVisibility = () => {
            const width = rectElement.getBBox().width;
            if (width - 2 > EVENT_ICON_SIZE) {
                setShouldRectBeVisible(true);
                setEventIconShift(0);
            }
            else {
                setShouldRectBeVisible(false);
                setEventIconShift(Math.abs(width - EVENT_ICON_SIZE - 1));
            }
        };
        updateRectVisibility(); // Initial check
        const resizeObserver = new ResizeObserver(() => {
            updateRectVisibility();
        });
        resizeObserver.observe(rectElement);
        return () => {
            resizeObserver.disconnect();
        };
    }, [rectRef]);
    useEffect(() => {
        setGroupedEvents(shouldEventsBeGrouped
            ? groupOverlappingEvents(task.events, contractStartDate, startTime, totalDuration, chartBodyScale, ganttChartBodyWidth, EVENT_ICON_SIZE)
            : []);
    }, [
        task.events,
        contractStartDate,
        startTime,
        totalDuration,
        chartBodyScale,
        ganttChartBodyWidth,
        shouldEventsBeGrouped
    ]);
    const onMouseLeave = (evt) => {
        evt.stopPropagation();
        hideTooltip();
        setOpacity(NORMAL_OPACITY);
    };
    const mouseMoveHandler = (evt) => {
        evt.stopPropagation();
        setOpacity(HOVER_OPACITY);
        showTooltip(evt.clientX, evt.clientY, task.status && '', startTime, duration, task.color, false);
    };
    const onMouseMove = throttle(mouseMoveHandler, THROTTLE_INTERVAL, { trailing: false });
    const handleClickEvent = (event) => {
        handleTaskClick(parentId, task, event);
    };
    // The 10% y value is to create a little gap between the top grid line and the
    // rendered GanttTask itself. The height is set to 80% to allow for an
    // equal gap at the bottom with the bottom grid line.
    if (!totalDuration) {
        return null;
    }
    return (React.createElement("g", null,
        React.createElement("rect", { ref: rectRef, "data-component-name": "GanttChartTaskRect", id: id, x: `${((startTime + 1 - GanttStart) / totalDuration) * 100}%`, y: "10%", width: `${(duration / totalDuration) * 100}%`, height: "70%", rx: "4", ry: "4", style: {
                fill: shouldRectBeVisible ? task.color : 'none',
                pointerEvents: 'auto',
                cursor: 'pointer',
                opacity: opacity,
                stroke: shouldRectBeVisible ? '#788FA6' : 'none',
                strokeWidth: 1.5,
                zIndex: 1
            }, onMouseLeave: onMouseLeave, onMouseMove: onMouseMove, onClick: handleClickEvent }),
        shouldEventsBeGrouped
            ? groupedEvents.map((group) => (React.createElement(GanttChartEvent, { key: group.key + 'event', events: group.events, iconSize: EVENT_ICON_SIZE, shiftIconPx: eventIconShift, position: group.positionPx, handleEventsClick: handleEventsClick })))
            : task.events.map((event) => (React.createElement(GanttChartEvent, { key: event.id, events: [event], iconSize: EVENT_ICON_SIZE, shiftIconPx: eventIconShift, position: `${((getStartTime(contractStartDate, event.date) + 1.2 - GanttStart) / totalDuration) * 100}%`, handleEventsClick: handleEventsClick })))));
};
GanttTask.displayName = 'GanttTask';

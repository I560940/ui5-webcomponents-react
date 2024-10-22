import { Icon } from '@ui5/webcomponents-react';
import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';
export const GanttChartEvent = ({ iconSize = 16, shiftIconPx = 0, events = [], position, handleEventsClick }) => {
    const handleEventClickEvent = (e) => {
        e.stopPropagation();
        handleEventsClick(events, e);
    };
    return (React.createElement("foreignObject", { x: position, width: iconSize, height: "100%", transform: `translate(${-shiftIconPx}, 0)`, style: { overflow: 'visible', pointerEvents: 'none' } },
        React.createElement("div", { style: {
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                zIndex: 2,
                pointerEvents: 'auto',
                cursor: 'pointer'
            }, onClick: handleEventClickEvent },
            React.createElement(Icon, { name: events[0].icon, style: { width: iconSize, color: events[0].color } }),
            events.length > 1 && (React.createElement("span", { style: {
                    position: 'absolute',
                    top: 10,
                    right: 0,
                    backgroundColor: ThemingParameters.sapBrandColor,
                    color: 'white',
                    borderRadius: '50%',
                    width: '12px',
                    height: '12px',
                    fontSize: '10px',
                    display: 'flex',
                    alignItems: 'end',
                    justifyContent: 'center'
                } }, events.length)))));
};

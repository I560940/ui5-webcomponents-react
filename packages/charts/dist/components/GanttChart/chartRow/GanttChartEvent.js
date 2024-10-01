import { Icon } from '@ui5/webcomponents-react';
import React from 'react';
export const GanttChartEvent = ({ icon, startTime, GanttStart, totalDuration, iconSize = 16, shiftIconPx = 0 }) => {
    return (React.createElement("foreignObject", { x: `${((startTime + 1.2 - GanttStart) / totalDuration) * 100}%`, width: iconSize, height: "100%", transform: `translate(${-shiftIconPx}, 0)` },
        React.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                zIndex: 2
            } },
            React.createElement(Icon, { name: icon, style: { width: iconSize } }))));
};

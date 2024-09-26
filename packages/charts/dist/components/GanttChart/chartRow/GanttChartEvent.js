import { Icon } from '@ui5/webcomponents-react';
import React from 'react';
export const GanttChartEvent = ({ icon, startTime, GanttStart, totalDuration }) => {
    return (React.createElement("foreignObject", { x: `${((startTime + 1 - GanttStart) / totalDuration) * 100}%`, width: `10%`, height: "100%" },
        React.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
                height: '100%'
            } },
            React.createElement(Icon, { name: icon }))));
};

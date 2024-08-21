import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';
/**
 * Component that renders a vertical line in the Gantt chart. This line is meant to be used as a hover line.
 */
const GanttChartHoverVerticalLine = ({ verticalLinePosition }) => {
    return (React.createElement("div", { style: {
            position: 'absolute',
            left: verticalLinePosition,
            top: 0,
            width: 1,
            height: '100%',
            backgroundColor: ThemingParameters.sapSelectedColor,
            pointerEvents: 'none'
        } }));
};
export { GanttChartHoverVerticalLine };

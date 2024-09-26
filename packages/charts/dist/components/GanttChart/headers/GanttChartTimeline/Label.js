import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';
export const Label = (props) => {
    const { x1, x2, y1, y2, x, y, dy, children } = props;
    return (React.createElement(React.Fragment, null,
        React.createElement("line", { x1: x1, x2: x2, y1: y1, y2: y2, stroke: ThemingParameters.sapList_BorderColor, strokeWidth: "1" }),
        React.createElement("text", { x: x, y: y, dy: dy, fill: ThemingParameters.sapTextColor, textAnchor: "middle" }, children)));
};

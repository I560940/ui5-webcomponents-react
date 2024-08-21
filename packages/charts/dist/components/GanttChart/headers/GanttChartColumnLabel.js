import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React, { useEffect, useState } from 'react';
import { DEFAULT_CHART_VERTICAL_COLS, SPACING, TICK_LENGTH, TOLERANCE } from '../util/constants.js';
import { useStyles } from '../util/styles.js';
export const GanttChartColumnLabel = ({ width, height, isDiscrete, totalDuration, columnLabels, start, unscaledWidth, valueFormat }) => {
    const classes = useStyles();
    const [labelArray, setLabelArray] = useState([]);
    useEffect(() => {
        if (isDiscrete) {
            const newLabelArray = columnLabels
                ? columnLabels
                : Array.from(Array(totalDuration).keys()).map((num) => `${num + start}`);
            setLabelArray(newLabelArray);
        }
    }, [isDiscrete, columnLabels, start, totalDuration]);
    const style = {
        width: width,
        height: height
    };
    const halfHeaderHeight = 0.5 * height;
    const verticalSegmentWidth = unscaledWidth / DEFAULT_CHART_VERTICAL_COLS;
    return (React.createElement("div", { className: classes.columnLabel, style: style, "data-component-name": "GanttChartColumnLabel" },
        React.createElement("div", { className: classes.columnTitlePlaceHolder, style: {
                height: `${halfHeaderHeight}px`,
                lineHeight: `${halfHeaderHeight}px`
            } }),
        isDiscrete ? (React.createElement("div", { className: classes.columnLabelItems, style: {
                height: `${halfHeaderHeight}px`,
                gridTemplateColumns: `repeat(${totalDuration}, 1fr)`,
                lineHeight: `${halfHeaderHeight}px`
            } }, labelArray.map((label, index) => {
            return (React.createElement("span", { "data-component-name": "GanttChartColumnLabel", className: classes.onlyOutline, key: index, title: `${label}` }, label));
        }))) : (React.createElement("svg", { height: halfHeaderHeight, width: "100%", fontFamily: "Helvetica", fontSize: "9" },
            React.createElement(React.Fragment, null,
                React.createElement("g", { stroke: ThemingParameters.sapList_BorderColor, strokeWidth: "4" },
                    React.createElement("line", { x1: 0, x2: 0, y1: "100%", y2: halfHeaderHeight - TICK_LENGTH }),
                    React.createElement("line", { x1: "100%", x2: "100%", y1: "100%", y2: halfHeaderHeight - TICK_LENGTH })),
                React.createElement("g", { fill: ThemingParameters.sapTextColor },
                    React.createElement("text", { x: 0, dx: SPACING, y: halfHeaderHeight - TICK_LENGTH, dy: -SPACING }, valueFormat != null ? valueFormat(start) : start),
                    React.createElement("text", { x: "100%", dx: -SPACING, y: halfHeaderHeight - TICK_LENGTH, dy: -SPACING, textAnchor: "end" }, valueFormat != null ? valueFormat(start + totalDuration) : start + totalDuration)),
                generateIntermediateTicks(start, totalDuration, width, halfHeaderHeight, TICK_LENGTH, verticalSegmentWidth, SPACING, valueFormat))))));
};
const generateIntermediateTicks = (start, totalDuration, width, halfHeaderHeight, tickLength, verticalSegmentWidth, spacing, valueFormat) => {
    let covered = verticalSegmentWidth;
    let remaining = width;
    const lineArray = [];
    const textArray = [];
    if (verticalSegmentWidth <= 0)
        return null;
    while (remaining >= 2 * verticalSegmentWidth - TOLERANCE) {
        lineArray.push(React.createElement("line", { x1: covered, x2: covered, y1: "100%", y2: halfHeaderHeight - tickLength, stroke: ThemingParameters.sapList_BorderColor, strokeWidth: "2", key: `${covered}tickline` }));
        const val = (covered / width) * totalDuration;
        textArray.push(React.createElement("text", { x: covered, y: halfHeaderHeight - tickLength, dy: -spacing, fill: ThemingParameters.sapTextColor, textAnchor: "middle", key: `${covered}tickval` }, valueFormat != null ? valueFormat(start + val) : start + val));
        covered += verticalSegmentWidth;
        remaining -= verticalSegmentWidth;
    }
    return (React.createElement(React.Fragment, null,
        lineArray,
        textArray));
};

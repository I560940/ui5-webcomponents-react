import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';
import ContentLoader from 'react-content-loader';
export const ColumnChartPlaceholder = (props) => {
    return (
    // @ts-expect-error: TypeScript is going crazy
    React.createElement(ContentLoader, { viewBox: "0 0 165 145", preserveAspectRatio: "xMidYMid meet", width: "100%", height: "100%", speed: 2, backgroundColor: ThemingParameters.sapContent_ImagePlaceholderBackground, foregroundColor: ThemingParameters.sapContent_ImagePlaceholderForegroundColor, backgroundOpacity: ThemingParameters.sapContent_DisabledOpacity, ...props },
        React.createElement("rect", { x: "10", y: "135", width: "135", height: "1" }),
        React.createElement("rect", { x: "20", y: "50", width: "15", height: "85" }),
        React.createElement("rect", { x: "40", y: "18", width: "15", height: "117" }),
        React.createElement("rect", { x: "60", y: "68", width: "15", height: "67" }),
        React.createElement("rect", { x: "80", y: "60", width: "15", height: "75" }),
        React.createElement("rect", { x: "100", y: "10", width: "15", height: "125" }),
        React.createElement("rect", { x: "120", y: "75", width: "15", height: "60" })));
};

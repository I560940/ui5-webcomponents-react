import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';
import ContentLoader from 'react-content-loader';
export const PieChartPlaceholder = (props) => {
    return (
    // @ts-expect-error: TypeScript is going crazy
    React.createElement(ContentLoader, { viewBox: "0 0 165 145", preserveAspectRatio: "xMidYMid meet", width: "100%", height: "100%", speed: 2, backgroundColor: ThemingParameters.sapContent_ImagePlaceholderBackground, foregroundColor: ThemingParameters.sapContent_ImagePlaceholderForegroundColor, backgroundOpacity: ThemingParameters.sapContent_DisabledOpacity, ...props },
        React.createElement("circle", { cy: "75", cx: "85", r: "60" })));
};

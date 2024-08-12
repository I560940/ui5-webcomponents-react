import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';
import { DEFAULT_CHART_VERTICAL_COLS, TOLERANCE } from '../util/constants.js';
/**
 * This component represents the grid lines on the chart. The `isDiscrete` prop is
 * used to decided whether to render the vertical grid lines.
 */
const TimelineChartGrid = ({ isDiscrete, numOfRows, rowHeight, totalDuration, width, unscaledWidth }) => {
  const verticalSegmentWidth = unscaledWidth / DEFAULT_CHART_VERTICAL_COLS;
  return React.createElement(
    'g',
    { style: { stroke: ThemingParameters.sapList_BorderColor } },
    generateHGridLines(numOfRows, rowHeight),
    isDiscrete ? generateDiscreteVGridLines(totalDuration) : generateNonDiscreteVGridLines(width, verticalSegmentWidth)
  );
};
/**
 * This function generates the grid lines using the number of segments provided.
 * Each segment is calculated as a fraction of the overall height.
 * @param numOfSegments The number of rows the grid should have.
 * @param rowHeight The height of each row.
 * @returns An array of horizontal grid lines in SVG.
 */
const generateHGridLines = (numOfSegments, rowHeight) => {
  const gridLineArray = [];
  for (let i = 1; i < numOfSegments; i++) {
    const segmentOffset = rowHeight * i;
    gridLineArray.push(
      React.createElement('line', {
        x1: '0',
        y1: `${segmentOffset}`,
        x2: '100%',
        y2: `${segmentOffset}`,
        key: `${segmentOffset}gridh`,
        strokeWidth: '1px'
      })
    );
  }
  return gridLineArray;
};
/**
 * This function generates the grid lines using the number of segments provided.
 * Each segment is calculated as a fraction of the overall width.
 * @param numOfSegments The number of columns the grid should have.
 * @returns An array of vertical grid lines in SVG.
 */
const generateDiscreteVGridLines = (numOfSegments) => {
  const segmentSizePercent = 100 / numOfSegments;
  const gridLineArray = [];
  for (let i = 1; i < numOfSegments; i++) {
    const segmentOffset = segmentSizePercent * i;
    gridLineArray.push(
      React.createElement('line', {
        'data-component-name': 'TimelineChartGridv',
        x1: `${segmentOffset}%`,
        y1: '0',
        x2: `${segmentOffset}%`,
        y2: '100%',
        key: `${segmentOffset}gridv`
      })
    );
  }
  return gridLineArray;
};
/**
 * This function generates the grid lines using the verticalSegmentWidth provided.
 * Each segment is calculated to be greater than or exactly equal to the verticalSegmentWidth.
 * @param width The width of the chart body.
 * @param verticalSegmentWidth The calculated width each vertical segment should be originally.
 * @returns An array of vertical grid lines in SVG.
 */
const generateNonDiscreteVGridLines = (width, verticalSegmentWidth) => {
  const gridLineArray = [];
  let covered = verticalSegmentWidth;
  let remaining = width;
  if (verticalSegmentWidth <= 0) return null;
  while (remaining >= 2 * verticalSegmentWidth - TOLERANCE) {
    gridLineArray.push(
      React.createElement('line', {
        'data-component-name': 'TimelineChartGridv',
        x1: `${covered}`,
        y1: '0',
        x2: `${covered}`,
        y2: '100%',
        key: `${covered}gridv`
      })
    );
    covered += verticalSegmentWidth;
    remaining -= verticalSegmentWidth;
  }
  return gridLineArray;
};
export { TimelineChartGrid };

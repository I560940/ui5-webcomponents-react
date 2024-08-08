import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
import { ThemingParameters, useStylesheet } from '@ui5/webcomponents-react-base';
import { useEffect, useState } from 'react';
import { DEFAULT_CHART_VERTICAL_COLS, SPACING, TICK_LENGTH, TOLERANCE } from './util/constants.js';
import { classNames, styleData } from './util/GanttChart.module.css.js';
const GanttChartRowLabels = ({ width, height, rowHeight, dataset }) => {
  useStylesheet(styleData, GanttChartRowLabels.displayName);
  const rowLabels = dataset.map((data) => data.label);
  const style = {
    width: width,
    height: `${rowLabels.length * rowHeight}px`
  };
  const itemStyle = {
    height: `${rowHeight}px`,
    lineHeight: `${rowHeight}px`
  };
  return _jsx('div', {
    style: { height: height },
    children: _jsx('div', {
      className: classNames.rowLabels,
      style: style,
      children: rowLabels.map((label, index) => {
        return _jsx(
          'div',
          {
            className: classNames.rowLabelsItem,
            style: itemStyle,
            children: _jsx('span', { style: { paddingInline: '10px' }, title: `Item ${label}`, children: label })
          },
          index
        );
      })
    })
  });
};
GanttChartRowLabels.displayName = 'GanttChartRowLabels';
const GanttChartColumnLabel = ({
  width,
  height,
  isDiscrete,
  totalDuration,
  columnLabels,
  start,
  unscaledWidth,
  valueFormat
}) => {
  useStylesheet(styleData, GanttChartColumnLabel.displayName);
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
  return _jsxs('div', {
    className: classNames.columnLabel,
    style: style,
    'data-component-name': 'GanttChartColumnLabel',
    children: [
      _jsx('div', {
        className: classNames.columnTitlePlaceHolder,
        style: {
          height: `${halfHeaderHeight}px`,
          lineHeight: `${halfHeaderHeight}px`
        }
      }),
      isDiscrete
        ? _jsx('div', {
            className: classNames.columnLabelItems,
            style: {
              height: `${halfHeaderHeight}px`,
              gridTemplateColumns: `repeat(${totalDuration}, 1fr)`,
              lineHeight: `${halfHeaderHeight}px`
            },
            children: labelArray.map((label, index) => {
              return _jsx(
                'span',
                {
                  'data-component-name': 'GanttChartColumnLabel',
                  className: classNames.onlyOutline,
                  title: `${label}`,
                  children: label
                },
                index
              );
            })
          })
        : _jsx('svg', {
            height: halfHeaderHeight,
            width: '100%',
            fontFamily: 'Helvetica',
            fontSize: '9',
            children: _jsxs(_Fragment, {
              children: [
                _jsxs('g', {
                  stroke: ThemingParameters.sapList_BorderColor,
                  strokeWidth: '4',
                  children: [
                    _jsx('line', { x1: 0, x2: 0, y1: '100%', y2: halfHeaderHeight - TICK_LENGTH }),
                    _jsx('line', { x1: '100%', x2: '100%', y1: '100%', y2: halfHeaderHeight - TICK_LENGTH })
                  ]
                }),
                _jsxs('g', {
                  fill: ThemingParameters.sapTextColor,
                  children: [
                    _jsx('text', {
                      x: 0,
                      dx: SPACING,
                      y: halfHeaderHeight - TICK_LENGTH,
                      dy: -SPACING,
                      children: valueFormat != null ? valueFormat(start) : start
                    }),
                    _jsx('text', {
                      x: '100%',
                      dx: -SPACING,
                      y: halfHeaderHeight - TICK_LENGTH,
                      dy: -SPACING,
                      textAnchor: 'end',
                      children: valueFormat != null ? valueFormat(start + totalDuration) : start + totalDuration
                    })
                  ]
                }),
                generateIntermediateTicks(
                  start,
                  totalDuration,
                  width,
                  halfHeaderHeight,
                  TICK_LENGTH,
                  verticalSegmentWidth,
                  SPACING,
                  valueFormat
                )
              ]
            })
          })
    ]
  });
};
GanttChartColumnLabel.displayName = 'GanttChartColumnLabel';
const generateIntermediateTicks = (
  start,
  totalDuration,
  width,
  halfHeaderHeight,
  tickLength,
  verticalSegmentWidth,
  spacing,
  valueFormat
) => {
  let covered = verticalSegmentWidth;
  let remaining = width;
  const lineArray = [];
  const textArray = [];
  if (verticalSegmentWidth <= 0) return null;
  while (remaining >= 2 * verticalSegmentWidth - TOLERANCE) {
    lineArray.push(
      _jsx(
        'line',
        {
          x1: covered,
          x2: covered,
          y1: '100%',
          y2: halfHeaderHeight - tickLength,
          stroke: ThemingParameters.sapList_BorderColor,
          strokeWidth: '2'
        },
        `${covered}tickline`
      )
    );
    const val = (covered / width) * totalDuration;
    textArray.push(
      _jsx(
        'text',
        {
          x: covered,
          y: halfHeaderHeight - tickLength,
          dy: -spacing,
          fill: ThemingParameters.sapTextColor,
          textAnchor: 'middle',
          children: valueFormat != null ? valueFormat(start + val) : start + val
        },
        `${covered}tickval`
      )
    );
    covered += verticalSegmentWidth;
    remaining -= verticalSegmentWidth;
  }
  return _jsxs(_Fragment, { children: [lineArray, textArray] });
};
const GanttChartRowTitle = ({ width, height, rowTitle }) => {
  useStylesheet(styleData, GanttChartRowTitle.displayName);
  const style = {
    width: width,
    height: height,
    color: ThemingParameters.sapTitleColor
  };
  return _jsxs('div', {
    className: classNames.onlyOutline,
    style: style,
    children: [
      _jsx('div', { className: classNames.rowTitleTop }),
      _jsx('div', { className: classNames.rowTitleBottom, children: rowTitle })
    ]
  });
};
GanttChartRowTitle.displayName = 'GanttChartRowTitle';
export { GanttChartColumnLabel, GanttChartRowTitle, GanttChartRowLabels };

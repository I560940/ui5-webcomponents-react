import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';
import { FONT_SIZE } from '../util/constants.js';
import { quatersAsNumberOfDays, yearsAsNumberOfDays } from '../util/utils.js';
export const QuaterLabels = (props) => {
  const { height, segmentWidth, contractDuration } = props;
  const quatersArray = quatersAsNumberOfDays(contractDuration.dateStart, contractDuration.dateEnd);
  const yearsArray = yearsAsNumberOfDays(contractDuration.dateStart, contractDuration.dateEnd);
  return React.createElement(
    'svg',
    { height: height, width: '100%', fontFamily: 'Helvetica', fontSize: FONT_SIZE },
    yearsArray.reduce(
      (acc, el, index) => {
        const xPosition = acc.previousTotal + el.days;
        return {
          previousTotal: xPosition,
          lines: [
            ...acc.lines,
            React.createElement(
              React.Fragment,
              null,
              React.createElement('line', {
                key: index,
                x1: xPosition * segmentWidth,
                x2: xPosition * segmentWidth,
                y1: '0%',
                y2: '50%',
                stroke: ThemingParameters.sapList_BorderColor,
                strokeWidth: '1'
              }),
              React.createElement(
                'text',
                {
                  x: xPosition * segmentWidth - (segmentWidth * el.days) / 2,
                  y: '50%',
                  dy: -Math.ceil((height / 2 - FONT_SIZE) / 2),
                  fill: ThemingParameters.sapHighlightColor,
                  textAnchor: 'middle',
                  key: `label-${index}`
                },
                el.labelYear
              )
            )
          ]
        };
      },
      { previousTotal: 0, lines: [] }
    ).lines,
    quatersArray.reduce(
      (acc, el, index) => {
        const xPosition = acc.previousTotal + el.days;
        return {
          previousTotal: xPosition,
          lines: [
            ...acc.lines,
            React.createElement(
              React.Fragment,
              null,
              React.createElement('line', {
                key: index,
                x1: xPosition * segmentWidth,
                x2: xPosition * segmentWidth,
                y1: '50%',
                y2: '100%',
                stroke: ThemingParameters.sapList_BorderColor,
                strokeWidth: '1'
              }),
              React.createElement(
                'text',
                {
                  x: xPosition * segmentWidth - (segmentWidth * el.days) / 2,
                  y: '100%',
                  dy: -Math.ceil((height / 2 - FONT_SIZE) / 2),
                  fill: ThemingParameters.sapTextColor,
                  textAnchor: 'middle',
                  key: `label-${index}`
                },
                el.quarterLabel
              )
            )
          ]
        };
      },
      { previousTotal: 0, lines: [] }
    ).lines
  );
};

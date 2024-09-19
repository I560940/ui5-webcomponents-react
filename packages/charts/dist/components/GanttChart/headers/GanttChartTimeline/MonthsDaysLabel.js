import React from 'react';
import { FONT_SIZE, LABEL_Y_BOTTOM_HALF, LABEL_Y_MID_HALF, LABEL_Y_TOP_HALF } from '../../util/constants.js';
import { Label } from './Label.js';
export const MonthsDaysLabel = (props) => {
  const { segmentWidth, height, months } = props;
  if (!months) {
    return null;
  }
  return React.createElement(
    React.Fragment,
    null,
    months.reduce(
      (acc, el, index) => {
        const xPosition = acc.previousTotal + el.days;
        return {
          previousTotal: xPosition,
          lines: [
            ...acc.lines,
            React.createElement(
              Label,
              {
                key: index,
                x1: xPosition * segmentWidth,
                x2: xPosition * segmentWidth,
                y1: LABEL_Y_TOP_HALF,
                y2: LABEL_Y_MID_HALF,
                x: xPosition * segmentWidth - (segmentWidth * el.days) / 2,
                y: LABEL_Y_MID_HALF,
                dy: -Math.ceil((height / 2 - FONT_SIZE) / 2)
              },
              el.name,
              ' ',
              el.year
            )
          ]
        };
      },
      { previousTotal: 0, lines: [] }
    ).lines,
    months.reduce(
      (acc, month, monthIndex) => {
        const linesForDays = [...Array(month.days)].map((_, dayIndex) => {
          const dayNumber = dayIndex + 1;
          const xPosition = acc.previousTotal + dayNumber;
          return React.createElement(
            Label,
            {
              key: `${monthIndex}-${dayNumber}`,
              x1: xPosition * segmentWidth,
              x2: xPosition * segmentWidth,
              y1: LABEL_Y_MID_HALF,
              y2: LABEL_Y_BOTTOM_HALF,
              x: xPosition * segmentWidth - segmentWidth / 2,
              y: LABEL_Y_BOTTOM_HALF,
              dy: -Math.ceil((height / 2 - FONT_SIZE) / 2)
            },
            dayNumber
          );
        });
        return {
          previousTotal: acc.previousTotal + month.days,
          lines: [...acc.lines, ...linesForDays]
        };
      },
      { previousTotal: 0, lines: [] }
    ).lines
  );
};

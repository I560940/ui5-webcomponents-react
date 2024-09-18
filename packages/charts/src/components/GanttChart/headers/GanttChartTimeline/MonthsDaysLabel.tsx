import React from 'react';
import type { TimeUnit } from '../../types/GanttChartTypes.js';
import { FONT_SIZE, LABEL_Y_BOTTOM_HALF, LABEL_Y_MID_HALF, LABEL_Y_TOP_HALF } from '../../util/constants.js';
import { Label } from './Label.js';

export interface MonthsDaysLabelProps {
  segmentWidth: number;
  height: number;
  months: TimeUnit[];
}

export const MonthsDaysLabel = (props: MonthsDaysLabelProps) => {
  const { segmentWidth, height, months } = props;

  if (!months) {
    return null;
  }

  return (
    <>
      {
        months.reduce(
          (acc, el, index) => {
            const xPosition = acc.previousTotal + el.days;
            return {
              previousTotal: xPosition,
              lines: [
                ...acc.lines,
                <Label
                  key={index}
                  x1={xPosition * segmentWidth}
                  x2={xPosition * segmentWidth}
                  y1={LABEL_Y_TOP_HALF}
                  y2={LABEL_Y_MID_HALF}
                  x={xPosition * segmentWidth - (segmentWidth * el.days) / 2}
                  y={LABEL_Y_MID_HALF}
                  dy={-Math.ceil((height / 2 - FONT_SIZE) / 2)}
                >
                  {el.name} {el.year}
                </Label>
              ]
            };
          },
          { previousTotal: 0, lines: [] }
        ).lines
      }
      {
        months.reduce(
          (acc, month, monthIndex) => {
            const linesForDays = [...Array(month.days)].map((_, dayIndex) => {
              const dayNumber = dayIndex + 1;
              const xPosition = acc.previousTotal + dayNumber;

              return (
                <Label
                  key={`${monthIndex}-${dayNumber}`}
                  x1={xPosition * segmentWidth}
                  x2={xPosition * segmentWidth}
                  y1={LABEL_Y_MID_HALF}
                  y2={LABEL_Y_BOTTOM_HALF}
                  x={xPosition * segmentWidth - segmentWidth / 2}
                  y={LABEL_Y_BOTTOM_HALF}
                  dy={-Math.ceil((height / 2 - FONT_SIZE) / 2)}
                >
                  {dayNumber}
                </Label>
              );
            });

            return {
              previousTotal: acc.previousTotal + month.days,
              lines: [...acc.lines, ...linesForDays]
            };
          },
          { previousTotal: 0, lines: [] }
        ).lines
      }
    </>
  );
};

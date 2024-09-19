import React from 'react';
import type { TimeUnit } from '../../types/GanttChartTypes.js';
import { FONT_SIZE, LABEL_Y_BOTTOM_HALF, LABEL_Y_MID_HALF, LABEL_Y_TOP_HALF } from '../../util/constants.js';
import { Label } from './Label.js';

export interface YearsQuartersLabelProps {
  segmentWidth: number;
  height: number;
  years: TimeUnit[];
  quarters: TimeUnit[];
}

export const YearsQuartersLabel = (props: YearsQuartersLabelProps) => {
  const { segmentWidth, height, years, quarters } = props;

  if (!years || !quarters) {
    return null;
  }

  return (
    <>
      {
        years.reduce(
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
                  {el.name}
                </Label>
              ]
            };
          },
          { previousTotal: 0, lines: [] }
        ).lines
      }
      {
        quarters.reduce(
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
                  y1={LABEL_Y_MID_HALF}
                  y2={LABEL_Y_BOTTOM_HALF}
                  x={xPosition * segmentWidth - (segmentWidth * el.days) / 2}
                  y={LABEL_Y_BOTTOM_HALF}
                  dy={-Math.ceil((height / 2 - FONT_SIZE) / 2)}
                >
                  {el.name}
                </Label>
              ]
            };
          },
          { previousTotal: 0, lines: [] }
        ).lines
      }
    </>
  );
};

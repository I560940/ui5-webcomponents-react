import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';
import type { QuarterMonths, TimelineUnit } from '../../types/GanttChartTypes.js';
import { LABEL_Y_BOTTOM_HALF, LABEL_Y_MID_HALF, LABEL_Y_OFFSET, LABEL_Y_TOP_HALF } from '../../util/constants.js';
import { Label } from './Label.js';

export interface QuartersMonthsLabelProps {
  segmentWidth: number;
  quartersMonths: QuarterMonths[];
}

export const QuartersMonthsLabel = (props: QuartersMonthsLabelProps) => {
  const { segmentWidth, quartersMonths } = props;

  if (!quartersMonths.length) {
    return null;
  }

  const renderMonthLabel = (month: TimelineUnit, monthIndex: number, quarterIndex: number, xPosition: number) => (
    <Label
      key={`month-${quarterIndex}-${monthIndex}`}
      x1={xPosition * segmentWidth}
      x2={xPosition * segmentWidth}
      y1={LABEL_Y_MID_HALF}
      y2={LABEL_Y_BOTTOM_HALF}
      x={xPosition * segmentWidth - (segmentWidth * month.days) / 2}
      y={LABEL_Y_BOTTOM_HALF}
      dy={LABEL_Y_OFFSET}
      textColor={ThemingParameters.sapTextColor}
    >
      {month.name}
    </Label>
  );

  return (
    <>
      {
        quartersMonths.reduce(
          (acc, quarter, quarterIndex) => {
            acc.lines.push(
              <Label
                key={`quarter-${quarterIndex}`}
                x1={acc.previousTotal * segmentWidth}
                x2={acc.previousTotal * segmentWidth}
                y1={LABEL_Y_TOP_HALF}
                y2={LABEL_Y_MID_HALF}
                x={acc.previousTotal * segmentWidth + (segmentWidth * quarter.quarter.days) / 2}
                y={LABEL_Y_MID_HALF}
                dy={LABEL_Y_OFFSET}
                textColor={ThemingParameters.sapButton_Lite_TextColor}
              >
                {quarter.quarter.name}
              </Label>
            );
            quarter.months.forEach((month, monthIndex) => {
              const monthXPosition = acc.previousTotal + month.days;

              acc.lines.push(renderMonthLabel(month, monthIndex, quarterIndex, monthXPosition));
              acc.previousTotal += month.days;
            });

            return acc;
          },
          { previousTotal: 0, lines: [] }
        ).lines
      }
    </>
  );
};

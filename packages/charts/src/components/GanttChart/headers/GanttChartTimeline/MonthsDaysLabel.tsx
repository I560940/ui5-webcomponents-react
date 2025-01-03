import React from 'react';
import type { TimelineUnit } from '../../types/GanttChartTypes.js';
import { LABEL_Y_BOTTOM_HALF, LABEL_Y_MID_HALF, LABEL_Y_OFFSET, LABEL_Y_TOP_HALF } from '../../util/constants.js';
import { Label } from './Label.js';
import { ThemingParameters } from '@ui5/webcomponents-react-base';

export interface MonthsDaysLabelProps {
  segmentWidth: number;
  months: TimelineUnit[];
}

export const MonthsDaysLabel = (props: MonthsDaysLabelProps) => {
  const { segmentWidth, months } = props;

  if (!months.length) {
    return null;
  }

  const renderMonthLabel = (month: TimelineUnit, monthIndex: number, xPosition: number) => (
    <Label
      key={monthIndex}
      x1={xPosition * segmentWidth}
      x2={xPosition * segmentWidth}
      y1={LABEL_Y_TOP_HALF}
      y2={LABEL_Y_MID_HALF}
      x={xPosition * segmentWidth - (segmentWidth * month.days) / 2}
      y={LABEL_Y_MID_HALF}
      dy={LABEL_Y_OFFSET}
      textColor={ThemingParameters.sapButton_Lite_TextColor}
    >
      {month.name} {month.year}
    </Label>
  );

  const renderDayLabels = (month: TimelineUnit, monthIndex: number, previousTotal: number) => {
    return Array.from({ length: month.days }, (_, dayIndex) => {
      const dayNumber = dayIndex + 1;
      const dayXPosition = previousTotal + dayNumber;

      return (
        <Label
          key={`${monthIndex}-${dayNumber}`}
          x1={dayXPosition * segmentWidth}
          x2={dayXPosition * segmentWidth}
          y1={LABEL_Y_MID_HALF}
          y2={LABEL_Y_BOTTOM_HALF}
          x={dayXPosition * segmentWidth - segmentWidth / 2}
          y={LABEL_Y_BOTTOM_HALF}
          dy={LABEL_Y_OFFSET}
          textColor={ThemingParameters.sapTextColor}
        >
          {dayNumber}
        </Label>
      );
    });
  };

  return (
    <>
      {
        months.reduce(
          (acc, month, monthIndex) => {
            const xPosition = acc.previousTotal + month.days;

            acc.lines.push(renderMonthLabel(month, monthIndex, xPosition));
            acc.lines.push(...renderDayLabels(month, monthIndex, acc.previousTotal));

            acc.previousTotal = xPosition;

            return acc;
          },
          { previousTotal: 0, lines: [] }
        ).lines
      }
    </>
  );
};

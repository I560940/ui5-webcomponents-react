import { ThemingParameters } from '@ui5/webcomponents-react-base';
import type { PropsWithChildren } from 'react';
import React from 'react';

export interface LabelProps {
  x1: number;
  x2: number;
  y1: number | string;
  y2: number | string;
  x: number;
  y: number | string;
  dy: number;
  textColor?: string;
}

export const Label = (props: PropsWithChildren<LabelProps>) => {
  const { x1, x2, y1, y2, x, y, dy, textColor = ThemingParameters.sapTextColor, children } = props;

  return (
    <>
      <line x1={x1} x2={x2} y1={y1} y2={y2} stroke={ThemingParameters.sapList_BorderColor} strokeWidth="1" />
      <text x={x} y={y} dy={dy} fill={textColor} textAnchor="middle" fontFamily={ThemingParameters.sapFontFamily}>
        {children}
      </text>
    </>
  );
};

import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';

interface GanttChartStaticVerticalLine {
  verticalLinePosition: number;
}

/**
 * Component that renders a vertical line in the Gantt chart. This line is static and does not move.
 */
const GanttChartStaticVerticalLine: React.FC<GanttChartStaticVerticalLine> = ({ verticalLinePosition }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: verticalLinePosition,
        top: -5,
        width: 1,
        height: '105%',
        pointerEvents: 'none',
        borderLeft: `1px dashed ${ThemingParameters.sapLegendColor2}`
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-5px',
          left: '-4px',
          width: `8px`,
          height: `8px`,
          backgroundColor: ThemingParameters.sapLegendColor2,
          transform: 'rotate(45deg)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export { GanttChartStaticVerticalLine };

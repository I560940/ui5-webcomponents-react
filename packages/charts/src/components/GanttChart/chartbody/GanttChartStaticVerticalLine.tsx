import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React, { useState } from 'react';

interface GanttChartStaticVerticalLine {
  time: number;
  GanttStart: number;
  totalDuration: number;
}

/**
 * Component that renders a vertical line in the Gantt chart. This line is static and does not move.
 */
const GanttChartStaticVerticalLine: React.FC<GanttChartStaticVerticalLine> = ({ GanttStart, totalDuration, time }) => {
  const [isHovered, setIsHovered] = useState(false);

  const lineStype = isHovered ? 'solid' : 'dashed';
  const left = ((time + 1 - GanttStart) / totalDuration) * 100;
  const rectSize = 5;
  const rectOffset = Math.sqrt(rectSize ** 2) / 2;
  return (
    <div
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: -5,
        width: 1,
        height: '105%',
        borderLeft: `1px ${lineStype} ${ThemingParameters.sapLegendColor2}`
      }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          top: `-1px`,
          position: 'absolute',
          left: `-${rectOffset}px`,
          width: `${rectSize}px`,
          height: `${rectSize}px`,
          backgroundColor: isHovered ? 'green' : ThemingParameters.sapLegendColor2,
          transform: 'rotate(45deg)'
        }}
      />
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: '-30px',
            left: `20px`,
            backgroundColor: `${ThemingParameters.sapBackgroundColor}`,
            border: `1px solid ${ThemingParameters.sapField_TextColor}`,
            borderRadius: '4px',
            margin: '5px',
            padding: '10px',
            fontSize: '14px'
          }}
        >
          Today
        </div>
      )}
    </div>
  );
};

export { GanttChartStaticVerticalLine };

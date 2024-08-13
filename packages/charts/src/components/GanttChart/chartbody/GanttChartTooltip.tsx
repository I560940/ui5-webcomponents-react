import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useStyles } from '../util/styles.js';

export interface GanttTooltipHandle {
  onHoverItem: (
    mouseX: number,
    mouseY: number,
    label: string,
    startTime: number,
    duration: number,
    color: string,
    isMilestone: boolean
  ) => void;
  onLeaveItem: () => void;
}

interface GanttTooltipChartProps {
  unit: string;
  valueFormat?: (value: number) => string;
}

export const GanttChartTooltip = forwardRef<GanttTooltipHandle, GanttTooltipChartProps>(function GanttChartTooltip(
  { unit, valueFormat },
  ref
) {
  const [state, setState] = useState({
    x: 0,
    y: 0,
    label: '',
    visible: false,
    startTime: 0,
    duration: 0,
    color: 'black',
    isMilestone: false
  });
  const divRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLSpanElement>(null);
  const classes = useStyles();

  const onHoverItem = (
    mouseX: number,
    mouseY: number,
    label: string,
    startTime: number,
    duration: number,
    color: string,
    isMilestone: boolean
  ) => {
    const { x, y, width, height } = divRef.current?.getBoundingClientRect();
    // Adjust the x and y position of the tooltip popover in order to try
    // to prevent it from being cut off by the bounds of the parent div.
    const offSetX = mouseX - x;
    const offSetY = mouseY - y;
    const xPos = offSetX < width - 80 ? offSetX : offSetX - 120;
    const yPos = offSetY < height - 70 ? offSetY : offSetY - 70;
    setState({ x: xPos, y: yPos, label, visible: true, startTime, duration, color, isMilestone });
  };

  const onLeaveItem = () => {
    setState({ ...state, visible: false });
  };

  useImperativeHandle(ref, () => ({
    onHoverItem: onHoverItem,
    onLeaveItem: onLeaveItem
  }));

  return (
    <div data-component-name="GanttChartTooltipContainer" className={classes.tooltipContainer} ref={divRef}>
      {state.visible ? (
        <span
          data-component-name="GanttChartTooltip"
          className={classes.tooltip}
          ref={popupRef}
          style={{
            insetInlineStart: state.x,
            insetBlockStart: state.y
          }}
        >
          <span className={classes.tooltipLabel}>
            <strong>{state.label}</strong>
          </span>
          <span className={classes.tooltipColorBar} style={{ backgroundColor: state.color }}></span>
          <span>
            Start: {valueFormat != null ? valueFormat(state.startTime) : state.startTime}
            {unit}
          </span>
          {state.isMilestone ? null : (
            <span>
              Duration: {valueFormat != null ? valueFormat(state.duration) : state.duration}
              {unit}
            </span>
          )}
          <span>
            End:{' '}
            {valueFormat != null ? valueFormat(state.startTime + state.duration) : state.startTime + state.duration}
            {unit}
          </span>
        </span>
      ) : null}
    </div>
  );
});

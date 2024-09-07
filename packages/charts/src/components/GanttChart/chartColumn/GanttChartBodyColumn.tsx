import type { ReactNode } from 'react';
import React, { useRef, useState } from 'react';
import { GanttChartBody } from '../chartbody/GanttChartBody.js';
import { GanttChartColumnLabel } from '../headers/GanttChartColumnLabel.js';
import type { DimensionsState, IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
import {
  COLUMN_COMPONENT_WIDTH,
  COLUMN_HEADER_HEIGHT,
  COLUMN_STATUS_WIDTH,
  MOUSE_CURSOR_AUTO,
  MOUSE_CURSOR_GRAB,
  MOUSE_CURSOR_GRABBING
} from '../util/constants.js';
import { useStyles } from '../util/styles.js';

export interface GanttChartBodyColumnProps {
  dataset: IGanttChartRow[];
  dimensions: DimensionsState;
  chartBodyScale: number;
  height: number;
  rowHeight: number;
  numOfRows: number;
  isDiscrete: boolean;
  totalDuration: number;
  start: number;
  showAnnotation?: boolean;
  showVerticalLineOnHover?: boolean;
  showStaticVerticalLine?: boolean;
  showStatus?: boolean;
  staticVerticalLinePosition?: number;
  valueFormat?: (value: number) => string;
  annotations?: ReactNode | ReactNode[];
  openRowIndex: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
  updateCurrentChartBodyWidth: (newWidth: number) => void;
  onTaskClick?: (task: Record<string, any>, event: React.MouseEvent) => void;
}

export const GanttChartBodyColumn = (props: GanttChartBodyColumnProps) => {
  const {
    dataset,
    dimensions,
    chartBodyScale,
    height,
    rowHeight,
    numOfRows,
    isDiscrete,
    totalDuration,
    start,
    valueFormat,
    annotations,
    showAnnotation,
    showVerticalLineOnHover,
    showStaticVerticalLine,
    showStatus,
    staticVerticalLinePosition,
    openRowIndex,
    openSubRowIndexes,
    updateCurrentChartBodyWidth,
    onTaskClick
  } = props;
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [mPos, setMPos] = useState(0);
  const classes = useStyles();

  const bodyConRef = useRef<HTMLDivElement>(null);

  const unscaledBodyWidth = showStatus
    ? dimensions.width - COLUMN_COMPONENT_WIDTH - COLUMN_STATUS_WIDTH
    : dimensions.width - COLUMN_COMPONENT_WIDTH;
  const bodyWidth = unscaledBodyWidth * chartBodyScale;

  const getCursor = (): string => {
    if (isGrabbed) return MOUSE_CURSOR_GRABBING;
    if (chartBodyScale > 1) return MOUSE_CURSOR_GRAB;
    return MOUSE_CURSOR_AUTO;
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (chartBodyScale > 1) {
      setIsGrabbed(true);
      setMPos(e.clientX);
    }
  };

  const onMouseUp = () => {
    if (chartBodyScale > 1) setIsGrabbed(false);
  };

  // TODO: throttle this function!
  const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isGrabbed) {
      const dx = e.clientX - mPos;
      // Make negative so that the scrolling can move in
      // same direction as the mouse
      bodyConRef.current.scrollBy({ left: -dx });
      setMPos(e.clientX);
    }
  };

  return (
    <div
      data-component-name="GanttChartBodyContainer"
      className={classes.bodyContainer}
      ref={bodyConRef}
      style={{
        width: unscaledBodyWidth,
        height: height,
        cursor: getCursor()
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={mouseMoveHandler}
    >
      <div
        className={classes.columnTitle}
        style={{
          width: unscaledBodyWidth,
          height: COLUMN_HEADER_HEIGHT / 2,
          lineHeight: `${COLUMN_HEADER_HEIGHT / 2}px`
        }}
      ></div>
      <GanttChartColumnLabel
        width={bodyWidth}
        height={COLUMN_HEADER_HEIGHT}
        isDiscrete={isDiscrete}
        totalDuration={totalDuration}
        start={start}
        unscaledWidth={unscaledBodyWidth}
        valueFormat={valueFormat}
      />
      <GanttChartBody
        dataset={dataset}
        width={bodyWidth}
        height={height - COLUMN_HEADER_HEIGHT}
        rowHeight={rowHeight}
        numOfItems={numOfRows}
        totalDuration={totalDuration}
        isDiscrete={isDiscrete}
        annotations={annotations}
        showAnnotation={showAnnotation}
        showVerticalLineOnHover={showVerticalLineOnHover}
        showStaticVerticalLine={showStaticVerticalLine}
        staticVerticalLinePosition={staticVerticalLinePosition}
        start={start}
        valueFormat={valueFormat}
        unscaledWidth={unscaledBodyWidth}
        onTaskClick={onTaskClick}
        openRowIndex={openRowIndex}
        openSubRowIndexes={openSubRowIndexes}
        updateCurrentChartBodyWidth={updateCurrentChartBodyWidth}
      />
    </div>
  );
};

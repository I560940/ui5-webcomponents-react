import type { ReactNode } from 'react';
import React, { useRef, useState } from 'react';
import { GanttChartBody } from '../chartbody/GanttChartBody.js';
import { GanttChartTimeline } from '../headers/GanttChartTimeline/GanttChartTimeline.js';
import type {
  DateRange,
  DimensionsState,
  IGanttChartRow,
  OpenRowIndex,
  OpenSubRowIndexes,
  IGanttChartEvent,
  IGanttChartTask
} from '../types/GanttChartTypes.js';
import {
  COLUMN_COMPONENT_WIDTH,
  COLUMN_HEADER_HEIGHT,
  COLUMN_STATUS_WIDTH,
  MOUSE_CURSOR_AUTO,
  MOUSE_CURSOR_GRAB,
  MOUSE_CURSOR_GRABBING,
  ROW_CONTRACT_DURATION_HEIGHT
} from '../util/constants.js';
import { useStyles } from '../util/styles.js';

export interface GanttChartBodyColumnProps {
  dataset: IGanttChartRow[];
  dimensions: DimensionsState;
  chartBodyScale: number;
  height: number;
  rowHeight: number;
  numberOfRows: number;
  totalDuration: number;
  contractDuration: DateRange;
  showAnnotation?: boolean;
  showVerticalLineOnHover?: boolean;
  showStaticVerticalLine?: boolean;
  showStatus?: boolean;
  staticVerticalLinePosition?: string;
  annotations?: ReactNode | ReactNode[];
  openRowIndex: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleTaskClick?: (parentId: string, task: IGanttChartTask, event: React.MouseEvent) => void;
  onEventClick: (events: IGanttChartEvent[], e: React.MouseEvent) => void;
  shouldEventsBeGrouped: boolean;
}

export const GanttChartBodyColumn = (props: GanttChartBodyColumnProps) => {
  const {
    dataset,
    dimensions,
    chartBodyScale,
    height,
    rowHeight,
    numberOfRows,
    totalDuration,
    contractDuration,
    annotations,
    showAnnotation,
    showVerticalLineOnHover,
    showStaticVerticalLine,
    showStatus,
    staticVerticalLinePosition,
    openRowIndex,
    openSubRowIndexes,
    handleTaskClick,
    onEventClick,
    shouldEventsBeGrouped
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
        cursor: getCursor(),
        overflowX: 'auto'
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={mouseMoveHandler}
    >
      <GanttChartTimeline
        width={bodyWidth}
        height={COLUMN_HEADER_HEIGHT}
        totalDuration={totalDuration}
        contractDuration={contractDuration}
      />
      <GanttChartBody
        dataset={dataset}
        width={bodyWidth}
        chartBodyScale={chartBodyScale}
        height={height - COLUMN_HEADER_HEIGHT - ROW_CONTRACT_DURATION_HEIGHT}
        rowHeight={rowHeight}
        numOfItems={numberOfRows}
        totalDuration={totalDuration}
        contractDuration={contractDuration}
        annotations={annotations}
        showAnnotation={showAnnotation}
        showVerticalLineOnHover={showVerticalLineOnHover}
        showStaticVerticalLine={showStaticVerticalLine}
        staticVerticalLinePosition={staticVerticalLinePosition}
        unscaledWidth={unscaledBodyWidth}
        handleTaskClick={handleTaskClick}
        onEventClick={onEventClick}
        openRowIndex={openRowIndex}
        openSubRowIndexes={openSubRowIndexes}
        shouldEventsBeGrouped={shouldEventsBeGrouped}
      />
    </div>
  );
};

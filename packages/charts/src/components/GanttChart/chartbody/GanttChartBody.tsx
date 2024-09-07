/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CSSProperties, ReactNode } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import type { IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
import { GanttChartBodyCtx } from '../util/context.js';
import { useStyles } from '../util/styles.js';
import { GanttChartRowGroup } from './chartRow/GanttChartRowGroup.js';
import { GanttChartGrid } from './GanttChartGrid.js';
import { GanttChartHoverVerticalLine } from './GanttChartHoverVerticalLine.js';
import { GanttChartLayer } from './GanttChartLayer.js';
import { GanttChartStaticVerticalLine } from './GanttChartStaticVerticalLine.js';
import type { GanttTooltipHandle } from './GanttChartTooltip.js';
import { GanttChartTooltip } from './GanttChartTooltip.js';

interface GanttChartBodyProps {
  dataset: IGanttChartRow[];
  width?: number;
  height?: number;
  rowHeight: number;
  numOfItems: number;
  totalDuration: number;
  isDiscrete: boolean;
  annotations?: ReactNode | ReactNode[];
  onTaskClick?: (task: Record<string, any>, event: React.MouseEvent) => void;
  showAnnotation?: boolean;
  showConnection?: boolean;
  showVerticalLineOnHover?: boolean;
  showStaticVerticalLine?: boolean;
  staticVerticalLinePosition?: number;
  start: number;
  unscaledWidth?: number;
  valueFormat?: (value: number) => string;
  openRowIndex: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
  updateCurrentChartBodyWidth: (newWidth: number) => void;
}

const GanttChartBody = (props: GanttChartBodyProps) => {
  const {
    dataset,
    width,
    rowHeight,
    numOfItems,
    totalDuration,
    isDiscrete,
    onTaskClick,
    annotations,
    showAnnotation,
    showVerticalLineOnHover,
    showStaticVerticalLine,
    staticVerticalLinePosition,
    start,
    unscaledWidth,
    valueFormat,
    openRowIndex,
    openSubRowIndexes,
    updateCurrentChartBodyWidth
  } = props;
  const classes = useStyles();
  const tooltipRef = useRef<GanttTooltipHandle>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [verticalLinePosition, setVerticalLinePosition] = useState<number | null>(null);

  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        updateCurrentChartBodyWidth(newWidth);
      }
    });
    if (bodyRef.current) {
      ro.observe(bodyRef.current);
    }
    return () => {
      if (bodyRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ro.unobserve(bodyRef.current);
      }
    };
  }, [updateCurrentChartBodyWidth]);

  const style: CSSProperties = {
    width: `${width}px`,
    height: `${numOfItems * rowHeight}px`
  };

  const showTooltipOnHover = (
    mouseX: number,
    mouseY: number,
    label: string,
    startTime: number,
    duration: number,
    color: string,
    isMilestone: boolean
  ) => {
    tooltipRef.current?.onHoverItem(mouseX, mouseY, label, startTime, duration, color, isMilestone);
  };
  const hideTooltip = () => tooltipRef.current?.onLeaveItem();

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = bodyRef.current.getBoundingClientRect();
    if (rect) {
      setVerticalLinePosition(e.clientX - rect.left);
    }
  };

  const onMouseLeave = () => {
    setVerticalLinePosition(null);
  };

  const handleTaskClick = (task: Record<string, any>, event: React.MouseEvent) => {
    onTaskClick?.(task, event);
  };

  return (
    <div
      data-component-name="GanttChartBody"
      ref={bodyRef}
      className={classes.chartBody}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <GanttChartLayer name="GanttChartGridLayer" ignoreClick>
        <GanttChartGrid
          isDiscrete={isDiscrete}
          numOfRows={numOfItems}
          totalDuration={totalDuration}
          rowHeight={rowHeight}
          width={width}
          unscaledWidth={unscaledWidth}
        />
      </GanttChartLayer>
      <GanttChartLayer name="GanttChartRowsLayer" ignoreClick>
        <GanttChartRowGroup
          dataset={dataset}
          rowHeight={rowHeight}
          totalDuration={totalDuration}
          GanttStart={start}
          showTooltip={showTooltipOnHover}
          hideTooltip={hideTooltip}
          handleTaskClick={handleTaskClick}
          openRowIndex={openRowIndex}
          openSubRowIndexes={openSubRowIndexes}
        />
      </GanttChartLayer>

      {showAnnotation && annotations != null ? (
        <GanttChartLayer name="GanttChartAnnotationLayer" isAnnotation ignoreClick>
          <GanttChartBodyCtx.Provider value={{ chartBodyWidth: width }}>{annotations}</GanttChartBodyCtx.Provider>
        </GanttChartLayer>
      ) : null}

      {/* TODO: Remove this component */}
      {false ? <GanttChartTooltip ref={tooltipRef} valueFormat={valueFormat} /> : null}
      {showVerticalLineOnHover && verticalLinePosition && (
        <GanttChartHoverVerticalLine verticalLinePosition={verticalLinePosition} />
      )}
      {showStaticVerticalLine && <GanttChartStaticVerticalLine verticalLinePosition={staticVerticalLinePosition} />}
    </div>
  );
};

export { GanttChartBody };

import type { CSSProperties, ReactNode } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { GanttChartRowGroup } from '../chartRow/GanttChartRowGroup.js';
import type { DateRange, IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
import { ROW_CONTRACT_DURATION_HEIGHT } from '../util/constants.js';
import { GanttChartBodyCtx } from '../util/context.js';
import { useStyles } from '../util/styles.js';
import { GanttChartHoverVerticalLine } from './GanttChartHoverVerticalLine.js';
import { GanttChartLayer } from './GanttChartLayer.js';
import { GanttChartStaticVerticalLine } from './GanttChartStaticVerticalLine.js';
import type { GanttTooltipHandle } from './GanttChartTooltip.js';
import { GanttChartTooltip } from './GanttChartTooltip.js';

export interface GanttChartBodyProps {
  dataset: IGanttChartRow[];
  width?: number;
  height?: number;
  rowHeight: number;
  numOfItems: number;
  totalDuration: number;
  contractDuration: DateRange;
  annotations?: ReactNode | ReactNode[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onTaskClick?: (task: Record<string, any>, event: React.MouseEvent) => void;
  showAnnotation?: boolean;
  showVerticalLineOnHover?: boolean;
  showStaticVerticalLine?: boolean;
  staticVerticalLinePosition?: number;
  unscaledWidth?: number;
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
    contractDuration,
    onTaskClick,
    annotations,
    showAnnotation,
    showVerticalLineOnHover,
    showStaticVerticalLine,
    staticVerticalLinePosition,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style: CSSProperties = {
    width: `${width}px`,
    height: `${numOfItems * rowHeight + ROW_CONTRACT_DURATION_HEIGHT}px`
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        {/* <GanttChartGrid width={width} unscaledWidth={unscaledWidth} numOfRows={numOfItems} rowHeight={rowHeight} /> */}
      </GanttChartLayer>
      <GanttChartLayer name="GanttChartRowsLayer" ignoreClick>
        <GanttChartRowGroup
          dataset={dataset}
          rowHeight={rowHeight}
          totalDuration={totalDuration}
          contractDuration={contractDuration}
          GanttStart={0}
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
      {false ? <GanttChartTooltip ref={tooltipRef} /> : null}
      {showVerticalLineOnHover && verticalLinePosition && (
        <GanttChartHoverVerticalLine verticalLinePosition={verticalLinePosition} />
      )}
      {showStaticVerticalLine && <GanttChartStaticVerticalLine verticalLinePosition={staticVerticalLinePosition} />}
    </div>
  );
};

export { GanttChartBody };

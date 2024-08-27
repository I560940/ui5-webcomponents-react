import type { CSSProperties, ReactNode } from 'react';
import React, { useRef } from 'react';
import type { IGanttChartRow } from '../types/GanttChartTypes.js';
import { GanttChartBodyCtx } from '../util/context.js';
import { useStyles } from '../util/styles.js';
import { GanttChartRowGroup } from './chartrow/GanttChartRowGroup.js';
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
  onTaskClick?: (task: Record<string, any>) => void;
  annotations?: ReactNode | ReactNode[];
  showAnnotation?: boolean;
  showConnection?: boolean;
  showVerticalLineOnHover?: boolean;
  showStaticVerticalLine?: boolean;
  staticVerticalLinePosition?: number;
  showTooltip?: boolean;
  showTaskTooltip?: boolean;
  renderTaskTooltip?: (task: Record<string, any>, onClose: () => void) => ReactNode;
  unit: string;
  start: number;
  unscaledWidth?: number;
  // onScale: (x: number) => void;
  valueFormat?: (value: number) => string;
  // resetScroll: () => void;
}

const GanttChartBody = ({
  dataset,
  width,
  rowHeight,
  numOfItems,
  totalDuration,
  isDiscrete,
  onTaskClick,
  annotations,
  showAnnotation,
  showTooltip,
  showVerticalLineOnHover,
  showStaticVerticalLine,
  staticVerticalLinePosition,
  showTaskTooltip,
  renderTaskTooltip,
  unit,
  start,
  unscaledWidth,
  // onScale,
  valueFormat
  // resetScroll
}: GanttChartBodyProps) => {
  const classes = useStyles();
  const tooltipRef = useRef<GanttTooltipHandle>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  // const scaleExpRef = useRef(0);
  const [verticalLinePosition, setVerticalLinePosition] = React.useState<number | null>(null);
  const [selectedTask, setSelectedTask] = React.useState(null);

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

  // const onMouseWheelEvent = (evt: WheelEvent) => {
  //   evt.preventDefault();
  //   if (evt.deltaY < 0) {
  //     // Only scale up if scaled width will not exceed MAX_BODY_WIDTH
  //     const msrWidth = bodyRef.current.getBoundingClientRect().width;
  //     if (msrWidth * SCALE_FACTOR < MAX_BODY_WIDTH) {
  //       scaleExpRef.current++;
  //     }
  //   } else {
  //     // Only scale down if scaled width will not be less than original
  //     // width
  //     if (scaleExpRef.current > 0) {
  //       resetScroll();
  //       scaleExpRef.current--;
  //     }
  //   }
  //   onScale(Math.pow(SCALE_FACTOR, scaleExpRef.current));
  // };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = bodyRef.current.getBoundingClientRect();
    if (rect) {
      setVerticalLinePosition(e.clientX - rect.left);
    }
  };

  const onMouseLeave = () => {
    setVerticalLinePosition(null);
  };

  const handleTaskClick = (task: Record<string, any>) => {
    onTaskClick?.(task);
    if (showTaskTooltip) {
      setSelectedTask(task);
    }
  };

  const handleCloseTaskPopup = () => {
    setSelectedTask(null);
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
        />
      </GanttChartLayer>

      {showAnnotation && annotations != null ? (
        <GanttChartLayer name="GanttChartAnnotationLayer" isAnnotation ignoreClick>
          <GanttChartBodyCtx.Provider value={{ chartBodyWidth: width }}>{annotations}</GanttChartBodyCtx.Provider>
        </GanttChartLayer>
      ) : null}

      {showTooltip ? <GanttChartTooltip ref={tooltipRef} unit={unit} valueFormat={valueFormat} /> : null}
      {verticalLinePosition && showVerticalLineOnHover && (
        <GanttChartHoverVerticalLine verticalLinePosition={verticalLinePosition} />
      )}
      {showStaticVerticalLine && <GanttChartStaticVerticalLine verticalLinePosition={staticVerticalLinePosition} />}
      {selectedTask && renderTaskTooltip && renderTaskTooltip(selectedTask, handleCloseTaskPopup)}
    </div>
  );
};

export { GanttChartBody };

import { useStylesheet } from '@ui5/webcomponents-react-base';
import type { CSSProperties, ReactNode } from 'react';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { IGanttChartRow } from '../types/GanttChartTypes.js';
import { MAX_BODY_WIDTH, SCALE_FACTOR } from '../util/constants.js';
import { GanttChartBodyCtx } from '../util/context.js';
import { classNames, styleData } from '../util/GanttChart.module.css.js';
import { GanttChartGrid } from './GanttChartGrid.js';
import { GanttChartLayer } from './GanttChartLayer.js';
import { GanttChartRowGroup } from './GanttChartRow.js';
import { GanttChartConnections } from './TimelineConnections.js';

interface GanttChartBodyProps {
  dataset: IGanttChartRow[];
  width?: number;
  height?: number;
  rowHeight: number;
  numOfItems: number;
  totalDuration: number;
  isDiscrete: boolean;
  annotations?: ReactNode | ReactNode[];
  showAnnotation?: boolean;
  showConnection?: boolean;
  showTooltip?: boolean;
  unit: string;
  start: number;
  unscaledWidth?: number;
  onScale: (x: number) => void;
  valueFormat?: (value: number) => string;
  resetScroll: () => void;
}

const GanttChartBody = ({
  dataset,
  width,
  rowHeight,
  numOfItems,
  totalDuration,
  isDiscrete,
  annotations,
  showAnnotation,
  showConnection,
  showTooltip,
  unit,
  start,
  unscaledWidth,
  onScale,
  valueFormat,
  resetScroll
}: GanttChartBodyProps) => {
  useStylesheet(styleData, GanttChartBody.displayName);

  const tooltipRef = useRef<TimelineTooltipHandle>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const scaleExpRef = useRef(0);
  const [displayArrows, setDisplayArrows] = useState(false);

  useEffect(() => {
    const bodyElement = bodyRef.current;
    bodyElement?.addEventListener('wheel', onMouseWheelEvent);
    return () => {
      bodyElement?.removeEventListener('wheel', onMouseWheelEvent);
    };
  }, []);

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

  const onMouseWheelEvent = (evt: WheelEvent) => {
    evt.preventDefault();
    if (evt.deltaY < 0) {
      // Only scale up if scaled width will not exceed MAX_BODY_WIDTH
      const msrWidth = bodyRef.current.getBoundingClientRect().width;
      if (msrWidth * SCALE_FACTOR < MAX_BODY_WIDTH) {
        scaleExpRef.current++;
      }
    } else {
      // Only scale down if scaled width will not be less than original
      // width
      if (scaleExpRef.current > 0) {
        resetScroll();
        scaleExpRef.current--;
      }
    }
    onScale(Math.pow(SCALE_FACTOR, scaleExpRef.current));
  };

  const showArrows = () => setDisplayArrows(true);

  return (
    <div data-component-name="GanttChartBody" ref={bodyRef} className={classNames.chartBody} style={style}>
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

      {showConnection && displayArrows ? (
        <GanttChartLayer name="GanttChartConnectionLayer" ignoreClick>
          <GanttChartConnections
            dataSet={dataset}
            width={width}
            rowHeight={rowHeight}
            bodyRect={bodyRef.current?.getBoundingClientRect()}
          />
        </GanttChartLayer>
      ) : null}

      <GanttChartLayer name="GanttChartRowsLayer" ignoreClick>
        <GanttChartRowGroup
          dataset={dataset}
          rowHeight={rowHeight}
          totalDuration={totalDuration}
          timelineStart={start}
          showTooltip={showTooltipOnHover}
          hideTooltip={hideTooltip}
          postRender={showArrows}
        />
      </GanttChartLayer>

      {showAnnotation && annotations != null ? (
        <GanttChartLayer name="GanttChartAnnotationLayer" isAnnotation ignoreClick>
          <GanttChartBodyCtx.Provider value={{ chartBodyWidth: width }}>{annotations}</GanttChartBodyCtx.Provider>
        </GanttChartLayer>
      ) : null}

      {showTooltip ? <GanttChartTooltip ref={tooltipRef} unit={unit} valueFormat={valueFormat} /> : null}
    </div>
  );
};

GanttChartBody.displayName = 'GanttChartBody';

interface TimelineTooltipHandle {
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

interface TimelineTooltipChartProps {
  unit: string;
  valueFormat?: (value: number) => string;
}

const GanttChartTooltip = forwardRef<TimelineTooltipHandle, TimelineTooltipChartProps>(function GanttChartTooltip(
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

  useStylesheet(styleData, 'GanttChartTooltip');

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
    <div data-component-name="GanttChartTooltipContainer" className={classNames.tooltipContainer} ref={divRef}>
      {state.visible ? (
        <span
          data-component-name="GanttChartTooltip"
          className={classNames.tooltip}
          ref={popupRef}
          style={{
            insetInlineStart: state.x,
            insetBlockStart: state.y
          }}
        >
          <span className={classNames.tooltipLabel}>
            <strong>{state.label}</strong>
          </span>
          <span className={classNames.tooltipColorBar} style={{ backgroundColor: state.color }}></span>
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

GanttChartTooltip.displayName = 'GanttChartTooltip';

export { GanttChartBody };

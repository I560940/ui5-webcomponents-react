import type { CommonProps } from '@ui5/webcomponents-react';
import type { CSSProperties, ReactNode } from 'react';
import React, { forwardRef, useEffect, useRef } from 'react';
import { GanttChartBodyColumn } from './chartColumn/GanttChartBodyColumn.js';
import { GanttChartColumn } from './chartColumn/GanttChartColumn.js';
import { GanttChartZoomSlider } from './headers/GanttChartZoomSlider.js';
import { useCollapsableRows } from './hooks/useCollapsableRows.js';
import { useDimensions } from './hooks/useDimensions.js';
import { GanttChartPlaceholder } from './Placeholder.js';
import type { DateRange, IGanttChartRow } from './types/GanttChartTypes.js';
import {
  DEFAULT_ROW_HEIGHT,
  COLUMN_HEADER_HEIGHT,
  COLUMN_STATUS_WIDTH,
  CONTROLS_ROW_HEIGHT,
  COLUMN_COMPONENT_TITLE,
  COLUMN_COMPONENT_WIDTH,
  COLUMN_STATUS_TITLE
} from './util/constants.js';
import { useStyles } from './util/styles.js';
import { calculateTotalDuration } from './util/utils.js';

export interface GanttChartProps extends CommonProps {
  dataset?: IGanttChartRow[];
  contractDuration: DateRange;
  rowHeight?: number;
  annotations?: ReactNode | ReactNode[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onTaskClick?: (task: Record<string, any>, event: React.MouseEvent) => void;
  onLegendClick?: (event: React.MouseEvent) => void;
  showAnnotation?: boolean;
  showStatus?: boolean;
  showVerticalLineOnHover?: boolean;
  showStaticVerticalLine?: boolean;
  staticVerticalLinePosition?: number;
}

const GanttChart = forwardRef<HTMLDivElement, GanttChartProps>((props, fRef) => {
  const {
    dataset,
    contractDuration,
    rowHeight = DEFAULT_ROW_HEIGHT,
    onTaskClick,
    onLegendClick,
    annotations,
    showAnnotation,
    showVerticalLineOnHover,
    showStaticVerticalLine,
    staticVerticalLinePosition,
    showStatus = true,
    ...rest
  } = props;
  const { openRowIndex, openSubRowIndexes, numberOfRows, handleClick, handleSubClick } = useCollapsableRows(dataset);
  const { dimensions, height, bodyWidth, gridTemplateColumns, setDimensions, chartBodyScale, setChartBodyScale } =
    useDimensions(showStatus, rowHeight, numberOfRows);
  const { dateStart, dateEnd } = contractDuration;
  const totalDuration = calculateTotalDuration(contractDuration);

  const style: CSSProperties = {
    height: `${height}px`,
    gridTemplateColumns
  };
  const ref = useRef(null);
  const bodyConRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();

  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const width = entry.contentBoxSize[0].inlineSize;
        const height = entry.contentBoxSize[0].blockSize;
        setDimensions({
          width: width,
          height: height,
          chartWidth: width - COLUMN_COMPONENT_WIDTH,
          chartHeight: height - COLUMN_HEADER_HEIGHT - CONTROLS_ROW_HEIGHT,
          currentChartWidth: bodyWidth
        });
        setChartBodyScale(1);
      });
    });
    if (ref.current != null) ro.observe(ref.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetScroll = () => {
    bodyConRef.current.scrollTo({ left: 0 });
  };

  if (!dataset || dataset?.length === 0 || !dateStart || !dateEnd) {
    return <GanttChartPlaceholder />;
  }

  return (
    <div ref={fRef} {...rest}>
      <GanttChartZoomSlider
        onScale={(value: number) => setChartBodyScale(value)}
        onLegendClick={onLegendClick}
        dimensions={dimensions}
        resetScroll={resetScroll}
      />
      <div className={classes.main} ref={ref} style={style} data-component-name="GanttChart">
        <GanttChartColumn
          height={height}
          width={COLUMN_COMPONENT_WIDTH}
          columnTitle={COLUMN_COMPONENT_TITLE}
          rowHeight={rowHeight}
          dataset={dataset}
          dataType="label"
          handleClick={handleClick}
          handleSubClick={handleSubClick}
          openRowIndex={openRowIndex}
          openSubRowIndexes={openSubRowIndexes}
          numberOfRows={numberOfRows}
          showStatus={showStatus}
        />
        {showStatus ? (
          <GanttChartColumn
            height={height}
            width={COLUMN_STATUS_WIDTH}
            columnTitle={COLUMN_STATUS_TITLE}
            rowHeight={rowHeight}
            dataset={dataset}
            dataType="status"
            openRowIndex={openRowIndex}
            openSubRowIndexes={openSubRowIndexes}
            numberOfRows={numberOfRows}
          />
        ) : null}
        <GanttChartBodyColumn
          dataset={dataset}
          dimensions={dimensions}
          chartBodyScale={chartBodyScale}
          height={height}
          rowHeight={rowHeight}
          numberOfRows={numberOfRows}
          totalDuration={totalDuration}
          contractDuration={contractDuration}
          annotations={annotations}
          showAnnotation={showAnnotation}
          showVerticalLineOnHover={showVerticalLineOnHover}
          showStaticVerticalLine={showStaticVerticalLine}
          showStatus={showStatus}
          staticVerticalLinePosition={staticVerticalLinePosition}
          onTaskClick={onTaskClick}
          openRowIndex={openRowIndex}
          openSubRowIndexes={openSubRowIndexes}
        />
      </div>
    </div>
  );
});

GanttChart.displayName = 'GanttChart';

export { GanttChart };

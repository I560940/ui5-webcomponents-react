/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CommonProps } from '@ui5/webcomponents-react';
import type { CSSProperties, ReactNode } from 'react';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { GanttChartBodyColumn } from './chartColumn/GanttChartBodyColumn.js';
import { GanttChartColumn } from './chartColumn/GanttChartColumn.js';
import { GanttChartRowControls } from './headers/GanttChartRowControls.js';
import { GanttChartPlaceholder } from './Placeholder.js';
import type { DimensionsState, IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from './types/GanttChartTypes.js';
import {
  DEFAULT_ROW_HEIGHT,
  DEFAULT_WIDTH,
  COLUMN_HEADER_HEIGHT,
  COLUMN_STATUS_WIDTH,
  CONTROLS_ROW_HEIGHT,
  COLUMN_COMPONENT_TITLE,
  COLUMN_COMPONENT_WIDTH,
  COLUMN_STATUS_TITLE,
  ROW_CONTRACT_DURATION_HEIGHT
} from './util/constants.js';
import { useStyles } from './util/styles.js';
import { countAllRows } from './util/utils.js';

export interface GanttChartProps extends CommonProps {
  dataset?: IGanttChartRow[];
  totalDuration?: number;
  width?: CSSProperties['width'];
  rowHeight?: number;
  isDiscrete?: boolean;
  annotations?: ReactNode | ReactNode[];
  onTaskClick?: (task: Record<string, any>, event: React.MouseEvent) => void;
  showAnnotation?: boolean;
  showConnection?: boolean;
  showStatus?: boolean;
  showVerticalLineOnHover?: boolean;
  showStaticVerticalLine?: boolean;
  staticVerticalLinePosition?: number;
  start?: number;
  valueFormat?: (value: number) => string;
}

const GanttChart = forwardRef<HTMLDivElement, GanttChartProps>((props, fRef) => {
  const {
    dataset,
    totalDuration = 10,
    width = DEFAULT_WIDTH,
    rowHeight = DEFAULT_ROW_HEIGHT,
    isDiscrete,
    onTaskClick,
    annotations,
    showAnnotation,
    showVerticalLineOnHover,
    showStaticVerticalLine,
    staticVerticalLinePosition,
    start = 0,
    valueFormat = (x: number) => x.toFixed(1),
    showStatus = true,
    ...rest
  } = props;
  const [openRowIndex, setOpenRowIndex] = useState<OpenRowIndex>(null);
  const [openSubRowIndexes, setOpenSubRowIndexes] = useState<OpenSubRowIndexes>({});
  const [numOfRows, setNumOfRows] = useState<number>(() => countAllRows(dataset, openRowIndex, openSubRowIndexes));
  const [chartBodyScale, setChartBodyScale] = useState(1);
  const [dimensions, setDimensions] = useState<DimensionsState>({
    width: 0,
    height: 0,
    chartWidth: 0,
    chartHeight: 0,
    currentChartWidth: 0
  });
  const height = rowHeight * numOfRows + COLUMN_HEADER_HEIGHT + ROW_CONTRACT_DURATION_HEIGHT;
  const unscaledBodyWidth = showStatus
    ? dimensions.width - COLUMN_COMPONENT_WIDTH - COLUMN_STATUS_WIDTH
    : dimensions.width - COLUMN_COMPONENT_WIDTH;
  const bodyWidth = unscaledBodyWidth * chartBodyScale;

  const style: CSSProperties = {
    height: `${height}px`,
    width: width,
    gridTemplateColumns: showStatus
      ? `${COLUMN_COMPONENT_WIDTH}px ${COLUMN_STATUS_WIDTH}px auto`
      : `${COLUMN_COMPONENT_WIDTH}px auto`
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

  useEffect(() => {
    setNumOfRows(() => countAllRows(dataset, openRowIndex, openSubRowIndexes));
  }, [dataset, numOfRows, openRowIndex, openSubRowIndexes]);

  const scaleChartBody = (value: number) => setChartBodyScale(value);

  const resetScroll = () => {
    bodyConRef.current.scrollTo({ left: 0 });
  };

  const updateCurrentChartBodyWidth = (newWidth: number) => {
    setDimensions((prevState) => ({ ...prevState, currentChartWidth: newWidth }));
  };

  const handleClick = (index: number): void => {
    if (openRowIndex === index) {
      setOpenRowIndex(null);
    } else {
      setOpenRowIndex(index);
    }
    setOpenSubRowIndexes({});
  };

  const handleSubClick = (parentIndex: number, index: number): void => {
    setOpenSubRowIndexes((prevState) => ({
      ...prevState,
      [`${parentIndex}-${index}`]: !prevState[`${parentIndex}-${index}`]
    }));
  };

  if (!dataset || dataset?.length === 0) {
    return <GanttChartPlaceholder />;
  }

  return (
    <div ref={fRef} {...rest}>
      <GanttChartRowControls
        height={CONTROLS_ROW_HEIGHT}
        onScale={scaleChartBody}
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
          numOfRows={numOfRows}
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
            numOfRows={numOfRows}
          />
        ) : null}
        <GanttChartBodyColumn
          dataset={dataset}
          dimensions={dimensions}
          chartBodyScale={chartBodyScale}
          height={height}
          rowHeight={rowHeight}
          numOfRows={numOfRows}
          isDiscrete={isDiscrete}
          totalDuration={totalDuration}
          start={start}
          annotations={annotations}
          valueFormat={valueFormat}
          showAnnotation={showAnnotation}
          showVerticalLineOnHover={showVerticalLineOnHover}
          showStaticVerticalLine={showStaticVerticalLine}
          showStatus={showStatus}
          staticVerticalLinePosition={staticVerticalLinePosition}
          onTaskClick={onTaskClick}
          openRowIndex={openRowIndex}
          openSubRowIndexes={openSubRowIndexes}
          updateCurrentChartBodyWidth={updateCurrentChartBodyWidth}
        />
      </div>
    </div>
  );
});

GanttChart.displayName = 'GanttChart';

export { GanttChart };

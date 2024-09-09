import React from 'react';
import { GanttChartRowLabels } from '../headers/GanttChartRowLabels.js';
import { GanttChartRowTitle } from '../headers/GanttChartRowTitle.js';
import type { ColumnDataType, IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
import { COLUMN_HEADER_HEIGHT } from '../util/constants.js';
import { solidOutline } from '../util/styles.js';

export interface GanttChartColumnProps {
  height: number;
  width: number;
  columnTitle: string;
  rowHeight: number;
  dataset: IGanttChartRow[];
  dataType: ColumnDataType;
  handleClick?: (index: number) => void;
  handleSubClick?: (parentIndex: number, index: number) => void;
  openRowIndex: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
  numOfRows: number;
  showStatus?: boolean;
}

export const GanttChartColumn = (props: GanttChartColumnProps) => {
  const {
    height,
    width,
    columnTitle,
    rowHeight,
    dataset,
    dataType,
    handleClick,
    handleSubClick,
    openRowIndex,
    openSubRowIndexes,
    numOfRows,
    showStatus
  } = props;
  return (
    <div
      style={{
        width,
        height,
        textAlign: dataType === 'status' ? 'center' : 'left',
        borderRight: dataType === 'status' || !showStatus ? solidOutline : ''
      }}
    >
      <GanttChartRowTitle width={width} height={COLUMN_HEADER_HEIGHT} title={columnTitle} />
      <GanttChartRowLabels
        width={width}
        height={height - COLUMN_HEADER_HEIGHT}
        rowHeight={rowHeight}
        dataset={dataset}
        dataType={dataType}
        handleClick={handleClick ?? null}
        handleSubClick={handleSubClick ?? null}
        openRowIndex={openRowIndex}
        openSubRowIndexes={openSubRowIndexes}
        numOfRows={numOfRows}
      />
    </div>
  );
};

import React from 'react';
import type { CSSProperties } from 'react';
import type { IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
import { useStyles } from '../util/styles.js';
import { RowLabelItem } from './RowLabelItem.js';

export interface GanttChartRowLabelsProps {
  dataset: IGanttChartRow[];
  width: number;
  height: number;
  rowHeight: number;
  dataType: 'label' | 'status';
  handleClick?: (rowIndex: number) => void;
  handleSubClick?: (parentIndex: number, index: number) => void;
  openRowIndex: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
  numOfRows: number;
}

export const GanttChartRowLabels: React.FC<GanttChartRowLabelsProps> = (props) => {
  const {
    width,
    height,
    rowHeight,
    dataset,
    dataType,
    handleClick,
    handleSubClick,
    openRowIndex,
    openSubRowIndexes,
    numOfRows
  } = props;

  const classes = useStyles();

  const style: CSSProperties = {
    width: width,
    height: `${numOfRows * rowHeight}px`
  };

  return (
    <div style={{ height: height }}>
      <div className={classes.rowLabels} style={style}>
        {dataset.map((row, rowIndex) => {
          const showCollapseIcon = row.details?.length > 0 && dataType === 'label';
          return (
            <>
              <RowLabelItem
                key={rowIndex}
                padding="10px"
                collapseIcon={showCollapseIcon ? (openRowIndex === rowIndex ? '▼' : '▶') : null}
                onClick={() => handleClick(rowIndex)}
                isActive={true}
                rowHeight={rowHeight}
              >
                {row[dataType]}
              </RowLabelItem>
              {row.details?.map((detail, detailIndex) => {
                const showCollapseIcon = detail.subDetails?.length > 0 && dataType === 'label';
                return (
                  <>
                    <RowLabelItem
                      key={detailIndex}
                      padding={dataType === 'label' ? '20px' : '10px'}
                      collapseIcon={
                        showCollapseIcon ? (openSubRowIndexes[`${rowIndex}-${detailIndex}`] ? '▼' : '▶') : null
                      }
                      onClick={() => handleSubClick(rowIndex, detailIndex)}
                      isActive={openRowIndex === rowIndex}
                      rowHeight={rowHeight}
                    >
                      {detail[dataType]}
                    </RowLabelItem>
                    {detail.subDetails?.map((subDetail, subDetailIndex) => (
                      <RowLabelItem
                        key={subDetailIndex}
                        padding={dataType === 'label' ? '40px' : '10px'}
                        isActive={openSubRowIndexes[`${rowIndex}-${detailIndex}`]}
                        rowHeight={rowHeight}
                      >
                        {subDetail[dataType]}
                      </RowLabelItem>
                    ))}
                  </>
                );
              })}
            </>
          );
        })}
      </div>
    </div>
  );
};

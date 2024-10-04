import { Icon } from '@ui5/webcomponents-react';
import React from 'react';
import type { CSSProperties } from 'react';
import type { ColumnDataType, IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
import { ROW_CONTRACT_DURATION_HEIGHT } from '../util/constants.js';
import { useStyles } from '../util/styles.js';
import { RowLabelItem } from './RowLabelItem.js';

export interface GanttChartRowLabelsProps {
  dataset: IGanttChartRow[];
  width: number;
  height: number;
  rowHeight: number;
  dataType: ColumnDataType;
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
    height: `${numOfRows * rowHeight + ROW_CONTRACT_DURATION_HEIGHT}px`
  };

  return (
    <div style={{ height }}>
      <div className={classes.rowLabels} style={style}>
        <div style={{ height: ROW_CONTRACT_DURATION_HEIGHT }} />
        {dataset.map((row, rowIndex) => {
          const showCollapseIcon = row.subRows?.length > 0 && dataType === 'label';
          return (
            <React.Fragment key={`row-${rowIndex}`}>
              <RowLabelItem
                key={`item-${rowIndex}`}
                padding={showCollapseIcon ? '-10px' : '10px'}
                collapseIcon={
                  showCollapseIcon ? (
                    openRowIndex === rowIndex ? (
                      <Icon name="navigation-down-arrow" />
                    ) : (
                      <Icon name="navigation-right-arrow" />
                    )
                  ) : null
                }
                onClick={() => handleClick(rowIndex)}
                isActive={true}
                rowHeight={rowHeight}
                style={{ display: dataType === 'status' ? 'flex' : 'initial', border: "solid" }}
              >
                {row[dataType]}
              </RowLabelItem>
              {row.subRows?.map((subRow, detailIndex) => {
                const showCollapseIcon = subRow.subRows?.length > 0 && dataType === 'label';
                return (
                  <React.Fragment key={`row-detail-${detailIndex}`}>
                    <RowLabelItem
                      key={`detail-${detailIndex}`}
                      padding={dataType === 'label' ? '20px' : '10px'}
                      collapseIcon={
                        showCollapseIcon ? (
                          openSubRowIndexes[`${rowIndex}-${detailIndex}`] ? (
                            <Icon name="navigation-down-arrow" />
                          ) : (
                            <Icon name="navigation-right-arrow" />
                          )
                        ) : null
                      }
                      onClick={() => handleSubClick(rowIndex, detailIndex)}
                      isActive={openRowIndex === rowIndex}
                      rowHeight={rowHeight}
                    >
                      {subRow[dataType]}
                    </RowLabelItem>
                    {subRow.subRows?.map((subDetail, subDetailIndex) => (
                      <RowLabelItem
                        key={`subdetail-${subDetailIndex}`}
                        padding={dataType === 'label' ? '40px' : '10px'}
                        isActive={openSubRowIndexes[`${rowIndex}-${detailIndex}`]}
                        rowHeight={rowHeight}
                      >
                        {subDetail[dataType]}
                      </RowLabelItem>
                    ))}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

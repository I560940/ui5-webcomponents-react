import { Icon } from '@ui5/webcomponents-react';
import React from 'react';
import type { CSSProperties } from 'react';
import type { ColumnDataType, IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
import { ROW_CONTRACT_DURATION_HEIGHT } from '../util/constants.js';
import { useStyles } from '../util/styles.js';
import { RowLabelItem } from './RowLabelItem.js';

export interface GanttChartRowLabelsProps {
  dataset: IGanttChartRow[];
  height: number;
  rowHeight: number;
  dataType: ColumnDataType;
  handleClick?: (rowIndex: number) => void;
  handleSubClick?: (parentIndex: number, index: number) => void;
  openRowIndexes: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
  numOfRows: number;
}

export const GanttChartRowLabels: React.FC<GanttChartRowLabelsProps> = (props) => {
  const {
    height,
    rowHeight,
    dataset,
    dataType,
    handleClick,
    handleSubClick,
    openRowIndexes,
    openSubRowIndexes,
    numOfRows
  } = props;

  const classes = useStyles();

  const statusPadding = '0px';

  const style: CSSProperties = {
    height: `${numOfRows * rowHeight + ROW_CONTRACT_DURATION_HEIGHT}px`,
  };

  return (
    <div style={{ height }}>
      <div className={classes.rowLabels} style={style}>
        <div style={{ height: ROW_CONTRACT_DURATION_HEIGHT }} />
        {dataset.map((row, rowIndex) => {
          const showCollapseIcon = row.subRows?.length > 0 && dataType === 'label';
          return (
            <div key={`row-${rowIndex}`}>
              <RowLabelItem
                key={`item-${rowIndex}`}
                padding={showCollapseIcon ? '0px' : dataType === 'status' ? statusPadding : '25px'}
                collapseIcon={
                  showCollapseIcon ? (
                    openRowIndexes.includes(rowIndex) ? (
                      <Icon name="navigation-down-arrow" />
                    ) : (
                      <Icon name="navigation-right-arrow" />
                    )
                  ) : null
                }
                onClick={() => handleClick(rowIndex)}
                isActive={true}
                rowHeight={rowHeight}
                style={{
                  display: dataType === 'status' ? 'flex' : 'initial',
                  border: 'solid'
                }}
              >
                <span
                  title={row[dataType]}
                  style={{
                    marginRight: dataType === 'status' && 10
                  }}
                >
                  {row[dataType]}
                </span>
              </RowLabelItem>
              {row.subRows?.map((subRow, detailIndex) => {
                const showCollapseIcon = subRow.subRows?.length > 0 && dataType === 'label';
                return (
                  <React.Fragment key={`row-detail-${detailIndex}`}>
                    <RowLabelItem
                      key={`detail-${detailIndex}`}
                      padding={showCollapseIcon ? '10px' : dataType === 'status' ? statusPadding : '35px'}
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
                      isActive={openRowIndexes.includes(rowIndex)}
                      rowHeight={rowHeight}
                      style={{ display: dataType === 'status' ? 'flex' : 'initial' }}
                    >
                      <span title={subRow[dataType]}>{subRow[dataType]}</span>
                    </RowLabelItem>
                    {subRow.subRows?.map((subDetail, subDetailIndex) => (
                      <RowLabelItem
                        key={`subdetail-${subDetailIndex}`}
                        padding={dataType === 'label' ? '50px' : statusPadding}
                        isActive={openSubRowIndexes[`${rowIndex}-${detailIndex}`]}
                        rowHeight={rowHeight}
                      >
                        <span title={subDetail[dataType]}>{subDetail[dataType]}</span>
                      </RowLabelItem>
                    ))}
                  </React.Fragment>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { useStyles } from '../util/styles.js';
import { RowLabelItem } from './RowLabelItem.js';
export const GanttChartRowLabels = (props) => {
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
  const style = {
    width: width,
    height: `${numOfRows * rowHeight}px`
  };
  return React.createElement(
    'div',
    { style: { height: height } },
    React.createElement(
      'div',
      { className: classes.rowLabels, style: style },
      dataset.map((row, rowIndex) => {
        const showCollapseIcon = row.details?.length > 0 && dataType === 'label';
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            RowLabelItem,
            {
              key: rowIndex,
              padding: '10px',
              collapseIcon: showCollapseIcon ? (openRowIndex === rowIndex ? '▼' : '▶') : null,
              onClick: () => handleClick(rowIndex),
              isActive: true,
              rowHeight: rowHeight
            },
            row[dataType]
          ),
          row.details?.map((detail, detailIndex) => {
            const showCollapseIcon = detail.subDetails?.length > 0 && dataType === 'label';
            return React.createElement(
              React.Fragment,
              null,
              React.createElement(
                RowLabelItem,
                {
                  key: detailIndex,
                  padding: dataType === 'label' ? '20px' : '10px',
                  collapseIcon: showCollapseIcon
                    ? openSubRowIndexes[`${rowIndex}-${detailIndex}`]
                      ? '▼'
                      : '▶'
                    : null,
                  onClick: () => handleSubClick(rowIndex, detailIndex),
                  isActive: openRowIndex === rowIndex,
                  rowHeight: rowHeight
                },
                detail[dataType]
              ),
              detail.subDetails?.map((subDetail, subDetailIndex) =>
                React.createElement(
                  RowLabelItem,
                  {
                    key: subDetailIndex,
                    padding: dataType === 'label' ? '40px' : '10px',
                    isActive: openSubRowIndexes[`${rowIndex}-${detailIndex}`],
                    rowHeight: rowHeight
                  },
                  subDetail[dataType]
                )
              )
            );
          })
        );
      })
    )
  );
};

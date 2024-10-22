import { Icon } from '@ui5/webcomponents-react';
import React from 'react';
import { ROW_CONTRACT_DURATION_HEIGHT } from '../util/constants.js';
import { useStyles } from '../util/styles.js';
import { RowLabelItem } from './RowLabelItem.js';
export const GanttChartRowLabels = (props) => {
    const { width, height, rowHeight, dataset, dataType, handleClick, handleSubClick, openRowIndex, openSubRowIndexes, numOfRows } = props;
    const classes = useStyles();
    const statusPadding = '0px';
    const style = {
        width: width,
        height: `${numOfRows * rowHeight + ROW_CONTRACT_DURATION_HEIGHT}px`
    };
    return (React.createElement("div", { style: { height } },
        React.createElement("div", { className: classes.rowLabels, style: style },
            React.createElement("div", { style: { height: ROW_CONTRACT_DURATION_HEIGHT } }),
            dataset.map((row, rowIndex) => {
                const showCollapseIcon = row.subRows?.length > 0 && dataType === 'label';
                return (React.createElement("div", { key: `row-${rowIndex}` },
                    React.createElement(RowLabelItem, { key: `item-${rowIndex}`, padding: showCollapseIcon ? '0px' : dataType === 'status' ? statusPadding : '25px', collapseIcon: showCollapseIcon ? (openRowIndex === rowIndex ? (React.createElement(Icon, { name: "navigation-down-arrow" })) : (React.createElement(Icon, { name: "navigation-right-arrow" }))) : null, onClick: () => handleClick(rowIndex), isActive: true, rowHeight: rowHeight, style: {
                            display: dataType === 'status' ? 'flex' : 'initial',
                            border: 'solid'
                        } }, row[dataType]),
                    row.subRows?.map((subRow, detailIndex) => {
                        const showCollapseIcon = subRow.subRows?.length > 0 && dataType === 'label';
                        return (React.createElement(React.Fragment, { key: `row-detail-${detailIndex}` },
                            React.createElement(RowLabelItem, { key: `detail-${detailIndex}`, padding: showCollapseIcon ? '10px' : dataType === 'status' ? statusPadding : '35px', collapseIcon: showCollapseIcon ? (openSubRowIndexes[`${rowIndex}-${detailIndex}`] ? (React.createElement(Icon, { name: "navigation-down-arrow" })) : (React.createElement(Icon, { name: "navigation-right-arrow" }))) : null, onClick: () => handleSubClick(rowIndex, detailIndex), isActive: openRowIndex === rowIndex, rowHeight: rowHeight, style: { display: dataType === 'status' ? 'flex' : 'initial' } }, subRow[dataType]),
                            subRow.subRows?.map((subDetail, subDetailIndex) => (React.createElement(RowLabelItem, { key: `subdetail-${subDetailIndex}`, padding: dataType === 'label' ? '50px' : statusPadding, isActive: openSubRowIndexes[`${rowIndex}-${detailIndex}`], rowHeight: rowHeight }, subDetail[dataType])))));
                    })));
            }))));
};

import React from 'react';
import { useStyles } from '../util/styles.js';
export const RowLabelItem = (props) => {
  const { padding, children, collapseIcon, onClick, isActive, rowHeight } = props;
  const classes = useStyles();
  const itemStyle = {
    height: `${rowHeight}px`,
    lineHeight: `${rowHeight}px`
  };
  return React.createElement(
    'div',
    {
      className: `${classes.rowLabelsItem} ${isActive ? classes.collapseContentActive : classes.collapseContent}`,
      style: itemStyle
    },
    React.createElement(
      'span',
      { style: { paddingInline: padding } },
      collapseIcon && React.createElement('span', { className: classes.collapseIcon, onClick: onClick }, collapseIcon),
      children
    )
  );
};

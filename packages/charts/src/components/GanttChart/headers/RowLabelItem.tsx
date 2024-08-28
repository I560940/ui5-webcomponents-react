import React from 'react';
import type { CSSProperties } from 'react';
import { useStyles } from '../util/styles.js';

export interface RowLabelItemProps {
  padding: string;
  collapseIcon?: string | null;
  onClick?: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  rowHeight: number;
}

export const RowLabelItem: React.FC<RowLabelItemProps> = (props) => {
  const { padding, children, collapseIcon, onClick, isActive, rowHeight } = props;

  const classes = useStyles();

  const itemStyle: CSSProperties = {
    height: `${rowHeight}px`,
    lineHeight: `${rowHeight}px`
  };

  return (
    <div
      className={`${classes.rowLabelsItem} ${isActive ? classes.collapseContentActive : classes.collapseContent}`}
      style={itemStyle}
    >
      <span style={{ paddingInline: padding }}>
        {collapseIcon && (
          <span className={classes.collapseIcon} onClick={onClick}>
            {collapseIcon}
          </span>
        )}
        {children}
      </span>
    </div>
  );
};

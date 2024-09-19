import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useStyles } from '../util/styles.js';

export interface RowLabelItemProps {
  padding: string;
  collapseIcon?: ReactNode | null;
  onClick?: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  rowHeight: number;
  style?: CSSProperties;
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
      <span style={{ paddingInlineStart: padding, fontSize: 14, color: ThemingParameters.sapList_TextColor }}>
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

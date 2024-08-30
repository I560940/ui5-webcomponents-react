import React from 'react';
export interface RowLabelItemProps {
  padding: string;
  collapseIcon?: string | null;
  onClick?: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  rowHeight: number;
}
export declare const RowLabelItem: React.FC<RowLabelItemProps>;

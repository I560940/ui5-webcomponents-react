import type { IGanttChartRow, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
export declare const useCollapsableRows: (dataset: IGanttChartRow[]) => {
  openRowIndex: number;
  openSubRowIndexes: OpenSubRowIndexes;
  numberOfRows: number;
  handleClick: (index: number) => void;
  handleSubClick: (parentIndex: number, index: number) => void;
};

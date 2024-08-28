import type { IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';

export const countAllRows = (
  rows: IGanttChartRow[],
  openRowIndex: OpenRowIndex,
  openSubRowIndexes: OpenSubRowIndexes
): number => {
  let count = 0;

  rows?.forEach((row, rowIndex) => {
    count++;
    if (row.details && rowIndex === openRowIndex) {
      row.details.forEach((detail, detailIndex) => {
        count++;

        if (detail.subDetails && openSubRowIndexes[`${rowIndex}-${detailIndex}`]) {
          detail.subDetails.forEach(() => {
            count++;
          });
        }
      });
    }
  });

  return count;
};

export const flattenDataset = (
  dataset: IGanttChartRow[],
  openRowIndex: OpenRowIndex,
  openSubRowIndexes: OpenSubRowIndexes
): IGanttChartRow[] => {
  const flattenedDataset = [];
  dataset?.forEach((row, rowIndex) => {
    flattenedDataset.push(row);
    if (row.details && rowIndex === openRowIndex) {
      row.details.forEach((detail, detailIndex) => {
        flattenedDataset.push(detail);
        if (detail.subDetails && openSubRowIndexes[`${rowIndex}-${detailIndex}`]) {
          detail.subDetails.forEach((subDetail) => {
            flattenedDataset.push(subDetail);
          });
        }
      });
    }
  });
  return flattenedDataset;
};

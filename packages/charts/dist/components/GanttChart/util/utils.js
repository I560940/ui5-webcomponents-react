import { differenceInDays, endOfMonth, formatDistanceStrict, startOfMonth } from 'date-fns/fp';
/**
 * Function to count all rows in a dataset of Gantt chart rows, including nested details and sub-details.
 * It calculates the total number of rows based on the expanded rows and sub-rows determined by the provided open row and sub-row indexes.
 *
 * @param {IGanttChartRow[]} rows - The dataset of Gantt chart rows to count.
 * @param {OpenRowIndex} openRowIndex - The index of the row that is currently expanded.
 * @param {OpenSubRowIndexes} openSubRowIndexes - An object mapping the indexes of expanded sub-rows.
 *
 * @returns {number} - The total count of rows, including expanded rows and sub-rows.
 */
export const countAllRows = (rows, openRowIndex, openSubRowIndexes) => {
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
/**
 * Function to flatten a dataset of Gantt chart rows, including nested details and sub-details.
 * It processes the dataset to include the expanded rows based on the specified open row and sub-row indexes.
 *
 * @param {IGanttChartRow[]} dataset - The original dataset containing Gantt chart rows.
 * @param {OpenRowIndex} openRowIndex - The index of the row that is currently expanded.
 * @param {OpenSubRowIndexes} openSubRowIndexes - An object mapping the indexes of expanded sub-rows.
 *
 * @returns {IGanttChartRow[]} - The flattened dataset, including expanded rows and sub-rows.
 */
export const flattenDataset = (dataset, openRowIndex, openSubRowIndexes) => {
  const flattenedDataset = [];
  const flattenSubDetails = (subDetails) => {
    subDetails.forEach((subDetail) => {
      flattenedDataset.push(subDetail);
    });
  };
  const flattenDetails = (details, rowIndex) => {
    details.forEach((detail, detailIndex) => {
      flattenedDataset.push(detail);
      if (detail.subDetails && openSubRowIndexes[`${rowIndex}-${detailIndex}`]) {
        flattenSubDetails(detail.subDetails);
      }
    });
  };
  dataset?.forEach((row, rowIndex) => {
    flattenedDataset.push(row);
    if (row.details && rowIndex === openRowIndex) {
      flattenDetails(row.details, rowIndex);
    }
  });
  return flattenedDataset;
};
/**
 * Formats the duration between the start and end dates of a contract.
 * It calculates the strict time difference between the two dates and returns the result in a human-readable format.
 *
 * @param {DateRange} contractDuration - An object containing `dateStart` and `dateEnd` properties representing the contract's duration.
 * @returns {string | null} - A formatted string representing the strict difference between the start and end dates (e.g., "3 months", "1 year"), or `null` if the input is invalid.
 */
export const formatContractDuration = (contractDuration) => {
  if (!contractDuration || !contractDuration.dateStart || !contractDuration.dateEnd) {
    return null;
  }
  return formatDistanceStrict(new Date(contractDuration.dateStart), new Date(contractDuration.dateEnd));
};
/**
 * Calculates the total duration of a contract in days.
 * It computes the difference between the start and end dates of the contract in terms of days.
 *
 * @param {DateRange} contractDuration - An object containing `dateStart` and `dateEnd` properties representing the contract's duration.
 * @returns {number | null} - The total number of days between the start and end dates, or `null` if the input is invalid.
 */
export const calculateTotalDuration = (contractDuration) => {
  const { dateStart, dateEnd } = contractDuration;
  if (!dateStart || !dateEnd) {
    return null;
  }
  const start = startOfMonth(new Date(dateStart));
  const end = endOfMonth(new Date(dateEnd));
  return differenceInDays(start, end);
};

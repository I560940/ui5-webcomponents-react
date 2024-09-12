import {
  differenceInDays,
  eachMonthOfInterval,
  eachQuarterOfInterval,
  eachYearOfInterval,
  format,
  formatDistanceStrict,
  getDaysInMonth,
  getDaysInYear
} from 'date-fns/fp';
import type { DateRange, IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
import { MONTH_NAMES } from './constants.js';

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
export const flattenDataset = (
  dataset: IGanttChartRow[],
  openRowIndex: OpenRowIndex,
  openSubRowIndexes: OpenSubRowIndexes
): IGanttChartRow[] => {
  const flattenedDataset = [];

  const flattenSubDetails = (subDetails: IGanttChartRow[]) => {
    subDetails.forEach((subDetail) => {
      flattenedDataset.push(subDetail);
    });
  };

  const flattenDetails = (details: IGanttChartRow[], rowIndex: number) => {
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

export const formatContractDuration = (contractDuration: DateRange): string | null => {
  if (!contractDuration) {
    return null;
  }
  return formatDistanceStrict(contractDuration.dateStart, contractDuration.dateEnd);
};

/**
 * Calculates the total duration of a contract in days.
 * It computes the difference between the start and end dates of the contract in terms of days.
 *
 * @param {DateRange} contractDuration - An object containing `dateStart` and `dateEnd` properties representing the contract's duration.
 * @returns {number | null} - The total number of days between the start and end dates, or `null` if the input is invalid.
 */

export const calculateTotalDuration = (contractDuration: DateRange): number | null => {
  if (!contractDuration) {
    return null;
  }
  return differenceInDays(contractDuration.dateStart, contractDuration.dateEnd);
};

/**
 * Calculates the number of days in each month between two given dates.
 * It returns an array of objects, where each object contains the number of days in the month, the month label, and the corresponding year.
 *
 * @param {string} startDate - The start date of the interval in string format.
 * @param {string} endDate - The end date of the interval in string format.
 * @returns {Array<{ days: number, labelMonth: string, labelYear: string }>} - An array of objects where each object contains:
 *   - `days`: The number of days in the month.
 *   - `labelMonth`: The month name in abbreviated form (e.g., "Jan", "Feb").
 *   - `labelYear`: The year of the month.
 */

export const monthsAsNumberOfDays = (startDate: string, endDate: string) => {
  const months = eachMonthOfInterval({ start: startDate, end: endDate });

  return months.map((month) => ({
    days: getDaysInMonth(month),
    labelMonth: MONTH_NAMES[month.getMonth()],
    labelYear: month.getFullYear().toString()
  }));
};

/**
 * Calculates the number of days in each year between two given dates.
 * It returns an array of objects, where each object contains the number of days in the year and the corresponding year label.
 *
 * @param {string} startDate - The start date of the interval in string format.
 * @param {string} endDate - The end date of the interval in string format.
 * @returns {Array<{ days: number, labelYear: string }>} - An array of objects where each object contains:
 *   - `days`: The number of days in the year.
 *   - `labelYear`: The year in string format.
 */

export const yearsAsNumberOfDays = (startDate: string, endDate: string) => {
  const years = eachYearOfInterval({ start: startDate, end: endDate });

  return years.map((year) => ({
    days: getDaysInYear(year),
    labelYear: year.getFullYear().toString()
  }));
};

/**
 * Calculates the number of days in each quarter between two given dates.
 * It returns an array of objects, where each object contains the number of days in the quarter and the corresponding quarter label.
 * The last quarter's duration is calculated up to the end date provided.
 *
 * @param {string} startDate - The start date of the interval in string format.
 * @param {string} endDate - The end date of the interval in string format.
 * @returns {Array<{ days: number, quarterLabel: string }>} - An array of objects where each object contains:
 *   - `days`: The number of days in the quarter.
 *   - `quarterLabel`: The label of the quarter in the format "Q1", "Q2", "Q3", "Q4".
 */

export const quatersAsNumberOfDays = (startDate: string, endDate: string) => {
  const quarters = eachQuarterOfInterval({ start: startDate, end: endDate });

  return quarters.map((quarter, index) => {
    let daysInQuarter: number;

    if (index === quarters.length - 1) {
      daysInQuarter = differenceInDays(quarter, endDate);
    } else {
      const nextQuarter = quarters[index + 1];
      daysInQuarter = differenceInDays(quarter, nextQuarter);
    }

    const quarterLabel = format('qqq', quarter);
    return { days: daysInQuarter, quarterLabel };
  });
};

/**
 * Generates an array of day numbers for each month provided in the input.
 * It creates a flat array where each element represents a day, with the total number of days
 * accumulated across all months in the provided `monthsArray`.
 *
 * @param {Array<{ days: number, labelMonth: string, labelYear: string }>} monthsArray - An array of objects where each object represents a month with:
 *   - `days`: The number of days in the month.
 *   - `labelMonth`: The name or label of the month.
 *   - `labelYear`: The year corresponding to the month.
 * @returns {number[]} - An array of numbers where each number represents a day, starting from 1 up to the total number of days across all months.
 */

export const prepareDaysArray = (
  monthsArray: {
    days: number;
    labelMonth: string;
    labelYear: string;
  }[]
): number[] => {
  const totalDays = monthsArray.reduce((acc, month) => acc + month.days, 0);
  const result = new Array(totalDays);

  let index = 0;

  monthsArray.forEach((month) => {
    for (let i = 1; i <= month.days; i++) {
      result[index++] = i;
    }
  });

  return result;
};

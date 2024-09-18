import {
  differenceInDays,
  eachMonthOfInterval,
  eachQuarterOfInterval,
  eachYearOfInterval,
  endOfMonth,
  endOfQuarter,
  endOfYear,
  formatDistanceStrict,
  getDaysInMonth,
  getQuarter,
  max,
  min
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
 * Prepares timeline data based on the contract duration, broken down into months, quarters, and years.
 *
 * This function calculates the total number of days for each month, quarter, and year within the contract's
 * duration, and organizes the data in a structured format for timeline visualization.
 *
 * @param {DateRange} contractDuration - An object containing `dateStart` and `dateEnd` properties representing the contract's duration.
 * @returns {Object} - An object containing three arrays: `months`, `quarters`, and `years`.
 *
 * @property {Array} months - An array of objects representing each month within the contract duration.
 * @property {string} months[].name - The name of the month (e.g., "January").
 * @property {string} months[].year - The year the month belongs to.
 * @property {number} months[].days - The total number of days in the month.
 *
 * @property {Array} quarters - An array of objects representing each quarter within the contract duration.
 * @property {string} quarters[].name - The name of the quarter (e.g., "Q1").
 * @property {number} quarters[].days - The total number of days in the quarter.
 *
 * @property {Array} years - An array of objects representing each year within the contract duration.
 * @property {string} years[].name - The year as a string.
 * @property {number} years[].days - The total number of days in the year.
 *
 * Example usage:
 *
 * const contractDuration = { dateStart: new Date('2022-01-01'), dateEnd: new Date('2023-12-31') };
 * const timelineData = prepareTimelineData(contractDuration);
 *
 * console.log(timelineData.months); // [{ name: 'January', year: '2022', days: 31 }, ... ]
 * console.log(timelineData.quarters); // [{ name: 'Q1', days: 90 }, ... ]
 * console.log(timelineData.years); // [{ name: '2022', days: 365 }, ... ]
 */

export const prepareTimelineData = (contractDuration: DateRange) => {
  const { dateStart, dateEnd } = contractDuration;
  const start = new Date(dateStart);
  const end = new Date(dateEnd);

  const months = eachMonthOfInterval({ start, end }).map((month) => ({
    name: MONTH_NAMES[month.getMonth()],
    year: month.getFullYear().toString(),
    days: getDaysInMonth(month)
  }));

  const quarters = eachQuarterOfInterval({ start, end }).map((quarterStart) => {
    const quarterEnd = endOfQuarter(quarterStart);
    const actualStart = max([quarterStart, start]);
    const actualEnd = min([quarterEnd, end]);
    const months = eachMonthOfInterval({ start: actualStart, end: actualEnd });
    const daysInQuarter = months.reduce((totalDays, monthStart) => {
      const monthEnd = endOfMonth(monthStart);
      const daysInMonth = differenceInDays(monthStart, monthEnd) + 1;
      return totalDays + daysInMonth;
    }, 0);

    return {
      name: `Q${getQuarter(quarterStart)}`,
      days: daysInQuarter
    };
  });

  const years = eachYearOfInterval({ start, end }).map((yearStart) => {
    const actualStart = max([yearStart, start]);
    const yearEnd = endOfYear(yearStart);
    const months = eachMonthOfInterval({ start: actualStart, end: yearEnd }).map((monthStart) => {
      const monthEnd = endOfMonth(monthStart);
      const daysInMonth = differenceInDays(monthStart, monthEnd) + 1;
      return daysInMonth;
    });
    const totalDaysInYear = months.reduce((sum, days) => sum + days, 0);
    return {
      name: yearStart.getFullYear().toString(),
      days: totalDaysInYear
    };
  });

  return { months, quarters, years };
};

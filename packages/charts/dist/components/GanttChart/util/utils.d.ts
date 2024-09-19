import type { DateRange, IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
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
export declare const countAllRows: (
  rows: IGanttChartRow[],
  openRowIndex: OpenRowIndex,
  openSubRowIndexes: OpenSubRowIndexes
) => number;
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
export declare const flattenDataset: (
  dataset: IGanttChartRow[],
  openRowIndex: OpenRowIndex,
  openSubRowIndexes: OpenSubRowIndexes
) => IGanttChartRow[];
/**
 * Formats the duration between the start and end dates of a contract.
 * It calculates the strict time difference between the two dates and returns the result in a human-readable format.
 *
 * @param {DateRange} contractDuration - An object containing `dateStart` and `dateEnd` properties representing the contract's duration.
 * @returns {string | null} - A formatted string representing the strict difference between the start and end dates (e.g., "3 months", "1 year"), or `null` if the input is invalid.
 */
export declare const formatContractDuration: (contractDuration: DateRange) => string | null;
/**
 * Calculates the total duration of a contract in days.
 * It computes the difference between the start and end dates of the contract in terms of days.
 *
 * @param {DateRange} contractDuration - An object containing `dateStart` and `dateEnd` properties representing the contract's duration.
 * @returns {number | null} - The total number of days between the start and end dates, or `null` if the input is invalid.
 */
export declare const calculateTotalDuration: (contractDuration: DateRange) => number | null;
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
export declare const prepareTimelineData: (contractDuration: DateRange) => {
  months: {
    name: string;
    year: string;
    days: number;
  }[];
  quarters: {
    name: string;
    days: number;
  }[];
  years: {
    name: string;
    days: number;
  }[];
};

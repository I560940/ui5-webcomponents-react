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
/**
 * Counts the duration of a task in days.
 *
 * @param {string} dateStart - The start date of the task in ISO format.
 * @param {string} dateEnd - The end date of the task in ISO format.
 *
 * @returns {number} - The duration of the task in days.
 */
export const countTaskDuration = (dateStart, dateEnd) => {
    const start = new Date(dateStart);
    const end = new Date(dateEnd);
    const diffInMilliseconds = Math.abs(end.getTime() - start.getTime());
    return diffInMilliseconds / (1000 * 60 * 60 * 24);
};
export const getTaskStartTime = (contractStartDate, taskStartDate) => {
    const contractStart = new Date(contractStartDate);
    const taskStart = new Date(taskStartDate);
    const diffInMilliseconds = Math.abs(contractStart.getTime() - taskStart.getTime());
    return diffInMilliseconds / (1000 * 60 * 60 * 24) - 1;
};
export const getEventStartTime = (contractStartDate, date) => {
    const eventDate = new Date(date);
    const contractStart = new Date(contractStartDate);
    const diffInMilliseconds = Math.abs(contractStart.getTime() - eventDate.getTime());
    return diffInMilliseconds / (1000 * 60 * 60 * 24);
};

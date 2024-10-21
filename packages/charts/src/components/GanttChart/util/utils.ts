import { differenceInDays, endOfMonth, formatDistanceStrict, startOfMonth } from 'date-fns/fp';
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
export const countAllRows = (
  rows: IGanttChartRow[],
  openRowIndex: OpenRowIndex,
  openSubRowIndexes: OpenSubRowIndexes
): number => {
  let count = 0;

  rows?.forEach((row, rowIndex) => {
    count++;
    if (row.subRows && rowIndex === openRowIndex) {
      row.subRows.forEach((detail, detailIndex) => {
        count++;

        if (detail.subRows && openSubRowIndexes[`${rowIndex}-${detailIndex}`]) {
          detail.subRows.forEach(() => {
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

export const formatContractDuration = (contractDuration: DateRange): string | null => {
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

export const calculateTotalDuration = (contractDuration: DateRange): number | null => {
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
export const countTaskDuration = (dateStart: string, dateEnd: string): number => {
  const start = new Date(dateStart);
  const end = new Date(dateEnd);
  const diffInMilliseconds = Math.abs(end.getTime() - start.getTime());
  return diffInMilliseconds / (1000 * 60 * 60 * 24);
};

/**
 * Calculates the start time of a task relative to the contract start date.
 *
 * @param {string} contractStartDate - The start date of the contract in ISO format.
 * @param {string} taskStartDate - The start date of the task in ISO format.
 *
 * @returns {number} - The start time of the task relative to the contract start date.
 */
export const getStartTime = (contractStartDate: string, taskStartDate: string): number => {
  const contractStart = new Date(contractStartDate);
  const taskStart = new Date(taskStartDate);
  const diffInMilliseconds = Math.abs(contractStart.getTime() - taskStart.getTime());
  return diffInMilliseconds / (1000 * 60 * 60 * 24) - 1;
};

/**
 * Function to flatten a dataset of Gantt chart rows, including nested subRows and theirs nested subRows.
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

  const flattenSubDetails = (subRows: IGanttChartRow[]) => {
    subRows.forEach((subRow) => {
      flattenedDataset.push(subRow);
    });
  };

  const flattenDetails = (subRows: IGanttChartRow[], rowIndex: number) => {
    subRows.forEach((subRow, detailIndex) => {
      flattenedDataset.push(subRow);
      if (subRow.subRows && openSubRowIndexes[`${rowIndex}-${detailIndex}`]) {
        flattenSubDetails(subRow.subRows);
      }
    });
  };

  dataset?.forEach((row, rowIndex) => {
    flattenedDataset.push(row);
    if (row.subRows && rowIndex === openRowIndex) {
      flattenDetails(row.subRows, rowIndex);
    }
  });

  return flattenedDataset;
};

/**
 * Groups overlapping events in the Gantt chart. It groups events that are close to each other in time and space.
 * The grouping is based on the distance between the events' start times and their positions on the chart.
 *
 * @param {IGanttChartEvent[]} events - The list of events to group.
 * @param {string} contractStartDate - The start date of the contract in ISO format.
 * @param {number} GanttStart - The start time of the Gantt chart in days.
 * @param {number} totalDuration - The total duration of the Gantt chart in days.
 * @param {number} chartBodyScale - The scale of the Gantt chart body.
 * @param {number} svgWidth - The width of the SVG element containing the Gantt chart.
 * @param {number} iconSize - The size of the event icons.
 */
export const groupOverlappingEvents = (
  events,
  contractStartDate,
  GanttStart,
  totalDuration,
  chartBodyScale,
  svgWidth,
  iconSize
) => {
  const baseThresholdPx = iconSize;
  const minOverlapThresholdPx = iconSize * 0.9;
  const overlapThresholdPx = Math.max(baseThresholdPx / chartBodyScale, minOverlapThresholdPx);

  //@ts-expect-error - to be reviewed later, the function works correctly
  const sortedEvents = events.slice().sort((a, b) => new Date(a.date) - new Date(b.date));

  const groups = [];
  let currentGroup = [];
  let groupStartPositionPx = null;

  sortedEvents.forEach((event) => {
    const startTime = getStartTime(contractStartDate, event.date);
    const positionPx = ((startTime + 1.2 - GanttStart) / totalDuration) * svgWidth;
    const eventWithStartTime = { ...event, startTime, positionPx };

    if (currentGroup.length === 0) {
      currentGroup.push(eventWithStartTime);
      groupStartPositionPx = positionPx;
    } else {
      if (positionPx - groupStartPositionPx <= overlapThresholdPx) {
        currentGroup.push(eventWithStartTime);
      } else {
        groups.push({
          key: currentGroup.map((e) => e.date + e.icon).join('-'),
          events: currentGroup,
          startTime: currentGroup[0].startTime,
          positionPx: currentGroup[0].positionPx
        });
        currentGroup = [eventWithStartTime];
        groupStartPositionPx = positionPx;
      }
    }
  });

  if (currentGroup.length > 0) {
    groups.push({
      key: currentGroup.map((e) => e.date + e.icon).join('-'),
      events: currentGroup,
      startTime: currentGroup[0].startTime,
      positionPx: currentGroup[0].positionPx
    });
  }

  return groups;
};

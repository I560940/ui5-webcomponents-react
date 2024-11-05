import { differenceInDays, endOfMonth, formatDistanceStrict, startOfMonth } from 'date-fns/fp';
import type {
  DateRange,
  IEventsGroup,
  IGanttChartEvent,
  IGanttChartRow,
  OpenRowIndex,
  OpenSubRowIndexes
} from '../types/GanttChartTypes.js';

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

export const groupOverlappingEvents = (
  events: IGanttChartEvent[],
  contractStartDate: string,
  GanttStart: number,
  totalDuration: number,
  svgWidth: number,
  iconSize: number
): IEventsGroup[] => {
  const eventsWithPositions = events.map((event) => {
    const startTime = getStartTime(contractStartDate, event.date) + 1.3;
    const positionPx = ((startTime - GanttStart) / totalDuration) * svgWidth;
    return { ...event, startTime, positionPx };
  });

  const sortedEvents = eventsWithPositions.sort((a, b) => a.positionPx - b.positionPx);

  const overlapThresholdPx = iconSize;

  const groups: IEventsGroup[] = [];
  let currentGroup: IGanttChartEvent[] = [];
  let groupPositionPx: number | null = null;

  sortedEvents.forEach((event) => {
    if (currentGroup.length === 0) {
      currentGroup.push(event);
      groupPositionPx = event.positionPx;
    } else {
      const distance = event.positionPx - groupPositionPx;
      if (distance < overlapThresholdPx) {
        currentGroup.push(event);
      } else {
        groups.push({
          key: currentGroup.map((e) => e.id || e.date).join('-'),
          events: currentGroup,
          startTime: currentGroup[0].startTime,
          positionPx: groupPositionPx
        });
        currentGroup = [event];
        groupPositionPx = event.positionPx;
      }
    }
  });

  if (currentGroup.length > 0) {
    groups.push({
      key: currentGroup.map((e) => e.id || e.date).join('-'),
      events: currentGroup,
      startTime: currentGroup[0].startTime,
      positionPx: groupPositionPx
    });
  }

  return groups;
};

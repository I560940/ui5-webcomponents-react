import { useEffect, useState } from 'react';
import type { IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
import { countAllRows } from '../util/utils.js';

export const useCollapsableRows = (dataset: IGanttChartRow[]) => {
  const [openRowIndex, setOpenRowIndex] = useState<OpenRowIndex>(null);
  const [openSubRowIndexes, setOpenSubRowIndexes] = useState<OpenSubRowIndexes>({});
  const [numberOfRows, setNumberOfRows] = useState<number>(() =>
    countAllRows(dataset, openRowIndex, openSubRowIndexes)
  );

  useEffect(() => {
    setNumberOfRows(() => countAllRows(dataset, openRowIndex, openSubRowIndexes));
  }, [dataset, numberOfRows, openRowIndex, openSubRowIndexes]);

  const handleClick = (index: number): void => {
    if (openRowIndex === index) {
      setOpenRowIndex(null);
    } else {
      setOpenRowIndex(index);
    }
    setOpenSubRowIndexes({});
  };

  const handleSubClick = (parentIndex: number, index: number): void => {
    setOpenSubRowIndexes((prevState) => ({
      ...prevState,
      [`${parentIndex}-${index}`]: !prevState[`${parentIndex}-${index}`]
    }));
  };

  return { openRowIndex, openSubRowIndexes, numberOfRows, handleClick, handleSubClick };
};

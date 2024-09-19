import { useEffect, useState } from 'react';
import { countAllRows } from '../util/utils.js';
export const useCollapsableRows = (dataset) => {
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const [openSubRowIndexes, setOpenSubRowIndexes] = useState({});
  const [numberOfRows, setNumberOfRows] = useState(() => countAllRows(dataset, openRowIndex, openSubRowIndexes));
  useEffect(() => {
    setNumberOfRows(() => countAllRows(dataset, openRowIndex, openSubRowIndexes));
  }, [dataset, numberOfRows, openRowIndex, openSubRowIndexes]);
  const handleClick = (index) => {
    if (openRowIndex === index) {
      setOpenRowIndex(null);
    } else {
      setOpenRowIndex(index);
    }
    setOpenSubRowIndexes({});
  };
  const handleSubClick = (parentIndex, index) => {
    setOpenSubRowIndexes((prevState) => ({
      ...prevState,
      [`${parentIndex}-${index}`]: !prevState[`${parentIndex}-${index}`]
    }));
  };
  return { openRowIndex, openSubRowIndexes, numberOfRows, handleClick, handleSubClick };
};

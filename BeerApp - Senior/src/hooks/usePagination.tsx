import React from "react";

const usePagination = (
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  totalPages: number,
) => {
  const prev = () => {
    if (currentPage > 0) {
      setCurrentPage((currentPage: number) => currentPage - 1);
    }
  };
  const next = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((currentPage: number) => currentPage + 1);
    }
  };
  const jumpToPage = (num: number) => {
    setCurrentPage(num);
  };

  return {
    jumpToPage,
    prev,
    next,
  };
};

export default usePagination;

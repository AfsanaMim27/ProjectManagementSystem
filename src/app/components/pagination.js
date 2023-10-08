import React from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

export default function Pagination({ currentPage, totalPages,  setPageNumber}) {
  return (
    <ResponsivePagination
      current={currentPage}
      total={totalPages}
      onPageChange={setPageNumber}
    />
  );
}
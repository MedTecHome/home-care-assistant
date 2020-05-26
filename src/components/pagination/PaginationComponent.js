import React from 'react';
import { TablePagination } from '@material-ui/core';
import { useCustomPaginationContext } from './PaginationContext';

function PaginationComponent({ total, first, last }) {
  const { page, setOffset, setPage, pageSize, setPageSize } = useCustomPaginationContext();

  const handleChangeRowsPerPage = event => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
    setOffset({});
  };

  const loadPreviousPage = () => {
    setPage(page - 1);
    setOffset({ prev: first });
  };

  const loadNextPage = () => {
    setPage(page + 1);
    setOffset({ next: last });
  };

  return (
    <TablePagination
      labelRowsPerPage="Elementos por página"
      component="div"
      count={total}
      page={page}
      rowsPerPage={pageSize}
      onChangePage={() => {}}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      rowsPerPageOptions={[2, 5, 10, 25, 50, 100]}
      backIconButtonProps={{
        'aria-label': 'Previous Page',
        onClick: loadPreviousPage
      }}
      nextIconButtonProps={{
        'aria-label': 'Next Page',
        onClick: loadNextPage
      }}
    />
  );
}

export default PaginationComponent;

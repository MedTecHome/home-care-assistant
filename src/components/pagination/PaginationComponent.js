import React from 'react';
import { TablePagination, useMediaQuery } from '@material-ui/core';
import { useCustomPaginationContext } from './PaginationContext';

function PaginationComponent({ total }) {
  const { page, setPage, pageSize, setPageSize } = useCustomPaginationContext();
  const match = useMediaQuery(theme => theme.breakpoints.down(450));

  const handleChangeRowsPerPage = event => {
    setPageSize(Number(event.target.value));
    setPage(0);
  };

  const loadPreviousPage = () => {
    setPage(page - 1);
  };

  const loadNextPage = () => {
    setPage(page + 1);
  };

  return (
    <TablePagination
      labelRowsPerPage={match ? '' : 'Elementos por página'}
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

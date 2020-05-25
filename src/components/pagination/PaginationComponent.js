import React from 'react';
import { TablePagination } from '@material-ui/core';
import { useCustomPaginationContext } from './PaginationContext';

function PaginationComponent({ total }) {
  const { page, setPage, pageSize, setPageSize } = useCustomPaginationContext();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      labelRowsPerPage="Elementos por página"
      component="div"
      count={total}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={pageSize}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      rowsPerPageOptions={[2, 5, 10, 25, 50, 100]}
    />
  );
}

export default PaginationComponent;

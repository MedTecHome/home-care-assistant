import React from 'react';
import { TableContainer, Table, TableBody, CardHeader, Typography, LinearProgress } from '@material-ui/core';

import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import useCustomStyles from '../../jss/globalStyles';

function TableComponent({
  title,
  filters,
  list,
  loadingList,
  headCells,
  selected,
  setModalVisible,
  render,
  extraText,
  addRole = false
}) {
  const classes = useCustomStyles();

  const handleModalVisible = formType => {
    setModalVisible(true, formType);
  };

  return (
    <>
      {title && (
        <CardHeader className={classes.pageHeader} title={<Typography variant="subtitle1">{title}</Typography>} />
      )}
      {addRole && (
        <EnhancedTableToolbar filters={filters} selected={selected && selected.id} onAdd={handleModalVisible} />
      )}
      {extraText && (
        <div className={classes.extraText}>
          <div style={{ width: '100%' }}>{extraText}</div>
        </div>
      )}
      {loadingList ? (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      ) : (
        <TableContainer className={classes.tableContent}>
          <Table className={classes.table}>
            <EnhancedTableHead headCells={headCells} />
            <TableBody>
              {list.map((row, index) => {
                return render(row, index);
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default TableComponent;

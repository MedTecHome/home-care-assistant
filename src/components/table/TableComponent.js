import React from 'react';
import { TableContainer, Table, TableBody, Typography, LinearProgress } from '@material-ui/core';

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
        <div className={classes.pageHeader}>
          <Typography variant="subtitle1">{title}</Typography>
        </div>
      )}
      <EnhancedTableToolbar
        allowAdd={addRole}
        filters={filters}
        selected={selected && selected.id}
        onAdd={handleModalVisible}
      />
      {extraText && (
        <div className={classes.extraText}>
          <div className={classes.formControl}>{extraText}</div>
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

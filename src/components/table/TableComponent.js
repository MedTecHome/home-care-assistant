import React from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  Typography,
  LinearProgress,
  TableHead,
  TableRow,
  TableCell,
  Paper
} from '@material-ui/core';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import useCustomStyles from '../../jss/globalStyles';
import PaginationComponent from '../pagination/PaginationComponent';

function TableComponent({
  title,
  filters,
  list,
  loadingList,
  headCells,
  setModalVisible,
  render,
  extraText,
  addRole = false,
  total
}) {
  const classes = useCustomStyles();

  const handleModalVisible = formType => {
    setModalVisible(true, formType);
  };

  return (
    <>
      {title && (
        <>
          <div className={classes.pageHeader}>
            <Typography variant="subtitle1">{title}</Typography>
          </div>
        </>
      )}
      <Paper>
        <EnhancedTableToolbar allowAdd={addRole} filters={filters} onAdd={handleModalVisible} />
        <TableContainer>
          <Table className={classes.table}>
            {extraText && (
              <TableHead>
                <TableRow>
                  <TableCell colSpan={headCells.length + 1}>
                    <div className={classes.extraText}>
                      <div className={classes.formControl}>{extraText}</div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>
            )}
            <EnhancedTableHead headCells={headCells} />
            <TableBody>
              {loadingList ? (
                <TableRow>
                  <TableCell colSpan={headCells.length + 1}>
                    <div className={classes.root}>
                      <LinearProgress />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                list.map((row, index) => {
                  return render(row, index);
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <PaginationComponent total={total} />
      </Paper>
    </>
  );
}

export default TableComponent;

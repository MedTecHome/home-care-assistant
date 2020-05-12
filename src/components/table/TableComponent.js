import React from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  Card,
  CardContent,
  CardHeader,
  Typography,
  LinearProgress
} from '@material-ui/core';

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
  addRole = false,
  disableElevation
}) {
  const classes = useCustomStyles();

  const handleModalVisible = formType => {
    setModalVisible(true, formType);
  };

  return (
    <>
      <CardHeader className={classes.pageHeader} title={<Typography variant="subtitle1">{title}</Typography>} />
      {addRole && (
        <EnhancedTableToolbar filters={filters} selected={selected && selected.id} onAdd={handleModalVisible} />
      )}
      {extraText && (
        <CardHeader
          title={
            <div className={classes.extraText}>
              <Typography>{extraText}</Typography>
            </div>
          }
        />
      )}
      {loadingList ? (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      ) : (
        <Card elevation={disableElevation ? 0 : 1} className={classes.root}>
          <TableContainer component={CardContent}>
            <Table className={classes.table}>
              <EnhancedTableHead headCells={headCells} />
              <TableBody>
                {list.map((row, index) => {
                  return render(row, index);
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </>
  );
}

export default TableComponent;

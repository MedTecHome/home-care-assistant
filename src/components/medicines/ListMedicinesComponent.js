import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import EnhancedTableHead from '../EnhancedTableHead';
import EnhancedTableToolbar from '../EnhancedTableToolbar';

const useStyles = makeStyles(theme => {
  return {
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    largeCells: {
      maxWidth: 230,
    },
    textCells: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    pagination: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      padding: 10,
    },
  };
});

function ListMedicinesComponent({ filters, list, loadingList, headCells, selected, setModalVisible, render }) {
  const classes = useStyles();
  const handleMedicineModalVisible = formType => {
    setModalVisible(true, formType);
  };

  return (
    <div className={classes.root}>
      <EnhancedTableToolbar
        filters={filters}
        selected={selected && selected.id}
        onAdd={handleMedicineModalVisible}
        onEdit={handleMedicineModalVisible}
        onDelete={handleMedicineModalVisible}
      />
      {loadingList ? (
        <CircularProgress size={25} />
      ) : (
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" size="small" aria-label="enhanced table">
            <EnhancedTableHead headCells={headCells} />
            <TableBody>
              {list.map((row, index) => {
                return render(row, index);
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default ListMedicinesComponent;

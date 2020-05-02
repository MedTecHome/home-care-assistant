import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

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

function TableComponent({ title, filters, list, loadingList, headCells, selected, setModalVisible, render }) {
  const classes = useStyles();

  const handleModalVisible = formType => {
    setModalVisible(true, formType);
  };

  return (
    <Card elevation={0} className={classes.root}>
      <CardHeader title={title} />
      <EnhancedTableToolbar
        filters={filters}
        selected={selected && selected.id}
        onAdd={handleModalVisible}
        onEdit={handleModalVisible}
        onDelete={handleModalVisible}
      />
      {loadingList ? (
        <CircularProgress size={25} />
      ) : (
        <CardContent>
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
        </CardContent>
      )}
    </Card>
  );
}

export default TableComponent;

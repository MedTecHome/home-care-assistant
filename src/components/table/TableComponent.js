import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
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
      <CardHeader className={classes.pageHeader} title={<Typography variant="h5">{title}</Typography>} />
      {addRole && (
        <EnhancedTableToolbar filters={filters} selected={selected && selected.id} onAdd={handleModalVisible} />
      )}
      {extraText && <Typography variant="subtitle1">{extraText}</Typography>}
      {loadingList ? (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      ) : (
        <Card elevation={1} className={classes.root}>
          <CardContent>
            <TableContainer>
              <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
                <EnhancedTableHead headCells={headCells} />
                <TableBody>
                  {list.map((row, index) => {
                    return render(row, index);
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default TableComponent;

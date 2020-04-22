import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';
import EnhancedTableHead from '../EnhancedTableHead';
import EnhancedTableToolbar from '../EnhancedTableToolbar';
import { useDoctorsContext } from '../../contexts/DoctorsContext';

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nombre' },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Apellidos' },
  { id: 'phone', numeric: true, disablePadding: false, label: 'Telefono' },
  { id: 'hospitalId', numeric: false, disablePadding: false, label: 'Hospital' },
];

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
    pagination: {
      width: 'auto',
      display: 'flex',
      justifyContent: 'flex-end',
      padding: 15,
    },
  };
});

export default function DoctorsListComponent() {
  const { doctors, total, listLoading, getListDoctors, selectDoctor, setModalVisible } = useDoctorsContext();
  const classes = useStyles();
  const [selected, setSelected] = React.useState(null);
  const [page, setPage] = useState({});

  useEffect(() => {
    getListDoctors(page);
  }, [getListDoctors, page]);

  useEffect(() => {
    selectDoctor(selected);
  }, [selectDoctor, selected]);

  const handleClick = (event, id) => {
    setSelected(selected === id ? null : id);
  };
  const handleActionDoctorButton = formType => {
    setModalVisible(true, formType);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          title="Lista de doctores"
          selected={selected}
          onAdd={handleActionDoctorButton}
          onEdit={handleActionDoctorButton}
          onDelete={handleActionDoctorButton}
        />
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" size="small" aria-label="enhanced table">
            <EnhancedTableHead headCells={headCells} />
            <TableBody>
              {doctors.map((row, index) => {
                const isItemSelected = row.id === selected;
                return (
                  <TableRow
                    hover
                    onClick={event => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">{index + 1}</TableCell>
                    <TableCell className={classes.largeCells}>
                      <Tooltip title={row.name} arrow placement="top">
                        <Typography className={classes.textCells}>{row.name}</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell className={classes.largeCells}>
                      <Typography className={classes.textCells}>{row.lastName}</Typography>
                    </TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell>{row.hospitalId}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.pagination}>
          {!listLoading && (
            <>
              <IconButton onClick={() => setPage({ prev: doctors[0] })}>
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => setPage({ next: doctors[doctors.length - 1] })}>
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
              <Typography
                style={{
                  padding: 10,
                  color: '#666',
                }}
              >
                total: {total}
              </Typography>
            </>
          )}
        </div>
      </Paper>
    </div>
  );
}

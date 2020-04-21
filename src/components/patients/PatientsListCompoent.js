import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EnhancedTableHead from '../EnhancedTableHead';
import EnhancedTableToolbar from '../EnhancedTableToolbar';
import { usePatientsContext } from '../../contexts/PatientsContext';
import CircularProgressComponent from '../CircularProgressComponent';

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nombre' },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Apellidos' },
  { id: 'birthday', numeric: true, disablePadding: false, label: 'Fecha de nacimiento' },
  { id: 'phone', numeric: true, disablePadding: false, label: 'Telefono' },
  { id: 'userId', numeric: false, disablePadding: false, label: 'Usuario' },
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

function PatientsListComponent() {
  const {
    total,
    patientSelected,
    patients,
    listLoading,
    getListPatients,
    selectPatients,
    setModalVisible,
  } = usePatientsContext();
  const classes = useStyles();
  const [page, setPage] = useState({});

  useEffect(() => {
    getListPatients({ limit: 5, ...page });
  }, [page, getListPatients]);

  const handleClick = (event, id) => {
    selectPatients(id);
  };

  const handlePatientAdd = formType => {
    setModalVisible(true, formType);
  };

  const handlePatientEdit = formType => {
    setModalVisible(true, formType);
  };

  const handlePatientDelete = formType => {
    setModalVisible(true, formType);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          title="Lista de pacientes"
          selected={patientSelected && patientSelected.id}
          onAdd={handlePatientAdd}
          onEdit={handlePatientEdit}
          onDelete={handlePatientDelete}
        />
        {listLoading ? (
          <CircularProgressComponent />
        ) : (
          <TableContainer>
            <Table className={classes.table} aria-labelledby="tableTitle" size="small" aria-label="enhanced table">
              <EnhancedTableHead headCells={headCells} />
              <TableBody>
                {patients.map((row, index) => {
                  const isItemSelected = patientSelected && row.id === patientSelected.id;
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
                      <TableCell padding="checkbox">
                        <Typography>{index + 1}</Typography>
                      </TableCell>
                      <TableCell className={classes.largeCells}>
                        <Tooltip title={row.name} arrow placement="top">
                          <Typography className={classes.textCells}>{row.name}</Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Typography className={classes.textCells}>{row.lastName}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        {moment(row.birthday.toDate()).format('DD [del] MM [de] YYYY')}
                      </TableCell>
                      <TableCell align="center">{row.phone}</TableCell>
                      <TableCell align="center">{row.userId}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <div className={classes.pagination}>
          {!listLoading && (
            <>
              <IconButton onClick={() => setPage({ prev: patients[0] })}>
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => setPage({ next: patients[patients.length - 1] })}>
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

export default PatientsListComponent;

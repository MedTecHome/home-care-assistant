import React, { useEffect } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHospitalContext } from './HospitalContext';
import EnhancedTableHead from '../EnhancedTableHead';
import EnhancedTableToolbar from '../EnhancedTableToolbar';
import CircularProgressComponent from '../CircularProgressComponent';

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nombre' },
  { id: 'address', numeric: false, disablePadding: false, label: 'Direccion' },
  { id: 'phone', numeric: true, disablePadding: false, label: 'Telefono' },
  { id: 'maxDoctors', numeric: true, disablePadding: false, label: 'Limite. Doctores' },
  { id: 'maxPatients', numeric: true, disablePadding: false, label: 'Limite. Pacientes' },
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

function HospitalListComponent() {
  const {
    hospitals,
    total,
    hospitalSelected,
    listLoading,
    getListHospitals,
    selectHospital,
    setModalVisible,
  } = useHospitalContext();
  const classes = useStyles();
  const [page, setPage] = React.useState({});

  useEffect(() => {
    getListHospitals(page);
  }, [getListHospitals, page]);

  const handleClick = (event, id) => {
    selectHospital(id);
  };

  const handleHospitalModalVisible = formType => {
    setModalVisible(true, formType);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          title="Lista de hospitales"
          selected={hospitalSelected && hospitalSelected.id}
          onAdd={handleHospitalModalVisible}
          onEdit={handleHospitalModalVisible}
          onDelete={handleHospitalModalVisible}
        />
        {listLoading ? (
          <CircularProgressComponent />
        ) : (
          <TableContainer>
            <Table className={classes.table} aria-labelledby="tableTitle" size="small" aria-label="enhanced table">
              <EnhancedTableHead headCells={headCells} />
              <TableBody>
                {hospitals.map((row, index) => {
                  const isItemSelected = hospitalSelected && row.id === hospitalSelected.id;
                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.id)}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className={classes.largeCells}>
                        <Tooltip title={row.name} arrow placement="top">
                          <Typography className={classes.textCells}>{row.name}</Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell className={classes.largeCells}>
                        <Typography className={classes.textCells}>{row.address}</Typography>
                      </TableCell>
                      <TableCell align="center">{row.phone}</TableCell>
                      <TableCell align="center">{row.maxDoctors}</TableCell>
                      <TableCell align="center">{row.maxPatients}</TableCell>
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
              <IconButton onClick={() => setPage({ prev: hospitals[0] })}>
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => setPage({ next: hospitals[hospitals.length - 1] })}>
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

export default HospitalListComponent;

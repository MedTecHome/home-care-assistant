import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import EnhancedTableHead from '../EnhancedTableHead';
import EnhancedTableToolbar from '../EnhancedTableToolbar';
import { PatientsContext } from '../../contexts/PatientsContext';

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

export default function PatientsListComponent() {
  const { patients, getListPatients, selectPatients } = useContext(PatientsContext);
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(2);

  useEffect(() => {
    getListPatients({ limit: rowsPerPage, page });
  }, [rowsPerPage, page]);

  useEffect(() => {
    selectPatients(selected);
  }, [selected]);

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = patients.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleBackward = () => {
    setPage({ prev: patients[0] });
  };

  const handleForward = () => {
    setPage({ next: patients[patients.length - 1] });
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const handlePatientAdd = formType => {
    // eslint-disable-next-line no-console
    console.log(formType);
  };

  const handlePatientEdit = formType => {
    // eslint-disable-next-line no-console
    console.log(formType);
  };

  const handlePatientDelete = formType => {
    // eslint-disable-next-line no-console
    console.log(formType);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          title="Lista de pacientes"
          selected={selected}
          onAdd={handlePatientAdd}
          onEdit={handlePatientEdit}
          onDelete={handlePatientDelete}
        />
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" size="small" aria-label="enhanced table">
            <EnhancedTableHead
              headCells={headCells}
              classes={classes}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={patients.length}
            />
            <TableBody>
              {patients.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
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
                      <Checkbox color="primary" checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
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
        <div className={classes.pagination}>
          <FormControl>
            <IconButton onClick={handleBackward}>
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
          </FormControl>
          <FormControl>
            <IconButton onClick={handleForward}>
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </FormControl>
          <FormControl>
            <Select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              className={classes.selectEmpty}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Paper>
    </div>
  );
}

import React, { useEffect } from 'react';
import moment from 'moment';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  makeStyles,
  Paper,
  TableBody,
  CircularProgress,
  Grid
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import FiltersRangeDateComponent from '../filters/FiltersRangeDateComponent';
import { useEvolutionContext, withEvolutionContext } from './EvolutionContext';
import { enumerateDaysBetweenDates, getPropValue } from '../../helpers/utils';
import EvolutionTreatmentsRowComponent from './EvolutionTreatmentsRowComponent';
import EvolutionTestRowComponent from './EvolutionTestRowComponent';

const useStyles = makeStyles({
  divRoot: {
    marginBottom: 40,
    marginTop: 10
  },
  tableRoot: {
    border: '1px solid #ccc',
    '& th, td': {
      border: '1px solid #ccc'
    }
  },
  tableHead: {
    backgroundColor: '#ccd5',
    '& th': {
      fontWeight: 600
    }
  },
  cellToday: {
    backgroundColor: blue[50]
  },
  textLink: {
    textDecoration: 'underline',
    cursor: 'pointer'
  }
});

function EvolutionComponent({ setTab, patient }) {
  const { params, setParams, loadingList, treatments, testList } = useEvolutionContext();
  const classes = useStyles();

  useEffect(() => {
    setParams({ user: getPropValue(patient, 'id') });
  }, [patient, setParams]);

  const aux = params.rangeDate ? enumerateDaysBetweenDates(params.rangeDate[0], params.rangeDate[1]) : [];

  const weeks = aux.filter(
    (thing, index, self) =>
      index ===
      self.findIndex(t => {
        return moment(t).week() === moment(thing).week();
      })
  );

  const months = weeks.filter(
    (thing, index, self) =>
      index ===
      self.findIndex(t => {
        return moment(t).format('MM') === moment(thing).format('MM');
      })
  );

  const handleClickParamter = type => {
    setTab('clinictest', type);
  };

  const handleRangeFilter = values => {
    if (JSON.stringify(params.rangeDate) !== JSON.stringify(values)) {
      setParams({ ...params, rangeDate: values });
    }
  };

  return (
    <div className={classes.divRoot}>
      <Grid item xs={12} container justify="flex-end">
        <FiltersRangeDateComponent onRangeSet={handleRangeFilter} />
      </Grid>
      <TableContainer component={Paper} elevation={0}>
        <Table className={classes.tableRoot}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell variant="head" />
              {months.map((m, index) => (
                <TableCell
                  key={index.toString()}
                  align="center"
                  colSpan={aux.filter(d => moment(d).format('MM') === moment(m).format('MM')).length}
                  component="th"
                >
                  {moment(m).format('MMM')}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell />
              {weeks.map((w, index) => {
                return (
                  <TableCell
                    key={index.toString()}
                    align="center"
                    colSpan={aux.filter(date => moment(date).week() === moment(w).week()).length}
                  >
                    Semana {Math.ceil(moment(w).date() / 7)}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell>Parametros</TableCell>
              {aux.map((date, index) => (
                <TableCell
                  key={index.toString()}
                  align="center"
                  className={
                    moment(moment(date).format('YYYY-MM-DD')).isSame(moment().format('YYYY-MM-DD'))
                      ? classes.cellToday
                      : undefined
                  }
                >
                  {moment(date).format('DD')}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingList ? (
              <TableRow>
                <TableCell align="center" colSpan={aux.length + 1}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              testList.map(mt => (
                <EvolutionTestRowComponent
                  key={mt.id}
                  clinicaltest={mt}
                  aux={aux}
                  handleClickParamter={handleClickParamter}
                  classes={classes}
                />
              ))
            )}
          </TableBody>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Tratamientos</TableCell>
              <TableCell colSpan={aux.length} />
            </TableRow>
          </TableHead>
          <TableBody>
            {treatments.map(treatment => (
              <EvolutionTreatmentsRowComponent key={treatment.id} aux={aux} treatment={treatment} classes={classes} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default withEvolutionContext(EvolutionComponent);

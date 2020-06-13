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
  Typography,
  Grid
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import FiltersRangeDateComponent from '../filters/FiltersRangeDateComponent';
import { useEvolutionContext, withEvolutionContext } from './EvolutionContext';
import { enumerateDaysBetweenDates, getPropValue } from '../../helpers/utils';
import PopupTestTypeComponent from './PopupTestTypeComponet';
import EvolutionTreatmentsRowComponent from './EvolutionTreatmentsRowComponent';

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
          {!loadingList ? (
            <>
              <TableBody>
                {testList.map((mt, index) => (
                  <TableRow key={index.toString()}>
                    <TableCell>
                      <Typography
                        className={classes.textLink}
                        onClick={() => handleClickParamter(getPropValue(mt, 'id'))}
                        color="inherit"
                      >
                        {getPropValue(mt, 'name')}
                      </Typography>
                    </TableCell>
                    {aux.map((d, index1) => {
                      return (
                        <TableCell
                          key={index1.toString()}
                          className={
                            moment(moment(d).format('YYYY-MM-DD')).isSame(moment().format('YYYY-MM-DD'))
                              ? classes.cellToday
                              : undefined
                          }
                          align="center"
                        >
                          <div>
                            {mt.list
                              .filter(a => {
                                return moment(moment(d).format('YYYY-MM-DD')).isSame(
                                  moment.unix(a.clinicalDate).format('YYYY-MM-DD')
                                );
                              })
                              .map((b, index2) => (
                                <PopupTestTypeComponent key={index2.toString()} data={b} />
                              ))}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell>Tratamientos</TableCell>
                  <TableCell colSpan={aux.length} />
                </TableRow>
              </TableHead>
              <TableBody>
                {treatments.map(treatment => (
                  <EvolutionTreatmentsRowComponent
                    key={treatment.id}
                    aux={aux}
                    treatment={treatment}
                    classes={classes}
                  />
                ))}
              </TableBody>
            </>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={aux.length + 1}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}

export default withEvolutionContext(EvolutionComponent);

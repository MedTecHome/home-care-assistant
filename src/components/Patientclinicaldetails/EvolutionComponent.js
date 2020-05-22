import React, { useEffect } from 'react';
import moment from 'moment';
import uuid from 'uuid4';
import { Table, TableHead, TableRow, TableCell, TableContainer, makeStyles, Paper, TableBody } from '@material-ui/core';
import FiltersEvolutionComponent from './FiltersEvolutionComponent';
import { useEvolutionContext } from './EvolutionContext';
import { enumerateDaysBetweenDates, getPropValue } from '../../helpers/utils';

const useStyles = makeStyles({
  tableRoot: {
    '& th, td': {
      border: '1px solid #ccc'
    }
  },
  tableHead: {
    '& th': {
      fontWeight: 600
    }
  }
});

function EvolutionComponent() {
  const { filters, getTestList, getTreatmentList, treatments, testList } = useEvolutionContext();
  const classes = useStyles();
  useEffect(() => {
    getTestList();
    getTreatmentList();
  }, [filters, getTestList, getTreatmentList]);

  const aux = filters.rangeDate ? enumerateDaysBetweenDates(filters.rangeDate[0], filters.rangeDate[1]) : [];

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

  return (
    <>
      <FiltersEvolutionComponent />
      {filters.rangeDate && filters.rangeDate[0] && filters.rangeDate[1] && (
        <TableContainer component={Paper}>
          <Table className={classes.tableRoot}>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell variant="head" />
                {months.map(m => (
                  <TableCell
                    key={uuid()}
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
                {weeks.map(w => {
                  return (
                    <TableCell
                      key={uuid()}
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
                {aux.map(date => (
                  <TableCell key={uuid()} align="center">
                    {moment(date).format('DD')}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {testList.map(mt => (
                <TableRow key={uuid()}>
                  <TableCell>{getPropValue(mt, 'type.name')}</TableCell>
                  {aux.map(d => (
                    <TableCell key={uuid()}>
                      {moment(moment(d).format('YYYY-MM-DD')).isSame(moment.unix(mt.clinicalDate).format('YYYY-MM-DD'))
                        ? '-'
                        : ''}
                    </TableCell>
                  ))}
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
                <TableRow key={uuid()}>
                  <TableCell>{treatment.name}</TableCell>
                  {aux.map(d => (
                    <TableCell key={uuid()}>
                      {moment(moment(d).format('YYYY-MM-DD')).isBetween(
                        moment.unix(treatment.startDate).format('YYYY-MM-DD'),
                        moment.unix(treatment.endDate).format('YYYY-MM-DD'),
                        undefined,
                        '[]'
                      )
                        ? treatment.frequency || '-'
                        : ''}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default EvolutionComponent;

import React, { useEffect } from 'react';
import moment from 'moment';
import uuid from 'uuid4';
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
  Typography
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import FiltersEvolutionComponent from './FiltersEvolutionComponent';
import { useEvolutionContext, withEvolutionContext } from './EvolutionContext';
import { enumerateDaysBetweenDates, getPropValue } from '../../helpers/utils';
import PopupTestTypeComponent from './PopupTestTypeComponet';
import PopupMedicineDetailComponent from './PopupMedicineDetailComponent';

const useStyles = makeStyles({
  divRoot: {
    marginBottom: 40
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

function EvolutionComponent({ setTab }) {
  const { filters, loadingList, retriveDateFormDB, treatments, testList } = useEvolutionContext();
  const classes = useStyles();
  useEffect(() => {
    retriveDateFormDB();
  }, [filters, retriveDateFormDB]);

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

  const handleClickParamter = type => {
    setTab('clinictest', type);
  };

  return (
    <div className={classes.divRoot}>
      <FiltersEvolutionComponent />
      <TableContainer component={Paper} elevation={0}>
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
                <TableCell
                  key={uuid()}
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
                {testList.map(mt => (
                  <TableRow key={uuid()}>
                    <TableCell>
                      <Typography
                        className={classes.textLink}
                        onClick={() => handleClickParamter(getPropValue(mt, 'id'))}
                        color="inherit"
                      >
                        {getPropValue(mt, 'name')}
                      </Typography>
                    </TableCell>
                    {aux.map(d => {
                      return (
                        <TableCell
                          key={uuid()}
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
                              .map(b => (
                                <PopupTestTypeComponent key={uuid()} data={b} />
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
                  <TableRow key={uuid()}>
                    <TableCell>{treatment.name}</TableCell>
                    {aux.map(d => (
                      <TableCell
                        key={uuid()}
                        className={
                          moment(moment(d).format('YYYY-MM-DD')).isSame(moment().format('YYYY-MM-DD'))
                            ? classes.cellToday
                            : undefined
                        }
                        align="center"
                      >
                        {moment(moment(d).format('YYYY-MM-DD')).isBetween(
                          moment.unix(treatment.startDate).format('YYYY-MM-DD'),
                          moment.unix(treatment.endDate).format('YYYY-MM-DD'),
                          undefined,
                          '[]'
                        ) ? (
                          <PopupMedicineDetailComponent data={treatment} />
                        ) : (
                          ''
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
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

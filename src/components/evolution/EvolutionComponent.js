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
  Grid,
  LinearProgress,
  fade,
  Box
} from '@material-ui/core';
import FiltersRangeDateComponent from '../filters/FiltersRangeDateComponent';
import { useEvolutionContext, withEvolutionContext } from './EvolutionContext';
import { enumerateDaysBetweenDates, getPropValue } from '../../helpers/utils';
import EvolutionTreatmentsRowComponent from './EvolutionTreatmentsRowComponent';
import EvolutionTestRowComponent from './EvolutionTestRowComponent';

const useStyles = makeStyles(theme => ({
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
    backgroundColor: fade(theme.palette.primary.light, 0.4)
  },
  textLink: {
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}));

function EvolutionComponent({ setTab, patient }) {
  const { params, setParams, loadingList, treatments, testList } = useEvolutionContext();
  const classes = useStyles();

  useEffect(() => {
    setParams({ user: getPropValue(patient, 'id') });
  }, [patient, setParams]);

  const enumeratedDays = params.rangeDate ? enumerateDaysBetweenDates(params.rangeDate[0], params.rangeDate[1]) : [];

  const months = Array.from(new Set(enumeratedDays.map(date => moment(date).format('MMMM')))).map(a => ({ name: a }));

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
      <Box margin={2}>
        <Grid container justify="flex-end">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FiltersRangeDateComponent onRangeSet={handleRangeFilter} />
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper} elevation={0}>
        <Table className={classes.tableRoot}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="center" />
              {months.map((a, index) => (
                <TableCell
                  align="center"
                  key={a.name}
                  colSpan={enumeratedDays.filter(b => moment(b).format('MMMM') === a.name).length}
                  style={{
                    borderRight: months[index + 1] && a !== months[index + 1] ? 'solid 1px #666' : ''
                  }}
                >
                  {a.name}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell rowSpan={2}>Parámetros/Días</TableCell>
              {enumeratedDays.map((a, index) => (
                <TableCell
                  align="center"
                  key={moment(a).format('YYYY-MM-DD')}
                  className={
                    moment(a).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? classes.cellToday : undefined
                  }
                  style={{
                    borderRight:
                      (enumeratedDays[index + 1] &&
                        moment(a).format('MMMM') !== moment(enumeratedDays[index + 1]).format('MMMM')) ||
                      moment(a).weekday() === 6
                        ? `solid 1px #666`
                        : ''
                  }}
                >
                  {moment(a).format('ddd')}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {enumeratedDays.map((a, index) => (
                <TableCell
                  align="center"
                  key={moment(a).format('YYYY-MM-DD')}
                  className={
                    moment(a).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? classes.cellToday : undefined
                  }
                  style={{
                    borderRight:
                      (enumeratedDays[index + 1] &&
                        moment(a).format('MMMM') !== moment(enumeratedDays[index + 1]).format('MMMM')) ||
                      moment(a).weekday() === 6
                        ? `solid 1px #666`
                        : ''
                  }}
                >
                  {moment(a).format('DD')}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingList ? (
              <TableRow>
                <TableCell align="center" colSpan={enumeratedDays.length + 1}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            ) : (
              testList.map(mt => (
                <EvolutionTestRowComponent
                  key={mt.id}
                  clinicaltest={mt}
                  aux={enumeratedDays}
                  handleClickParamter={handleClickParamter}
                  classes={classes}
                />
              ))
            )}
          </TableBody>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Tratamientos</TableCell>
              <TableCell colSpan={enumeratedDays.length} />
            </TableRow>
          </TableHead>
          <TableBody>
            {treatments.map(treatment => (
              <EvolutionTreatmentsRowComponent
                key={treatment.id}
                aux={enumeratedDays}
                treatment={treatment}
                classes={classes}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default withEvolutionContext(EvolutionComponent);

import React, { memo } from 'react';
import moment from 'moment';
import { TableRow, TableCell, Typography, useMediaQuery } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { getPropValue } from '../../helpers/utils';
// import healthyStandards from '../../helpers/healthyStandards';
import MedicalDetailButtonIcon from '../buttons/MedicalDetailButtonIcon';

function RowMonitoringComponent({ row, selectRow }) {
  const matchXs = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const matchSm = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const handleRowSelect = id => {
    selectRow(id);
  };

  /* const colorPressure = healthyStandards.pressure(
    getPropValue(row, 'pressure.sistolica'),
    getPropValue(row, 'pressure.diastolica')
  );

  const colortHeartbeat = healthyStandards.pressure(getPropValue(row, 'oxygen.heartbeat'));
  const colorWeight = healthyStandards.weight(getPropValue(row, 'user.height'), getPropValue(row, 'weight.weight'));
  const colorGlucose = healthyStandards.glucose(getPropValue(row, 'glucose.sugarConcentration'));
  const colorTemperature = healthyStandards.temperature(getPropValue(row, 'temperature.celsiusDegree'));
  const colorInr = healthyStandards.inr(getPropValue(row, 'inr.INR')); */

  return (
    <TableRow onClick={() => handleRowSelect(row.id)}>
      <TableCell>
        <Typography
          component={NavLink}
          to={{
            pathname: '/detallesclinicos',
            state: {
              profile: row.user
            }
          }}
        >
          {`${getPropValue(row, 'user.name')} ${getPropValue(row, 'user.lastName')}` || '-'}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <Typography>
          {moment.unix(row.latestDate).isValid() ? moment.unix(row.latestDate).format('DD/MM/YYYY') : '-'}
        </Typography>
      </TableCell>
      {!matchXs && <TableCell align="center">{getPropValue(row, 'user.age') || '-'}</TableCell>}
      {!matchXs && (
        <TableCell
          align="center"
          style={
            {
              /*
            color: colorPressure ? colorPressure.A700 : 'inherit',
            backgroundColor: colorPressure ? colorPressure[200] : 'inherit'
          */
            }
          }
        >{`${getPropValue(row, 'pressure.sistolica') || '-'}/${
          getPropValue(row, 'pressure.diastolica') || '-'
        }`}</TableCell>
      )}
      {!matchXs && !matchSm && (
        <TableCell
          align="center"
          style={
            {
              /*
            color: colortHeartbeat ? colortHeartbeat.A700 : 'inherit',
            backgroundColor: colortHeartbeat ? colortHeartbeat[200] : 'inherit'
          */
            }
          }
        >{`${getPropValue(row, 'oxygen.heartbeat') || '-'}`}</TableCell>
      )}
      {!matchXs && !matchSm && (
        <TableCell
          align="center"
          style={
            {
              /*
            color: colorWeight ? colorWeight.A700 : 'inherit',
            backgroundColor: colorWeight ? colorWeight[200] : 'inherit'
          */
            }
          }
        >{`${getPropValue(row, 'weight.weight') || '-'}`}</TableCell>
      )}
      {!matchXs && !matchSm && (
        <TableCell
          align="center"
          style={
            {
              /*
            color: colorGlucose ? colorGlucose.A700 : 'inherit',
            backgroundColor: colorGlucose ? colorGlucose[200] : 'inherit'
          */
            }
          }
        >{`${getPropValue(row, 'glucose.sugarConcentration') || '-'}`}</TableCell>
      )}
      {!matchXs && !matchSm && (
        <TableCell
          align="center"
          style={
            {
              /*
            color: colorTemperature ? colorTemperature.A700 : 'inherit',
            backgroundColor: colorTemperature ? colorTemperature[200] : 'inherit'
          */
            }
          }
        >{`${getPropValue(row, 'temperature.celsiusDegree') || '-'}`}</TableCell>
      )}
      {!matchXs && !matchSm && <TableCell align="center">{`${getPropValue(row, 'exercises.steps') || '-'}`}</TableCell>}
      {!matchXs && !matchSm && (
        <TableCell
          align="center"
          style={
            {
              /*
            color: colorInr ? colorInr.A700 : 'inherit',
            backgroundColor: colorInr ? colorInr[200] : 'inherit'
          */
            }
          }
        >{`${getPropValue(row, 'inr.INR') || '-'}`}</TableCell>
      )}

      <TableCell align="center">
        <NavLink to={{ pathname: '/detallesclinicos', state: { profile: row.user } }}>
          <MedicalDetailButtonIcon />
        </NavLink>
      </TableCell>
    </TableRow>
  );
}

export default memo(RowMonitoringComponent);

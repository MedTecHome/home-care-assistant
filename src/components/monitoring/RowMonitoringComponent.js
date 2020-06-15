import React, { memo } from 'react';
import moment from 'moment';
import { TableRow, TableCell, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { getPropValue } from '../../helpers/utils';
import healthyStandards from '../../helpers/healthyStandards';
import MedicalDetailButtonIcon from '../buttons/MedicalDetailButtonIcon';
import useCustomStyles from '../../jss/globalStyles';

function RowMonitoringComponent({ row, selectRow }) {
  const classes = useCustomStyles();
  const handleRowSelect = id => {
    selectRow(id);
  };

  const colorPressure = healthyStandards.pressure(
    getPropValue(row, 'pressure.sistolica'),
    getPropValue(row, 'pressure.diastolica')
  );

  const colortHeartbeat = healthyStandards.pressure(getPropValue(row, 'oxygen.heartbeat'));
  const colorWeight = healthyStandards.weight(getPropValue(row, 'user.height'), getPropValue(row, 'weight.weight'));
  const colorGlucose = healthyStandards.glucose(getPropValue(row, 'glucose.sugarConcentration'));
  const colorTemperature = healthyStandards.temperature(getPropValue(row, 'temperature.celsiusDegree'));
  const colorInr = healthyStandards.inr(getPropValue(row, 'inr.INR'));

  return (
    <TableRow onClick={() => handleRowSelect(row.id)}>
      <TableCell>
        <Typography
          className={classes.textUpperCase}
          component={NavLink}
          to={{
            pathname: '/detallesclinicos',
            state: {
              profile: row.user
            }
          }}
        >
          {getPropValue(row, 'user.fullname') || '-'}
        </Typography>
      </TableCell>
      <TableCell align="center">{getPropValue(row, 'user.age') || '-'}</TableCell>
      <TableCell align="center">
        <Typography>
          {moment.unix(row.latestDate).isValid() ? moment.unix(row.latestDate).format('DD/MM/YYYY') : '-'}
        </Typography>
      </TableCell>
      <TableCell
        align="center"
        style={{
          color: colorPressure ? colorPressure.A700 : 'inherit',
          backgroundColor: colorPressure ? colorPressure[200] : 'inherit'
        }}
      >{`${getPropValue(row, 'pressure.sistolica') || '-'}/${
        getPropValue(row, 'pressure.diastolica') || '-'
      }`}</TableCell>
      <TableCell
        align="center"
        style={{
          color: colortHeartbeat ? colortHeartbeat.A700 : 'inherit',
          backgroundColor: colortHeartbeat ? colortHeartbeat[200] : 'inherit'
        }}
      >{`${getPropValue(row, 'oxygen.heartbeat') || '-'}`}</TableCell>
      <TableCell
        align="center"
        style={{
          color: colorWeight ? colorWeight.A700 : 'inherit',
          backgroundColor: colorWeight ? colorWeight[200] : 'inherit'
        }}
      >{`${getPropValue(row, 'weight.weight') || '-'}`}</TableCell>
      <TableCell
        align="center"
        style={{
          color: colorGlucose ? colorGlucose.A700 : 'inherit',
          backgroundColor: colorGlucose ? colorGlucose[200] : 'inherit'
        }}
      >{`${getPropValue(row, 'glucose.sugarConcentration') || '-'}`}</TableCell>
      <TableCell
        align="center"
        style={{
          color: colorTemperature ? colorTemperature.A700 : 'inherit',
          backgroundColor: colorTemperature ? colorTemperature[200] : 'inherit'
        }}
      >{`${getPropValue(row, 'temperature.celsiusDegree') || '-'}`}</TableCell>
      <TableCell align="center">{`${getPropValue(row, 'exercises.steps') || '-'}`}</TableCell>
      <TableCell
        align="center"
        style={{
          color: colorInr ? colorInr.A700 : 'inherit',
          backgroundColor: colorInr ? colorInr[200] : 'inherit'
        }}
      >{`${getPropValue(row, 'inr.INR') || '-'}`}</TableCell>

      <TableCell align="center">
        <NavLink to={{ pathname: '/detallesclinicos', state: { profile: row.user } }}>
          <MedicalDetailButtonIcon />
        </NavLink>
      </TableCell>
    </TableRow>
  );
}

export default memo(RowMonitoringComponent);

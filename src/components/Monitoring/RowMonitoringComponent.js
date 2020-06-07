import React, { memo } from 'react';
import moment from 'moment';
import { TableRow, TableCell, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { getPropValue } from '../../helpers/utils';
import healthyStandards from '../../helpers/healthyStandards';
import MedicalDetailButtonIcon from '../buttons/MedicalDetailButtonIcon';

function RowMonitoringComponent({ row, selectRow }) {
  const handleRowSelect = id => {
    selectRow(id);
  };

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
          {getPropValue(row, 'user.fullname') || '-'}
        </Typography>
      </TableCell>
      <TableCell align="center">{getPropValue(row, 'user.age') || '-'}</TableCell>
      <TableCell align="center">
        <Typography>{moment.unix(row.latestDate).format('DD/MM/YYYY') || '-'}</Typography>
      </TableCell>
      <TableCell
        align="center"
        style={{
          color: healthyStandards.pressure(
            getPropValue(row, 'pressure.sistolica'),
            getPropValue(row, 'pressure.diastolica')
          ).A700,
          backgroundColor: healthyStandards.pressure(
            getPropValue(row, 'pressure.sistolica'),
            getPropValue(row, 'pressure.diastolica')
          )[200]
        }}
      >{`${getPropValue(row, 'pressure.sistolica') || '-'}/${getPropValue(row, 'pressure.diastolica')}`}</TableCell>
      <TableCell
        align="center"
        style={{
          color: healthyStandards.pressure(getPropValue(row, 'oxygen.heartbeat')).A700,
          backgroundColor: healthyStandards.pressure(getPropValue(row, 'oxygen.heartbeat'))[200]
        }}
      >{`${getPropValue(row, 'oxygen.heartbeat') || '-'}`}</TableCell>
      <TableCell
        align="center"
        style={{
          color: healthyStandards.weight(getPropValue(row, 'user.height'), getPropValue(row, 'weight.weight')).A700,
          backgroundColor: healthyStandards.weight(
            getPropValue(row, 'user.height'),
            getPropValue(row, 'weight.weight')
          )[200]
        }}
      >{`${getPropValue(row, 'weight.weight') || '-'}`}</TableCell>
      <TableCell
        align="center"
        style={{
          color: healthyStandards.glucose(getPropValue(row, 'glucose.sugarConcentration')).A700,
          backgroundColor: healthyStandards.glucose(getPropValue(row, 'glucose.sugarConcentration'))[200]
        }}
      >{`${getPropValue(row, 'glucose.sugarConcentration') || '-'}`}</TableCell>
      <TableCell
        align="center"
        style={{
          color: healthyStandards.temperature(getPropValue(row, 'temperature.celsiusDegree')).A700,
          backgroundColor: healthyStandards.temperature(getPropValue(row, 'temperature.celsiusDegree'))[200]
        }}
      >{`${getPropValue(row, 'temperature.celsiusDegree') || '-'}`}</TableCell>
      <TableCell align="center">{`${getPropValue(row, 'exercises.steps') || '-'}`}</TableCell>
      <TableCell
        align="center"
        style={{
          color: healthyStandards.inr(getPropValue(row, 'inr.INR')).A700,
          backgroundColor: healthyStandards.inr(getPropValue(row, 'inr.INR'))[200]
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

import React, { memo } from 'react';
import uuid from 'uuid4';
import moment from 'moment';
import { TableRow, TableCell, Typography } from '@material-ui/core';
import { getPropValue } from '../../helpers/utils';
import healthyStandards from '../../helpers/healthyStandards';

function RowMonitoringComponent({ cells = [], row, index, selected, selectRow }) {
  const handleRowSelect = id => {
    selectRow(id);
  };

  return (
    <TableRow onClick={() => handleRowSelect(row.id)}>
      <TableCell key={uuid()}>{index + 1}</TableCell>
      {cells.map(item => {
        const color =
          (item.id === 'pressure' &&
            healthyStandards.pressure(
              getPropValue(row, `${item.id}.sistolica`),
              getPropValue(row, `${item.id}.diastolica`)
            )) ||
          (item.id === 'inr.INR' && healthyStandards.inr(getPropValue(row, item.id))) ||
          (item.id === 'weight.weight' && healthyStandards.weight(row.height, getPropValue(row, item.id))) ||
          (item.id === 'oxygen.heartbeat' && healthyStandards.heartbeat(getPropValue(row, item.id))) ||
          (item.id === 'glucose.sugarConcentration' && healthyStandards.heartbeat(getPropValue(row, item.id)));
        return (
          <TableCell
            key={uuid()}
            align={item.numeric ? 'center' : 'inherit'}
            style={{
              backgroundColor: color[100],
              color: color.A700
            }}
          >
            {item.id === 'pressure' ? (
              <div>
                {getPropValue(row, `${item.id}.sistolica`) || '-'}
                <span>/</span>
                {getPropValue(row, `${item.id}.diastolica`) || '-'}
              </div>
            ) : (
              (item.id === 'latestDate' && (
                <Typography>
                  {moment.unix(row[item.id]).isValid() ? moment.unix(row[item.id]).format('DD/MM/YYYY') : '-'}
                </Typography>
              )) || <Typography>{getPropValue(row, item.id) || '-'}</Typography>
            )}
          </TableCell>
        );
      })}
      <TableCell key={uuid()} />
    </TableRow>
  );
}

export default memo(RowMonitoringComponent);

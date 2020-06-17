import React from 'react';
import { TableHead, TableRow, TableCell, useMediaQuery } from '@material-ui/core';

export default function EnhancedTableHead({ headCells = [] }) {
  const matchXs = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const matchSm = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const cells = (matchXs && headCells.slice(0, 3)) || (matchSm && headCells.slice(0, 4)) || headCells;

  return (
    <TableHead color="primary">
      <TableRow>
        {cells.map(headCell => (
          <TableCell key={headCell.id} align={headCell.numeric ? 'center' : 'left'} variant="head">
            {headCell.label}
          </TableCell>
        ))}
        <TableCell align="center" variant="head" component="th">
          Acciones
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

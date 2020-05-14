import React from 'react';
import { TableHead, TableRow, TableCell, Typography } from '@material-ui/core';

export default function EnhancedTableHead(props) {
  const { headCells } = props;
  return (
    <TableHead color="primary">
      <TableRow>
        <TableCell align="center" variant="head" component="th">
          <Typography>#</Typography>
        </TableCell>
        {headCells.map(headCell => (
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

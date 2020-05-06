import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';

export default function EnhancedTableHead(props) {
  const { headCells } = props;
  return (
    <TableHead color="primary">
      <TableRow>
        <TableCell padding="checkbox" color="primary">
          <Typography>No.</Typography>
        </TableCell>
        {headCells.map(headCell => (
          <TableCell key={headCell.id} align={headCell.numeric ? 'center' : 'left'}>
            {headCell.label}
          </TableCell>
        ))}
        <TableCell align="center">acciones</TableCell>
      </TableRow>
    </TableHead>
  );
}

import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { DELETE_FORM_TEXT, DETAILS_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';
import StandarDetailButtonIcon from '../buttons/StandarDetailButtonIcon';
import EditButtonIcon from '../buttons/EditButtonIcon';
import DeleteButtonIcon from '../buttons/DeleteButtonIcon';

function RowTableHospitalComponent({ row, index, selected, selectRow, onModalVisible }) {
  return (
    <TableRow
      hover
      onClick={() => selectRow(row.id)}
      tabIndex={-1}
      key={row.id}
      selected={selected && selected.id === row.id}
    >
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <Tooltip title={row.name} arrow placement="top">
          <Typography>{row.name}</Typography>
        </Tooltip>
      </TableCell>
      <TableCell align="center">{row.phone}</TableCell>
      <TableCell align="center">{`${row.totalDoctors || 0} / ${row.maxDoctors}`}</TableCell>
      <TableCell align="center">{`${row.totalPatients || 0} / ${row.maxPatients}`}</TableCell>
      <TableCell align="center">
        <ButtonGroup variant="text" size="small" aria-label="outlined primary button group">
          <StandarDetailButtonIcon onClick={() => onModalVisible(DETAILS_FORM_TEXT)} />
          <EditButtonIcon onClick={() => onModalVisible(EDIT_FORM_TEXT)} />
          <DeleteButtonIcon onClick={() => onModalVisible(DELETE_FORM_TEXT)} />
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}
export default RowTableHospitalComponent;

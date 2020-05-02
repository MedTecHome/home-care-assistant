import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import { DELETE_FORM_TEXT, DETAILS_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';

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
        <ButtonGroup variant="text" aria-label="outlined primary button group">
          <Button color="primary" aria-label="edit" onClick={() => onModalVisible(DETAILS_FORM_TEXT)}>
            <InfoIcon fontSize="small" />
          </Button>
          <Button color="primary" onClick={() => onModalVisible(EDIT_FORM_TEXT)}>
            <EditIcon fontSize="small" />
          </Button>
          <Button color="secondary" onClick={() => onModalVisible(DELETE_FORM_TEXT)}>
            <DeleteIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}
export default RowTableHospitalComponent;

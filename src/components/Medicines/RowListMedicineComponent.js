import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { DELETE_FORM_TEXT, DETAILS_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';
import DeleteButtonIcon from '../buttons/DeleteButtonIcon';
import StandardDetailButtonIcon from '../buttons/StandardDetailButtonIcon';
import EditButtonIcon from '../buttons/EditButtonIcon';
import useCustomStyles from '../../jss/globalStyles';

function RowListMedicineComponent({ row, selected, selectRow, onModalVisible }) {
  const classes = useCustomStyles();
  return (
    <TableRow
      className={classes.tableRow}
      hover
      onClick={() => selectRow(row.id)}
      tabIndex={-1}
      key={row.id}
      selected={selected && selected.id === row.id}
    >
      <TableCell>{row.name}</TableCell>
      <TableCell align="center">{`${row.concentrationCant || '-'} ${
        row.concentrationObj.measure || row.concentrationObj.name || ''
      }`}</TableCell>
      <TableCell>{`${row.doseCant || '-'} ${row.doseTypeObj.abbreviation || row.doseTypeObj.name || ''}`}</TableCell>
      <TableCell>{row.administrationTypeObj.name || '-'}</TableCell>
      <TableCell align="center">{row.frequency || '-'}</TableCell>

      <TableCell align="center">
        <ButtonGroup variant="text" aria-label="outlined primary button group">
          <StandardDetailButtonIcon onClick={() => onModalVisible(DETAILS_FORM_TEXT)} />
          <EditButtonIcon onClick={() => onModalVisible(EDIT_FORM_TEXT)} />
          <DeleteButtonIcon onClick={() => onModalVisible(DELETE_FORM_TEXT)} />
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}
export default RowListMedicineComponent;

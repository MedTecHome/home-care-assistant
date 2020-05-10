import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { DELETE_FORM_TEXT, DETAILS_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';
import DeleteButtonIcon from '../buttons/DeleteButtonIcon';
import StandarDetailButtonIcon from '../buttons/StandarDetailButtonIcon';
import EditButtonIcon from '../buttons/EditButtonIcon';
import useCustomStyles from '../../jss/globalStyles';
import { getPropValue } from '../../helpers/utils';

function RowListMedicineComponent({ row, index, selected, selectRow, onModalVisible }) {
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
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <Tooltip title={row.name} arrow placement="top">
          <Typography>{getPropValue(row, 'name')}</Typography>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Typography align="center">{getPropValue(row, 'concentrationCant') || '-'}</Typography>
      </TableCell>
      <TableCell align="center">{getPropValue(row, 'doseCant') || '?'}</TableCell>
      <TableCell>{getPropValue(row, 'administrationType.name') || '?'}</TableCell>
      <TableCell align="center">{getPropValue(row, 'frequency') || '?'}</TableCell>
      <TableCell align="center">
        <ButtonGroup variant="text" aria-label="outlined primary button group">
          <StandarDetailButtonIcon onClick={() => onModalVisible(DETAILS_FORM_TEXT)} />
          <EditButtonIcon onClick={() => onModalVisible(EDIT_FORM_TEXT)} />
          <DeleteButtonIcon onClick={() => onModalVisible(DELETE_FORM_TEXT)} />
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}
export default RowListMedicineComponent;

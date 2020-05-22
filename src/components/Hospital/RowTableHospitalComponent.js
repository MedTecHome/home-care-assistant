import React, { Fragment } from 'react';
import moment from 'moment';
import uuid from 'uuid4';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { DELETE_FORM_TEXT, DETAILS_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';
import StandardDetailButtonIcon from '../buttons/StandardDetailButtonIcon';
import EditButtonIcon from '../buttons/EditButtonIcon';
import DeleteButtonIcon from '../buttons/DeleteButtonIcon';
import { isTimestamp, getPropValue } from '../../helpers/utils';
import useCustomStyles from '../../jss/globalStyles';

function RowTableHospitalComponent({ cells, row, selected, selectRow, onModalVisible }) {
  const classes = useCustomStyles();
  return (
    <TableRow
      hover
      onClick={() => selectRow(row.id)}
      tabIndex={-1}
      key={row.id}
      selected={selected && selected.id === row.id}
    >
      {cells.map(cell => {
        const data = isTimestamp(row[cell.id]) ? moment(row[cell.id].toDate()).format('DD/MM/YYYY') : row[cell.id];
        const value = getPropValue(data, 'name') || data;
        return (
          <Fragment key={uuid()}>
            <TableCell align={cell.numeric ? 'center' : 'inherit'} className={classes.largeCells}>
              <Typography className={classes.textCells}>
                {cell.id === 'patient' ? getPropValue(value, 'name') : value}
              </Typography>
            </TableCell>
          </Fragment>
        );
      })}
      <TableCell align="center">
        <ButtonGroup variant="text" size="small" aria-label="outlined primary button group">
          <StandardDetailButtonIcon onClick={() => onModalVisible(DETAILS_FORM_TEXT)} />
          <EditButtonIcon onClick={() => onModalVisible(EDIT_FORM_TEXT)} />
          <DeleteButtonIcon onClick={() => onModalVisible(DELETE_FORM_TEXT)} />
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}
export default RowTableHospitalComponent;

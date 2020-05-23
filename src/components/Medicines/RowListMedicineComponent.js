import React, { Fragment } from 'react';
import moment from 'moment';
import TableRow from '@material-ui/core/TableRow';
import uuid from 'uuid4';
import TableCell from '@material-ui/core/TableCell';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Typography } from '@material-ui/core';
import { DELETE_FORM_TEXT, DETAILS_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';
import DeleteButtonIcon from '../buttons/DeleteButtonIcon';
import StandardDetailButtonIcon from '../buttons/StandardDetailButtonIcon';
import EditButtonIcon from '../buttons/EditButtonIcon';
import useCustomStyles from '../../jss/globalStyles';
import { isTimestamp, getPropValue } from '../../helpers/utils';
import PopoverComponent from '../containers/PopoverComponent';

function RowListMedicineComponent({ cells, row, selected, selectRow, onModalVisible }) {
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
      {cells.map(cell => {
        const data = isTimestamp(row[cell.id]) ? moment(row[cell.id].toDate()).format('DD/MM/YYYY') : row[cell.id];
        const value = getPropValue(data, 'name') || data || '-';
        return (
          <Fragment key={uuid()}>
            <TableCell align={cell.numeric || !row[cell.id] ? 'center' : 'inherit'} className={classes.largeCells}>
              {cell.id === 'name' ? (
                <PopoverComponent className={classes.textCells} title={value} content={value} />
              ) : (
                <Typography>{value}</Typography>
              )}
            </TableCell>
          </Fragment>
        );
      })}
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

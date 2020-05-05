import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import moment from 'moment';
import { DELETE_FORM_TEXT, DETAILS_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';
import DeleteButtonIcon from '../buttons/DeleteButtonIcon';
import StandarDetailButtonIcon from '../buttons/StandarDetailButtonIcon';
import EditButtonIcon from '../buttons/EditButtonIcon';

const useStyles = makeStyles(theme => ({
  tableRows: {
    '&.Mui-selected': {
      background: theme.palette.primary.light,
    },
  },
}));

function RowListTreatmentsComponent({ row, index, selected, selectRow, onModalVisible }) {
  const classes = useStyles();
  return (
    <TableRow
      className={classes.tableRow}
      hover
      onClick={() => selectRow(row.id)}
      tabIndex={-1}
      key={row.id}
      selected={!!selected}
    >
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <Typography>{row.medicine && row.medicine.name}</Typography>
      </TableCell>
      <TableCell align="center">{row.startDate && moment(row.startDate.toDate()).format('DD/MM/YYYY')}</TableCell>
      <TableCell align="center">{row.endDate && moment(row.endDate.toDate()).format('DD/MM/YYYY')}</TableCell>
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
export default RowListTreatmentsComponent;

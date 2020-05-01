import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  tableRows: {
    '&.Mui-selected': {
      background: theme.palette.primary.light,
    },
  },
}));

function RowListMedicineComponent({ row, index, selected, selectRow, onClickDetail, onClickEdit, onClickDelete }) {
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
        <Tooltip title={row.name} arrow placement="top">
          <Typography>{row.name}</Typography>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Typography align="center">{row.concentrationCant}</Typography>
      </TableCell>
      <TableCell align="center">{row.dose}</TableCell>
      <TableCell align="center">{row.administrationRoute}</TableCell>
      <TableCell align="center">{row.frequency}</TableCell>
      <TableCell align="center">
        <ButtonGroup variant="text" aria-label="outlined primary button group">
          <Button color="default" aria-label="edit" onClick={onClickDetail}>
            <InfoIcon fontSize="small" />
          </Button>
          <Button color="primary" onClick={onClickEdit}>
            <EditIcon fontSize="small" />
          </Button>
          <Button color="secondary" onClick={onClickDelete}>
            <DeleteIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}
export default RowListMedicineComponent;

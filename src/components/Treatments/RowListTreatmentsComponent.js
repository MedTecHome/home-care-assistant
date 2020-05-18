import React, { Fragment } from 'react';
import uuid from 'uuid4';
import { TableRow, TableCell, Typography, ButtonGroup, Collapse, IconButton, Grid } from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon } from '@material-ui/icons';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';
import DeleteButtonIcon from '../buttons/DeleteButtonIcon';
import EditButtonIcon from '../buttons/EditButtonIcon';
import Fieldset from '../fieldset';
import DetailTextComponent from '../DetailTextComponent';
import PopoverComponent from '../containers/PopoverComponent';
import { getPropValue, isTimestamp } from '../../helpers/utils';
import MedicineDetailItemListComponent from '../Medicines/MedicineDetailItemListComponent';

function DetailTreatmentRowCellComponent({ open, data }) {
  return (
    <>
      <TableRow>
        <TableCell colSpan={6}>
          <Collapse in={open && open === data.id} timeout="auto" unmountOnExit addEndListener={() => {}}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Fieldset title={<Typography variant="h5">General</Typography>}>
                  <Grid item xs={12} container spacing={3}>
                    <DetailTextComponent label="Nombre" value={data.name} />
                    <DetailTextComponent
                      label="Fecha inicio"
                      value={data.startDate && moment(data.startDate.toDate()).format('DD-MM-YYYY')}
                    />
                    <DetailTextComponent
                      label="Fecha Fin"
                      value={data.endDate && moment(data.endDate.toDate()).format('DD-MM-YYYY')}
                    />
                  </Grid>
                </Fieldset>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Fieldset title={<Typography variant="h5">Paciente</Typography>}>
                  <Grid item xs={12} container spacing={3} justify="space-between">
                    <DetailTextComponent label="Nombre y apellidos" value={getPropValue(data, 'patient.fullname')} />
                  </Grid>
                </Fieldset>
              </Grid>
              <Grid item xs={12}>
                <Fieldset title={<Typography variant="h5">Medicamentos</Typography>} paddingTop={0}>
                  <Grid item xs={12}>
                    <MedicineDetailItemListComponent medicines={data.medicines} />
                  </Grid>
                </Fieldset>
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const useStyles = {
  root: {
    '&.Mui-selected': {
      backgroundColor: '#f5f5f6',
      color: '#fff'
    }
  },
  largeCells: {
    maxWidth: 130
  },
  textCells: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textDecoration: 'underline'
  }
};

function RowListTreatmentsComponent({
  cells,
  row,
  index,
  open,
  setOpen,
  selected,
  selectRow,
  onModalVisible,
  editRole,
  delRole,
  classes
}) {
  const handleRowClick = id => {
    selectRow(id);
    setOpen(!open ? id : null);
  };

  const handleEditAction = id => {
    selectRow(id);
    onModalVisible(EDIT_FORM_TEXT);
  };

  const handleDeleteAction = id => {
    selectRow(id);
    onModalVisible(DELETE_FORM_TEXT);
  };

  return (
    <>
      <TableRow
        className={clsx(classes.root)}
        hover
        tabIndex={-1}
        key={uuid()}
        selected={selected && selected.id === row.id}
      >
        <TableCell key={uuid()} align="center">
          {index + 1}
        </TableCell>
        {cells.map(cell => {
          const value = isTimestamp(row[cell.id]) ? moment(row[cell.id].toDate()).format('DD/MM/YYYY') : row[cell.id];
          return (
            <Fragment key={uuid()}>
              {cell.id === 'medicines' ? (
                <TableCell className={classes.largeCells}>
                  <PopoverComponent
                    className={classes.textCells}
                    title={row[cell.id].map(medicine => medicine.name).join(', ')}
                  />
                </TableCell>
              ) : (
                <TableCell align={cell.numeric ? 'center' : 'inherit'}>
                  <Typography>{value}</Typography>
                </TableCell>
              )}
            </Fragment>
          );
        })}
        <TableCell align="center" key={uuid()} style={{ whiteSpace: 'nowrap' }}>
          <IconButton aria-label="expand row" size="small" onClick={() => handleRowClick(row.id)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <ButtonGroup variant="text" aria-label="outlined primary button group">
            {editRole && <EditButtonIcon onClick={() => handleEditAction(row.id)} />}
            {delRole && <DeleteButtonIcon onClick={() => handleDeleteAction(row.id)} />}
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <DetailTreatmentRowCellComponent open={open} data={row} />
    </>
  );
}
export default withStyles(useStyles)(RowListTreatmentsComponent);

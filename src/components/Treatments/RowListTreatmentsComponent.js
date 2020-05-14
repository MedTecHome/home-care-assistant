import React from 'react';
import { TableRow, TableCell, Typography, makeStyles, ButtonGroup, Collapse, Box, IconButton } from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon } from '@material-ui/icons';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';
import DeleteButtonIcon from '../buttons/DeleteButtonIcon';
import EditButtonIcon from '../buttons/EditButtonIcon';
import Fieldset from '../fieldset';
import { getPropValue } from '../../helpers/utils';
import DetailTextComponent from '../DetailTextComponent';

const cellStyle = makeStyles({
  cell: {
    paddingBottom: 0,
    paddingTop: 0,
    width: '99%'
    // backgroundColor: '#f5f5f6'
  },
  gridTextMargin: {
    '& > *': {
      margin: 5
    },
    gridItem: {
      height: '100%'
    }
  }
});

function DetailTreatmentRowCellComponent({ open, data }) {
  const classes = cellStyle();
  return (
    <>
      <TableRow>
        <TableCell className={classes.cell} colSpan={6}>
          <Collapse in={open && open === data.id} timeout="auto" unmountOnExit addEndListener={() => {}}>
            <Fieldset title="Detalles">
              <Grid container spacing={4} direction="row">
                <Grid item xs={6} container spacing={2}>
                  <DetailTextComponent
                    xsLabel={3}
                    disabledAlignContent
                    label="Descripcion"
                    value={getPropValue(data, 'name') || '?'}
                  />
                </Grid>
                <Grid item xs={6} container spacing={2}>
                  <DetailTextComponent
                    xsLabel={3}
                    xsValue={9}
                    label="Fecha inicio"
                    value={data.startDate && moment(data.startDate.toDate()).format('DD/MM/YYYY')}
                  />
                  <DetailTextComponent
                    xsLabel={3}
                    xsValue={9}
                    label="Fecha fin"
                    value={data.endDate && moment(data.endDate.toDate()).format('DD/MM/YYYY')}
                  />
                </Grid>
              </Grid>
            </Fieldset>
            <Grid
              container
              spacing={2}
              style={{
                position: 'relative'
              }}
            >
              <Grid item xs={12} sm={6}>
                <Fieldset title="Paciente">
                  <Grid container spacing={2}>
                    <DetailTextComponent
                      xsLabel={4}
                      xsValue={6}
                      label="Nombre y apellidos"
                      value={getPropValue(data, 'patient.fullname')}
                    />
                  </Grid>
                </Fieldset>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Fieldset title="Medicamentos">
                  <Grid container spacing={2}>
                    <DetailTextComponent xsLabel={3} label="Medicamentos" value={getPropValue(data, 'medicine.name')} />
                  </Grid>
                </Fieldset>
              </Grid>
            </Grid>
            <br />
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
  }
};

function RowListTreatmentsComponent({
  row,
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

  return (
    <>
      <TableRow
        className={clsx(classes.root)}
        hover
        onClick={() => handleRowClick(row.id)}
        tabIndex={-1}
        key={row.id}
        selected={selected && selected.id === row.id}
      >
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open ? row.id : null)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography>{getPropValue(row, 'name') || ' - '}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{getPropValue(row, 'medicine.name') || ' - '}</Typography>
        </TableCell>
        <TableCell align="center">{row.startDate && moment(row.startDate.toDate()).format('DD/MM/YYYY')}</TableCell>
        <TableCell align="center">{row.endDate && moment(row.endDate.toDate()).format('DD/MM/YYYY')}</TableCell>
        <TableCell align="center">
          <ButtonGroup variant="text" aria-label="outlined primary button group">
            {editRole && <EditButtonIcon onClick={() => onModalVisible(EDIT_FORM_TEXT)} />}
            {delRole && <DeleteButtonIcon onClick={() => onModalVisible(DELETE_FORM_TEXT)} />}
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <DetailTreatmentRowCellComponent open={open} data={row} />
    </>
  );
}
export default withStyles(useStyles)(RowListTreatmentsComponent);

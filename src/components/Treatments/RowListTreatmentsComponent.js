import React, { Fragment } from 'react';
import uuid from 'uuid4';
import { TableRow, TableCell, Typography, makeStyles, ButtonGroup, Collapse, IconButton } from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon } from '@material-ui/icons';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';
import DeleteButtonIcon from '../buttons/DeleteButtonIcon';
import EditButtonIcon from '../buttons/EditButtonIcon';
import Fieldset from '../fieldset';
import DetailTextComponent from '../DetailTextComponent';
import PopoverComponent from '../containers/PopoverComponent';
import { getPropValue, isTimestamp } from '../../helpers/utils';

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

function ListMedicines({ list = [] }) {
  return (
    <List
      style={{
        width: '100%'
      }}
    >
      {list.map(l => (
        <ListItem key={uuid()} style={{ padding: 1 }} divider>
          <ListItemText primary={l.name} />
        </ListItem>
      ))}
    </List>
  );
}

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
                    <DetailTextComponent
                      xsLabel={3}
                      label="Medicamentos"
                      value={<ListMedicines list={data.medicines} />}
                    />
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

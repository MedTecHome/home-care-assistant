import React from 'react';
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
import { getPropValue } from '../../helpers/utils';
import DetailTextComponent from '../DetailTextComponent';
import PopoverComponent from '../containers/PopoverComponent';

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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

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
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell>
          <Typography>{getPropValue(row, 'name') || ' - '}</Typography>
        </TableCell>
        <TableCell
          className={classes.largeCells}
          aria-owns={openPopover ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          {row.medicines ? (
            <Typography className={classes.textCells}>
              {row.medicines.map(medicine => medicine.name).join(', ')}
            </Typography>
          ) : (
            ' - '
          )}
          {row.medicines && (
            <PopoverComponent
              open={openPopover}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              title={<ListMedicines list={row.medicines} />}
            />
          )}
        </TableCell>
        <TableCell align="center">{row.startDate && moment(row.startDate.toDate()).format('DD/MM/YYYY')}</TableCell>
        <TableCell align="center">{row.endDate && moment(row.endDate.toDate()).format('DD/MM/YYYY')}</TableCell>
        <TableCell align="center">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open ? row.id : null)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
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

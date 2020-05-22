import React, { Fragment } from 'react';
import uuid from 'uuid4';
import { TableRow, TableCell, Typography, ButtonGroup, Collapse, IconButton, Grid } from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon } from '@material-ui/icons';
import moment from 'moment';
import { makeStyles, fade } from '@material-ui/core/styles';
import clsx from 'clsx';
import { DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';
import DeleteButtonIcon from '../buttons/DeleteButtonIcon';
import EditButtonIcon from '../buttons/EditButtonIcon';
import Fieldset from '../fieldset';
import PopoverComponent from '../containers/PopoverComponent';
import { getPropValue } from '../../helpers/utils';

const useStyles = makeStyles({
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
  },
  containerDetailDiv: {
    minWidth: '100%',
    '& > *': {
      marginBottom: 10
    }
  },
  contentDetailRow: {
    backgroundColor: fade('#f5f5f6', 0.5)
  },
  rowMedicineDetail: {
    minWidth: '100%',
    display: 'flex',
    alignContent: 'space-between'
  }
});

function DetailTreatmentRowCellComponent({ open, data }) {
  const classes = useStyles();
  return (
    <>
      {open && (
        <TableRow className={classes.contentDetailRow}>
          <TableCell colSpan={6}>
            <Collapse in={open && open === data.id} timeout="auto" unmountOnExit addEndListener={() => {}}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Fieldset title="General">
                    <div className={classes.containerDetailDiv}>
                      <Typography>
                        <strong>Fecha inicio: </strong>
                        {moment.unix(data.startDate).format('DD/MM/YYYY')}
                      </Typography>
                      <Typography>
                        <strong>Fecha fin: </strong>
                        {moment.unix(data.endDate).format('DD/MM/YYYY')}
                      </Typography>
                    </div>
                  </Fieldset>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Fieldset title="Paciente">
                    <Typography>
                      <strong>Nombre Y Apellidos: </strong>
                      {getPropValue(data, 'user.fullname')}
                    </Typography>
                  </Fieldset>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Fieldset title="Medicamentos">
                    <div className={classes.containerDetailDiv}>
                      {data.medicines.map(medicine => (
                        <div key={uuid()} className={classes.rowMedicineDetail}>
                          <Typography component="span">
                            <strong>{medicine.name}</strong>
                          </Typography>
                          <Typography component="span" style={{ margin: 'auto' }}>
                            <strong>{medicine.edited && 'Editado'}</strong>
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </Fieldset>
                </Grid>
              </Grid>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

function RowListTreatmentsComponent({
  cells,
  row,
  open,
  setOpen,
  selected,
  selectRow,
  onModalVisible,
  editRole,
  delRole
}) {
  const classes = useStyles();
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
        {cells.map(cell => {
          const value =
            cell.id === 'startDate' || cell.id === 'endDate'
              ? moment.unix(row[cell.id]).format('DD/MM/YYYY')
              : row[cell.id];
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
export default RowListTreatmentsComponent;

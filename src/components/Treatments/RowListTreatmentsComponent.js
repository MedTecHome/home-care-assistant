import React from 'react';
import uuid from 'uuid4';
import {
  TableRow,
  TableCell,
  Typography,
  ButtonGroup,
  Collapse,
  IconButton,
  Grid,
  TableContainer,
  TableHead,
  Table,
  TableBody
} from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon } from '@material-ui/icons';
import moment from 'moment';
import { makeStyles, fade } from '@material-ui/core/styles';
import clsx from 'clsx';
import { DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';
import DeleteButtonIcon from '../buttons/DeleteButtonIcon';
import EditButtonIcon from '../buttons/EditButtonIcon';
import Fieldset from '../containers/fieldset';
import { getPropValue } from '../../helpers/utils';
import TextFromProfileComponent from '../Profiles/TextFromProfileComponent';

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

function TableMedicines({ medicines }) {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="center">Dosis</TableCell>
            <TableCell align="center">Frecuencia</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medicines.map(medicine => (
            <TableRow key={uuid()}>
              <TableCell>{getPropValue(medicine, 'name')}</TableCell>
              <TableCell align="center">{`${getPropValue(medicine, 'doseCant') || '-'} ${
                getPropValue(medicine, 'doseTypeObj.abbreviation') || getPropValue(medicine, 'doseTypeObj.name') || ''
              }`}</TableCell>
              <TableCell align="center">{getPropValue(medicine, 'frequency')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function DetailTreatmentRowCellComponent({ open, data }) {
  const classes = useStyles();
  return (
    <>
      {open && open === data.id && (
        <TableRow className={classes.contentDetailRow}>
          <TableCell colSpan={6}>
            <Collapse in={open && open === data.id} timeout="auto" unmountOnExit addEndListener={() => {}}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Fieldset title="Paciente">
                    <Typography component="label" noWrap>
                      <strong>Nombre Y Apellidos: </strong>
                      <TextFromProfileComponent profileId={getPropValue(data, 'user')} />
                    </Typography>
                  </Fieldset>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Fieldset title="General">
                    <div className={classes.containerDetailDiv}>
                      <Typography>
                        <strong>Tipo: </strong>
                        {data.name}
                      </Typography>
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
                  <Fieldset title="Medicamentos">
                    <div className={classes.containerDetailDiv}>
                      <TableMedicines medicines={[data.medicineObject]} />
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

function RowListTreatmentsComponent({ row, open, setOpen, selected, selectRow, onModalVisible, editRole, delRole }) {
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
        <TableCell>{getPropValue(row, 'medicineObject.name')}</TableCell>
        <TableCell align="center">{`${getPropValue(row, 'medicineObject.doseCant')} ${
          getPropValue(row, 'medicineObject.doseTypeObj.abbreviation') ||
          getPropValue(row, 'medicineObject.doseTypeObj.name') ||
          ''
        }`}</TableCell>
        <TableCell align="center">{getPropValue(row, 'medicineObject.frequency')}</TableCell>
        <TableCell align="center">{moment.unix(row.startDate).format('DD/MM/YYYY')}</TableCell>
        <TableCell align="center">{moment.unix(row.endDate).format('DD/MM/YYYY')}</TableCell>
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

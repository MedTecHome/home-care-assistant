import React, { useEffect, useCallback, useState } from 'react';
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
import { getPropValue, isEmpty } from '../../helpers/utils';
import TextFromProfileComponent from '../text/TextFromProfileComponent';
import { AsyncDosis } from '../text/AsyncNomenclatorText';
import AsyncMedicineText from '../text/AsyncMedicineText';
import { getMedicineById } from '../../services/medicines';
import useCustomStyles from '../../jss/globalStyles';

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
  },
  cellNowrap: { whiteSpace: 'nowrap' }
});

function TableMedicines({ medicines }) {
  const classes = useCustomStyles();
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
            <TableRow key={medicine.id}>
              <TableCell className={classes.textUpperCase}>{getPropValue(medicine, 'name')}</TableCell>
              <TableCell align="center">
                {`${getPropValue(medicine, 'doseCant') || '-'}`}
                <AsyncDosis id={getPropValue(medicine, 'doseType')} />
              </TableCell>
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
                      <TableMedicines medicines={[data.medicines]} />
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
  const [medicine, setMedicine] = useState({});

  const fetchMedicine = useCallback(async () => {
    let medicineSetting = JSON.parse(row.medicineSetting);
    if (isEmpty(medicineSetting)) {
      const result = await getMedicineById(row.medicines);
      medicineSetting = result;
    }
    setMedicine(medicineSetting);
  }, [row.medicineSetting, row.medicines]);

  useEffect(() => {
    fetchMedicine();
  }, [fetchMedicine]);

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
        key={row.id}
        selected={selected && selected.id === row.id}
      >
        <TableCell>
          <AsyncMedicineText id={getPropValue(row, 'medicines')} />
        </TableCell>
        <TableCell align="center">
          {`${getPropValue(medicine, 'doseCant') || '-'}`}
          <AsyncDosis id={getPropValue(medicine, 'doseType')} />
        </TableCell>
        <TableCell align="center">{getPropValue(medicine, 'frequency') || '-'}</TableCell>
        <TableCell align="center">{moment.unix(row.startDate).format('DD/MM/YYYY')}</TableCell>
        <TableCell align="center">{moment.unix(row.endDate).format('DD/MM/YYYY')}</TableCell>
        <TableCell align="center" className={classes.cellNowrap}>
          <IconButton aria-label="expand row" size="small" onClick={() => handleRowClick(row.id)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <ButtonGroup variant="text" aria-label="outlined primary button group">
            {editRole && <EditButtonIcon onClick={() => handleEditAction(row.id)} />}
            {delRole && <DeleteButtonIcon onClick={() => handleDeleteAction(row.id)} />}
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <DetailTreatmentRowCellComponent open={open} data={{ ...row, medicines: medicine }} />
    </>
  );
}
export default RowListTreatmentsComponent;

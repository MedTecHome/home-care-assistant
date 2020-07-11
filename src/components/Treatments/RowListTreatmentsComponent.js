import React, { useEffect, useCallback, useState, useRef } from 'react';
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
  TableBody,
  useMediaQuery
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
import AsyncMedicineText from '../text/AsyncMedicineText';
import { getMedicineById } from '../../services/medicines';
import GenericAsyncNomenclator from '../text/AsyncNomenclatorText';

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
          {medicines.map(medicine => {
            return (
              <TableRow key={medicine.id}>
                <TableCell>{getPropValue(medicine, 'name')}</TableCell>
                <TableCell align="center">
                  {`${getPropValue(medicine, 'doseCant') || '-'}`}
                  <GenericAsyncNomenclator id={getPropValue(medicine, 'doseType')} nomenclator="dosis" />
                </TableCell>
                <TableCell align="center">{getPropValue(medicine, 'frequency')}</TableCell>
              </TableRow>
            );
          })}
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
          <TableCell colSpan={8}>
            <Collapse in={open && open === data.id} timeout="auto" unmountOnExit addEndListener={() => {}}>
              <Typography component="label" noWrap>
                <strong>Nombre Y Apellidos: </strong>
                <TextFromProfileComponent profileId={getPropValue(data, 'user')} />
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Fieldset title="General">
                    <div className={classes.containerDetailDiv}>
                      <Typography component="label">
                        <strong>Motivo de administación: </strong>
                        <GenericAsyncNomenclator
                          id={getPropValue(data.medicine, 'administrationType')}
                          nomenclator="administrationroute"
                        />
                      </Typography>
                      <Typography compolenent="label">
                        <strong>Fecha inicio: </strong>
                        {moment.unix(data.startDate).format('DD/MM/YYYY')}
                      </Typography>
                      <Typography compolenent="label">
                        <strong>Fecha fin: </strong>
                        {moment.unix(data.endDate).format('DD/MM/YYYY')}
                      </Typography>
                      <Typography compolenent="label">
                        <strong>Observaciones: </strong>
                        <span>{getPropValue(data.medicine, 'observations') || '-'}</span>
                      </Typography>
                    </div>
                  </Fieldset>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Fieldset title="Medicamentos">
                    <div className={classes.containerDetailDiv}>
                      <TableMedicines medicines={[data.medicine]} />
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
  const mounted = useRef(true);

  const matchXs = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const matchSm = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const fetchMedicine = useCallback(async () => {
    let medicineSettings = JSON.parse(row.medicineSettings);
    if (isEmpty(medicineSettings)) {
      const result = await getMedicineById(row.medicine);
      medicineSettings = result;
    }
    if (mounted.current) {
      setMedicine(medicineSettings);
    }
  }, [row.medicineSettings, row.medicine]);

  useEffect(() => {
    mounted.current = true;
    fetchMedicine();
    return () => {
      mounted.current = false;
    };
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
          <AsyncMedicineText id={getPropValue(row, 'medicine')} />
        </TableCell>
        <TableCell align="center">
          {`${getPropValue(medicine, 'concentrationCant') || '-'} `}
          <GenericAsyncNomenclator id={getPropValue(medicine, 'concentrationType')} nomenclator="concentrations" />
        </TableCell>
        {!matchXs && (
          <TableCell align="center">
            {`${getPropValue(medicine, 'doseCant') || '-'}`}
            <GenericAsyncNomenclator id={getPropValue(medicine, 'doseType')} nomenclator="dosis" />
          </TableCell>
        )}
        {!matchXs && <TableCell align="center">{getPropValue(medicine, 'frequency') || '-'}</TableCell>}
        {!matchXs && !matchSm && (
          <TableCell align="center">
            <GenericAsyncNomenclator
              id={getPropValue(medicine, 'administrationType')}
              nomenclator="administrationroute"
            />
          </TableCell>
        )}
        {!matchXs && !matchSm && (
          <TableCell align="center">{moment.unix(row.startDate).format('DD/MM/YYYY')}</TableCell>
        )}
        {!matchXs && !matchSm && <TableCell align="center">{moment.unix(row.endDate).format('DD/MM/YYYY')}</TableCell>}

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
      <DetailTreatmentRowCellComponent open={open} data={{ ...row, medicine }} />
    </>
  );
}
export default RowListTreatmentsComponent;

import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Imagen from 'material-ui-image';
import moment from 'moment';
import { usePatientHistoryContext } from './PatientHistoryContext';
import { DialogTitleComponent } from '../../ModalComponent';
import { findByIdePatientMedicalForm } from '../Nomenc';

const useStyles = makeStyles({
  textStyle: {
    '&>*': {
      fontSize: 12,
      lineHeight: '200%',
      fontWeight: 400,
      color: '#000',
    },
  },
});

function DetailHistoryMedicalFormComponent() {
  const { selected, setModalVisible } = usePatientHistoryContext();
  const classes = useStyles();

  const handleClose = () => {
    setModalVisible(false, null);
  };

  return (
    <>
      <DialogTitleComponent onClose={handleClose}>
        {findByIdePatientMedicalForm(selected.type).name}
      </DialogTitleComponent>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <Imagen src="#" />
          </Grid>
          <Grid item xs={9} sm={9} md={9} lg={9} xl={9} className={classes.textStyle}>
            {selected.type === 'pressure' && (
              <>
                <Typography noWrap>
                  Diastolica: <strong>{selected.diastolica}</strong>
                </Typography>
                <Typography noWrap>
                  Sistolica: <strong>{selected.sistolica}</strong>
                </Typography>
                <Typography noWrap>
                  Frecuencia Cardiaca: <strong>{selected.heartrate}</strong>
                </Typography>
              </>
            )}
            {selected.type === 'temperature' && (
              <>
                <Typography noWrap>
                  Grados: <strong>{selected.celsiusDegree}</strong>
                </Typography>
              </>
            )}
            {selected.type === 'weight' && (
              <>
                <Typography noWrap>
                  Peso: <strong>{selected.weight}kg</strong>
                </Typography>
              </>
            )}
            {selected.type === 'glucose' && (
              <>
                <Typography noWrap>
                  Concentracion de azucar: <strong>{selected.sugarConcentration}</strong>
                </Typography>
              </>
            )}
            {selected.type === 'breathing' && (
              <>
                <Typography noWrap>
                  EtCO: <strong>{selected.EtCO}mmHg</strong>
                </Typography>
                <Typography noWrap>
                  PI: <strong>{selected.PI}%</strong>
                </Typography>
                <Typography noWrap>
                  Frecuencia Respiratoria: <strong>{selected.breathingFrecuency}RPM</strong>
                </Typography>
              </>
            )}
            {selected.type === 'oxigen' && (
              <>
                <Typography noWrap>
                  Nota: <strong>{selected.note}</strong>
                </Typography>
              </>
            )}
            {selected.type === 'inr' && (
              <>
                <Typography noWrap>
                  INR: <strong>{selected.INR}</strong>
                </Typography>
              </>
            )}
            {selected.type === 'oxygen' && (
              <>
                <Typography noWrap>
                  Pulso: <strong>{selected.heartbeat}LPM</strong>
                </Typography>
                <Typography noWrap>
                  SpO2: <strong>{selected.SpO2}%</strong>
                </Typography>
                <Typography noWrap>
                  PI: <strong>{selected.PI}%</strong>
                </Typography>
              </>
            )}
            {selected.type === 'exercises' && (
              <>
                <Typography noWrap>
                  Distancia: <strong>{selected.distance}m</strong>
                </Typography>
                <Typography noWrap>
                  Tiempo: <strong>{selected.time}%</strong>
                </Typography>
                <Typography noWrap>
                  Cantidad de pasos: <strong>{selected.steps}%</strong>
                </Typography>
              </>
            )}
            <Typography>
              Fecha <strong>{selected && moment(selected.date.toDate()).format('DD/MM/YYYY hh:mma')}</strong>
            </Typography>
            <Typography>
              Nota <strong>{selected.note}</strong>
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button size="small" disableElevation color="primary" variant="contained" onClick={handleClose}>
          Aceptar
        </Button>
      </DialogActions>
    </>
  );
}

export default DetailHistoryMedicalFormComponent;

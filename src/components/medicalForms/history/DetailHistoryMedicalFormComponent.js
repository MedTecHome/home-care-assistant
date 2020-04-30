import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { usePatientHistoryContext } from './PatientHistoryContext';
import { DialogTitleComponent } from '../../ModalComponent';
import { findByIdePatientMedicalForm } from '../nomenc';

const useStyles = makeStyles({
  root: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '0.475rem',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 400,
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
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
        <Grid container spacing={2} className={classes.root}>
          {selected.type === 'pressure' && (
            <>
              <Grid item xs={1} sm={4} />
              <Grid item xs={12} sm={8} container spacing={2}>
                <Grid item xs={12}>
                  <Typography>Diastolica: {selected.diastolica}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Sistolica: {selected.sistolica}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Frecuencia Cardiaca: {selected.heartrate}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Nota: {selected.note}</Typography>
                </Grid>
              </Grid>
            </>
          )}
          {selected.type === 'temperature' && (
            <>
              <Grid item xs={4} />
              <Grid item xs={8} container spacing={2}>
                <Grid item xs={12}>
                  <Typography>Grados: {selected.celsiusDegree}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Nota: {selected.note}</Typography>
                </Grid>
              </Grid>
            </>
          )}
          {selected.type === 'weight' && (
            <>
              <Grid item xs={4} />
              <Grid item xs={8} container spacing={2}>
                <Grid item xs={12}>
                  <Typography>Peso: {selected.weight}kg</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Nota: {selected.note}</Typography>
                </Grid>
              </Grid>
            </>
          )}
          {selected.type === 'glucose' && (
            <>
              <Grid item xs={4} />
              <Grid item xs={8} container spacing={2}>
                <Grid item xs={12}>
                  <Typography>Concentracion de azucar: {selected.sugarConcentration}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Nota: {selected.note}</Typography>
                </Grid>
              </Grid>
            </>
          )}
          {selected.type === 'breathing' && (
            <>
              <Grid item xs={4} />
              <Grid item xs={8} container spacing={2}>
                <Grid item xs={12}>
                  <Typography>EtCO: {selected.EtCO}mmHg</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>PI: {selected.PI}%</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Frecuencia Respiratoria: {selected.breathingFrecuency}RPM</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Nota: {selected.note}</Typography>
                </Grid>
              </Grid>
            </>
          )}
          {selected.type === 'oxigen' && (
            <>
              <Grid item xs={4} />
              <Grid item xs={8} container spacing={2}>
                <Grid item xs={12} />
                <Grid item xs={12}>
                  <Typography>Nota: {selected.note}</Typography>
                </Grid>
              </Grid>
            </>
          )}
          {selected.type === 'inr' && (
            <>
              <Grid item xs={4} />
              <Grid item xs={8} container spacing={2}>
                <Grid item xs={12}>
                  <Typography>INR: {selected.INR}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Nota: {selected.note}</Typography>
                </Grid>
              </Grid>
            </>
          )}
          {selected.type === 'heartbeat' && (
            <>
              <Grid item xs={4} />
              <Grid item xs={8} container spacing={2}>
                <Grid item xs={12}>
                  <Typography>Pulso: {selected.heartbeat}LPM</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>SpO2: {selected.SpO2}%</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>PI: {selected.PI}%</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Nota: {selected.note}</Typography>
                </Grid>
              </Grid>
            </>
          )}
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

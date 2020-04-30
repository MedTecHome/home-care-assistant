import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { usePatientHistoryContext } from './PatientHistoryContext';
import { DialogTitleComponent } from '../../ModalComponent';
import { findByIdePatientMedicalForm } from '../Nomenc';

const styles = {
  styledTypography: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '0.875rem',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 400,
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
  },
};

const StyledTypography = withStyles(styles)(({ children, classes }) => {
  return (
    <Typography className={classes.styledTypography} noWrap>
      {children}
    </Typography>
  );
});

function DetailHistoryMedicalFormComponent() {
  const { selected, setModalVisible } = usePatientHistoryContext();

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
          {selected.type === 'pressure' && (
            <>
              <Grid item xs={1} sm={4} />
              <Grid item xs={12} sm={8} container spacing={2}>
                <Grid item xs={12}>
                  <StyledTypography noWrap>Diastolica: {selected.diastolica}</StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography noWrap>Sistolica: {selected.sistolica}</StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography noWrap>Frecuencia Cardiaca: {selected.heartrate}</StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography noWrap>Nota: {selected.note}</StyledTypography>
                </Grid>
              </Grid>
            </>
          )}
          {selected.type === 'temperature' && (
            <>
              <Grid item xs={4} />
              <Grid item xs={8} container spacing={2}>
                <Grid item xs={12}>
                  <StyledTypography noWrap>Grados: {selected.celsiusDegree}</StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography noWrap>Nota: {selected.note}</StyledTypography>
                </Grid>
              </Grid>
            </>
          )}
          {selected.type === 'weight' && (
            <>
              <Grid item xs={4} />
              <Grid item xs={8} container spacing={2}>
                <Grid item xs={12}>
                  <StyledTypography noWrap>Peso: {selected.weight}kg</StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography noWrap>Nota: {selected.note}</StyledTypography>
                </Grid>
              </Grid>
            </>
          )}
          {selected.type === 'glucose' && (
            <>
              <Grid item xs={4} />
              <Grid item xs={8} container spacing={2}>
                <Grid item xs={12}>
                  <StyledTypography noWrap>Concentracion de azucar: {selected.sugarConcentration}</StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography noWrap>Nota: {selected.note}</StyledTypography>
                </Grid>
              </Grid>
            </>
          )}
          {selected.type === 'breathing' && (
            <>
              <Grid item xs={4} />
              <Grid item xs={8} container spacing={2}>
                <Grid item xs={12}>
                  <StyledTypography noWrap>EtCO: {selected.EtCO}mmHg</StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography noWrap>PI: {selected.PI}%</StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography noWrap>Frecuencia Respiratoria: {selected.breathingFrecuency}RPM</StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography noWrap>Nota: {selected.note}</StyledTypography>
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
                  <StyledTypography noWrap>Nota: {selected.note}</StyledTypography>
                </Grid>
              </Grid>
            </>
          )}
          {selected.type === 'inr' && (
            <>
              <Grid item xs={4} />
              <Grid item xs={8} container spacing={2}>
                <Grid item xs={12}>
                  <StyledTypography noWrap>INR: {selected.INR}</StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <Typography noWrap>Nota: {selected.note}</Typography>
                </Grid>
              </Grid>
            </>
          )}
          {selected.type === 'heartbeat' && (
            <>
              <Grid item xs={4} />
              <Grid item xs={8} container spacing={2}>
                <Grid item xs={12}>
                  <StyledTypography noWrap>Pulso: {selected.heartbeat}LPM</StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography noWrap>SpO2: {selected.SpO2}%</StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography noWrap>PI: {selected.PI}%</StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography noWrap>Nota: {selected.note}</StyledTypography>
                </Grid>
              </Grid>
            </>
          )}
          {selected.type === 'exercises' && (
            <>
              <Grid item xs={4} />
              <Grid item xs={8} container spacing={2}>
                <Grid item xs={12}>
                  <StyledTypography noWrap>Distancia: {selected.distance}m</StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography noWrap>Tiempo: {selected.time}%</StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography noWrap>Cantidad de pasos: {selected.steps}%</StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography noWrap>Nota: {selected.note}</StyledTypography>
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

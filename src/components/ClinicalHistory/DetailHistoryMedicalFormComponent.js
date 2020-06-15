import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { getPropValue } from '../../helpers/utils';
import { DialogTitleComponent } from '../ModalComponent';
import { usePatientHistoryContext } from './PatientHistoryContext';
import { intakeTimeSource, severityConstant } from '../../helpers/constants';
import TitleAndIconComponent from '../MedicalForms/TitleAndIconComponent';

const useStyles = makeStyles({
  textStyle: {
    '&>*': {
      lineHeight: '200%',
      fontWeight: 400,
      color: '#000'
    }
  },
  contentStyle: {
    maxWidth: 400,
    minWidth: 350
  }
});

export function DetailHistoryMedicalFormContentComponent({ className, selected }) {
  return (
    <Grid item xs={12} className={className}>
      {selected.type === 'pressure' && (
        <>
          <Typography component="div">
            <strong>Diastolica: </strong>
            {getPropValue(selected, 'diastolica') || '-'}
          </Typography>
          <Typography component="div">
            <strong>Sistolica: </strong>
            {getPropValue(selected, 'sistolica') || '-'}
          </Typography>
          <Typography component="div">
            <strong>Frecuencia Cardiaca: </strong>
            {getPropValue(selected, 'heartrate') || '-'}
          </Typography>
        </>
      )}
      {selected.type === 'heartrate' && (
        <>
          <Typography component="div">
            <strong>Frecuencia Cardiaca: </strong>
            {getPropValue(selected, 'heartrate') || '-'}
          </Typography>
        </>
      )}
      {selected.type === 'temperature' && (
        <>
          <Typography component="div">
            <strong>Temperatura: </strong>
            {`${getPropValue(selected, 'celsiusDegree')}℃` || '-'}
          </Typography>
        </>
      )}
      {selected.type === 'weight' && (
        <>
          <Typography component="div">
            <strong>Peso: </strong>
            {`${getPropValue(selected, 'weight')}kg` || '-'}
          </Typography>
        </>
      )}
      {selected.type === 'glucose' && (
        <>
          <Typography component="div">
            <strong>Concentración de azucar: </strong>
            {`${getPropValue(selected, 'sugarConcentration')} ${getPropValue(selected, 'glucoseUnity')}` || '-'}
          </Typography>
          <Typography component="div">
            <strong>Horario: </strong>
            {getPropValue(selected, 'shedule.name') || '-'}
          </Typography>
          <Typography component="div">
            <strong>Momento de ingesta: </strong>
            {intakeTimeSource.find(item => item.id === getPropValue(selected, 'intakeTime')).name || '-'}
          </Typography>
          <Typography component="div" />
          <Typography component="div">
            <strong>HbA1c: </strong>
            {getPropValue(selected, 'hba1c') || '-'}
          </Typography>
          <Typography component="div">
            <strong>Insulina(comida): </strong>
            {getPropValue(selected, 'insulinaFood') || '-'}
          </Typography>
          <Typography component="div">
            <strong>Basal: </strong>
            {getPropValue(selected, 'basal') || '-'}
          </Typography>
          <Typography component="div">
            <strong>Unidad de pan: </strong>
            {getPropValue(selected, 'breadUnity') || '-'}
          </Typography>
        </>
      )}
      {selected.type === 'breathing' && (
        <>
          <Typography component="div">
            <strong>EtCO: </strong>
            {`${getPropValue(selected, 'EtCO')}mmHg` || '-'}
          </Typography>
          <Typography component="div">
            <strong>PI: </strong>
            {`${getPropValue(selected, 'breathingPI')}%` || '-'}
          </Typography>
          <Typography component="div">
            <strong>Frecuencia Respiratoria: </strong>
            {`${getPropValue(selected, 'breathingFrecuency')}RPM` || '-'}
          </Typography>
        </>
      )}
      {selected.type === 'inr' && (
        <>
          <Typography component="div">
            <strong>INR: </strong>
            {`${getPropValue(selected, 'INR')}%` || '-'}
          </Typography>
        </>
      )}
      {selected.type === 'oxygen' && (
        <>
          <Typography component="div">
            <strong>Pulso: </strong>
            {`${getPropValue(selected, 'heartbeat')}LPM` || '-'}
          </Typography>
          <Typography component="div">
            <strong>SpO2: </strong>
            {`${getPropValue(selected, 'SpO2')}%` || '-'}
          </Typography>
          <Typography component="div">
            <strong>PI: </strong>
            {`${getPropValue(selected, 'oxygenPI')}%` || '-'}
          </Typography>
        </>
      )}
      {selected.type === 'exercises' && (
        <>
          <Typography component="div">
            <strong>Distancia: </strong>
            {`${getPropValue(selected, 'distance')}m` || '-'}
          </Typography>
          <Typography component="div">
            <strong>Tiempo: </strong>
            {`${getPropValue(selected, 'time')}min` || '-'}
          </Typography>
          <Typography component="div">
            <strong>Cantidad de pasos: </strong>
            {`${getPropValue(selected, 'steps')}` || '-'}
          </Typography>
        </>
      )}

      {selected.type === 'otherstest' && (
        <>
          <Typography component="div">
            <strong>Nombre: </strong>
            {getPropValue(selected, 'othersName') || '-'}
          </Typography>
          <Typography component="div">
            <strong>Severidad: </strong>
            {getPropValue(
              severityConstant.find(item => item.id === getPropValue(selected, 'severity')),
              'name'
            ) || '-'}
          </Typography>
        </>
      )}

      <Typography component="div">
        <strong>Fecha: </strong>
        {selected && moment.unix(selected.clinicalDate).format('DD/MM/YYYY')}
      </Typography>
      <Typography component="div">
        <strong>Hora: </strong>
        {selected && moment.unix(selected.clinicalDate).format('hh:mma')}
      </Typography>
      <Typography component="div">
        <strong>Nota: </strong>
        {getPropValue(selected, 'note') || '-'}
      </Typography>
    </Grid>
  );
}

function DetailHistoryMedicalFormComponent() {
  const { selected, setModalVisible } = usePatientHistoryContext();
  const classes = useStyles();

  const handleClose = () => {
    setModalVisible(false, null);
  };

  return (
    <>
      <DialogTitleComponent onClose={handleClose}>
        <TitleAndIconComponent
          type={getPropValue(selected, 'type')}
          alternativeTitle={`Prueba - (${getPropValue(selected, 'othersName')})`}
        />
      </DialogTitleComponent>
      <DialogContent className={classes.contentStyle} dividers>
        <Grid container spacing={2}>
          <DetailHistoryMedicalFormContentComponent selected={selected} className={classes.textStyle} />
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

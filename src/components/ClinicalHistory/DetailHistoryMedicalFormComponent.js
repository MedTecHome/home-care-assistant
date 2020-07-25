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
import TitleAndIconComponent from '../TitleAndIconComponent';
import legendColors from '../../helpers/legendColors';

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
  },
  textColor: {
    color: props => props.color || '#000000'
  }
});

function TextWithColor({ color, children }) {
  const classes = useStyles({ color });
  return (
    <Typography component="span" className={classes.textColor}>
      {children}
    </Typography>
  );
}

export function DetailHistoryMedicalFormContentComponent({ className, selected }) {
  const legend = selected.legend || selected.diasLegend || selected.sisLegend;
  const color = legend.option === -1 ? legend.color : legendColors[legend.option][legend.color];

  return (
    <Grid item xs={12} className={className}>
      {selected.type === 'pressure' && (
        <>
          <Typography component="div">
            <strong>{`Diastolica: `}</strong>
            <TextWithColor
              color={
                selected.diasLegend.option === -1
                  ? selected.diasLegend.color
                  : legendColors[selected.diasLegend.option][selected.diasLegend.color]
              }
            >
              {getPropValue(selected, 'diastolica') || '-'}
            </TextWithColor>
          </Typography>
          <Typography component="div">
            <strong>{`Sistolica: `}</strong>
            <TextWithColor
              color={
                selected.sisLegend.option === -1
                  ? selected.sisLegend.color
                  : legendColors[selected.sisLegend.option][selected.sisLegend.color]
              }
            >
              {getPropValue(selected, 'sistolica') || '-'}
            </TextWithColor>
          </Typography>
          <Typography component="div">
            <strong>{`Frecuencia Cardiaca: `}</strong>
            <TextWithColor>{`${getPropValue(selected, 'heartrate') || '-'}(LPM)`}</TextWithColor>
          </Typography>
        </>
      )}
      {selected.type === 'heartrate' && (
        <>
          <Typography component="div">
            <strong>{`Frecuencia Cardiaca: `}</strong>
            <TextWithColor color={color}>{`${getPropValue(selected, 'heartrate') || '-'}(LPM)`}</TextWithColor>
          </Typography>
        </>
      )}
      {selected.type === 'temperature' && (
        <>
          <Typography component="div">
            <strong>{`Temperatura: `}</strong>
            <TextWithColor color={color}>{`${getPropValue(selected, 'celsiusDegree')}(℃)` || '-'}</TextWithColor>
          </Typography>
        </>
      )}
      {selected.type === 'weight' && (
        <>
          <Typography component="div">
            <strong>{`Peso: `}</strong>
            <TextWithColor color={color}>{`${getPropValue(selected, 'weight')}(kg)` || '-'}</TextWithColor>
          </Typography>
        </>
      )}
      {selected.type === 'glucose' && (
        <>
          <Typography component="div">
            <strong>{`Concentración de azúcar: `}</strong>
            <TextWithColor color={color}>
              {`${getPropValue(selected, 'sugarConcentration')} ${getPropValue(selected, 'glucoseUnity')}` || '-'}
            </TextWithColor>
          </Typography>
          <Typography component="div">
            <strong>{`Horario: `}</strong>
            <TextWithColor color={color}>{getPropValue(selected, 'shedule.name') || '-'}</TextWithColor>
          </Typography>
          <Typography component="div">
            <strong>{`Momento de ingesta: `}</strong>
            <TextWithColor color={color}>
              {intakeTimeSource.find(item => item.id === getPropValue(selected, 'intakeTime')).name || '-'}
            </TextWithColor>
          </Typography>
          <Typography component="div" />
          <Typography component="div">
            <strong>{`HbA1c: `}</strong>
            <TextWithColor color={color}>{getPropValue(selected, 'hba1c') || '-'}</TextWithColor>
          </Typography>
          <Typography component="div">
            <strong>{`Insulina(comida): `}</strong>
            <TextWithColor color={color}>{getPropValue(selected, 'insulinaFood') || '-'}</TextWithColor>
          </Typography>
          <Typography component="div">
            <strong>{`Basal: `}</strong>
            <TextWithColor color={color}>{getPropValue(selected, 'basal') || '-'}</TextWithColor>
          </Typography>
          <Typography component="div">
            <strong>{`Unidad de pan: `}</strong>
            <TextWithColor color={color}>{getPropValue(selected, 'breadUnity') || '-'}</TextWithColor>
          </Typography>
        </>
      )}
      {selected.type === 'breathing' && (
        <>
          <Typography component="div">
            <strong>{`EtCO: `}</strong>
            <TextWithColor color={color}>{`${getPropValue(selected, 'EtCO')}(mmHg)` || '-'}</TextWithColor>
          </Typography>
          <Typography component="div">
            <strong>{`PI: `}</strong>
            <TextWithColor color={color}>{`${getPropValue(selected, 'breathingPI')}(%)` || '-'}</TextWithColor>
          </Typography>
          <Typography component="div">
            <strong>{`Frecuencia Respiratoria: `}</strong>
            <TextWithColor color={color}>{`${getPropValue(selected, 'breathingFrecuency')}(RPM)` || '-'}</TextWithColor>
          </Typography>
        </>
      )}
      {selected.type === 'inr' && (
        <>
          <Typography component="div">
            <strong>{`INR: `}</strong>
            <TextWithColor color={color}>{`${getPropValue(selected, 'INR')}(%)` || '-'}</TextWithColor>
          </Typography>
        </>
      )}
      {selected.type === 'oxygen' && (
        <>
          <Typography component="div">
            <strong>{`Pulso: `}</strong>
            <TextWithColor color={color}>{`${getPropValue(selected, 'heartbeat')}(LPM)` || '-'}</TextWithColor>
          </Typography>
          <Typography component="div">
            <strong>{`SpO2: `}</strong>
            <TextWithColor color={color}>{`${getPropValue(selected, 'SpO2')}(%)` || '-'}</TextWithColor>
          </Typography>
          <Typography component="div">
            <strong>{`PI: `}</strong>
            <TextWithColor color={color}>{`${getPropValue(selected, 'oxygenPI')}(%)` || '-'}</TextWithColor>
          </Typography>
        </>
      )}
      {selected.type === 'exercises' && (
        <>
          <Typography component="div">
            <strong>{`Distancia: `}</strong>
            <TextWithColor color={color}>{`${getPropValue(selected, 'distance')}(m)` || '-'}</TextWithColor>
          </Typography>
          <Typography component="div">
            <strong>Tiempo: </strong>
            <TextWithColor color={color}>{`${getPropValue(selected, 'time')}(min)` || '-'}</TextWithColor>
          </Typography>
          <Typography component="div">
            <strong>{`Cantidad de pasos: `}</strong>
            <TextWithColor color={color}>{`${getPropValue(selected, 'steps')}` || '-'}</TextWithColor>
          </Typography>
        </>
      )}

      {selected.type === 'otherstest' && (
        <>
          <Typography component="div">
            <strong>{`Nombre: `}</strong>
            <TextWithColor color={color}> {getPropValue(selected, 'othersName') || '-'}</TextWithColor>
          </Typography>
          <Typography component="div">
            <strong>{`Severidad: `}</strong>
            <TextWithColor color={color}>
              {getPropValue(
                severityConstant.find(item => item.id === getPropValue(selected, 'severity')),
                'name'
              ) || '-'}
            </TextWithColor>
          </Typography>
        </>
      )}

      <Typography component="div">
        <strong>{`Fecha: `}</strong>
        {selected && moment.unix(selected.clinicalDate).format('DD/MM/YYYY')}
      </Typography>
      <Typography component="div">
        <strong>{`Hora: `}</strong>
        {selected && moment.unix(selected.clinicalDate).format('hh:mma')}
      </Typography>
      <Typography component="div">
        <strong>{`Nota: `}</strong>
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

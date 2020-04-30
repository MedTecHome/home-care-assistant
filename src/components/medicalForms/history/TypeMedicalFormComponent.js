import React, { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  listItemValues: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    gridRowGap: 14,
  },
  listItem: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '0.875rem',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 400,
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
    justifySelf: 'left',
  },
});

function TypeMedicalFormComponent({ data, type: { id: idType } }) {
  const classes = useStyles();
  return (
    <div className={classes.listItemValues}>
      {idType === 'pressure' && (
        <>
          <Typography className={classes.listItem}>{`Pulsaciones: ${data.heartrate}`}</Typography>
          <Typography className={classes.listItem}>{`Sistolica: ${data.sistolica}`}</Typography>
          <Typography className={classes.listItem}>{`Diastolica: ${data.diastolica}`}</Typography>
        </>
      )}
      {idType === 'temperature' && (
        <>
          <Typography className={classes.listItem}>{`Grados: ${data.celsiusDegree}°C`}</Typography>
        </>
      )}
      {idType === 'weight' && (
        <>
          <Typography className={classes.listItem}>{`Peso: ${data.weight}kg`}</Typography>
        </>
      )}
      {idType === 'glucose' && (
        <>
          <Typography className={classes.listItem}>{`Concentracion de azucar: ${data.sugarConcentration}`}</Typography>
        </>
      )}
      {idType === 'breathing' && (
        <>
          <Typography className={classes.listItem}>{`EtCO: ${data.EtCO} mmHg`}</Typography>
          <Typography
            className={classes.listItem}
          >{`Frecuencia Repiraoria: ${data.breathingFrecuency} RPM`}</Typography>
          <Typography className={classes.listItem}>{`Indice Perfucion (PI): ${data.PI}%`}</Typography>
        </>
      )}
      {idType === 'inr' && (
        <>
          <Typography className={classes.listItem}>{`INR: ${data.INR}`}</Typography>
        </>
      )}
      {idType === 'heartbeat' && (
        <>
          <Typography className={classes.listItem}>{`Puso: ${data.heartbeat} LPM`}</Typography>
          <Typography className={classes.listItem}>{`SpO2: ${data.SpO2}%`}</Typography>
          <Typography className={classes.listItem}>{`PI: ${data.PI}%`}</Typography>
        </>
      )}
    </div>
  );
}
export default memo(TypeMedicalFormComponent);

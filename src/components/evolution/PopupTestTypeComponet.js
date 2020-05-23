import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PopoverComponent from '../containers/PopoverComponent';
import { DetailHistoryMedicalFormContentComponent } from '../ClinicalHistory/DetailHistoryMedicalFormComponent';
import healthyStandards from '../../helpers/healthyStandards';

const useStyles = makeStyles({
  contextDetail: {
    width: 250
  }
});

function PopupTestTypeComponent({ data }) {
  const classes = useStyles();
  const color =
    (data.type.id === 'pressure' && healthyStandards.pressure(data.sistolica, data.diastolica)) ||
    (data.type.id === 'temperature' && healthyStandards.temperature(data.celsiusDegree)) ||
    (data.type.id === 'weight' && healthyStandards.weight(150, data.weight)) ||
    (data.type.id === 'glucose' && healthyStandards.glucose(data.sugarConcentration)) ||
    (data.type.id === 'inr' && healthyStandards.inr(data.INR)) ||
    (data.type.id === 'oxygen' && healthyStandards.heartbeat(data.heartbeat));

  return (
    <PopoverComponent
      title={
        <Typography
          component="span"
          style={{
            color: color.A700
          }}
        >
          {(data.type.id === 'pressure' && `${data.sistolica}/${data.diastolica}`) ||
            (data.type.id === 'temperature' && data.celsiusDegree) ||
            (data.type.id === 'weight' && data.weight) ||
            (data.type.id === 'breathing' && data.breathingFrequency) ||
            (data.type.id === 'glucose' && data.sugarConcentration) ||
            (data.type.id === 'inr' && data.INR) ||
            (data.type.id === 'oxygen' && data.heartbeat) ||
            (data.type.id === 'exercises' && data.steps)}
        </Typography>
      }
      content={<DetailHistoryMedicalFormContentComponent selected={data} className={classes.contextDetail} />}
    />
  );
}

export default PopupTestTypeComponent;

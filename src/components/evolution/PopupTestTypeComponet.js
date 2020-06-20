import { Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PopoverComponent from '../containers/PopoverComponent';
import { DetailHistoryMedicalFormContentComponent } from '../ClinicalHistory/DetailHistoryMedicalFormComponent';
import healthyStandards from '../../helpers/healthyStandards';
import { severityConstant } from '../../helpers/constants';
import { getPropValue } from '../../helpers/utils';
import TitleAndIconComponent from '../MedicalForms/TitleAndIconComponent';

const useStyles = makeStyles({
  contextDetail: {
    width: 250
  },
  textColor: {
    color: props => (props.color ? props.color.A700 : ''),
    baclgroundColor: props => (props.color ? props.color[200] : '')
  }
});

function PopupTestTypeComponent({ data }) {
  const color =
    (data.type === 'pressure' && healthyStandards.pressure(data.sistolica, data.diastolica)) ||
    (data.type === 'temperature' && healthyStandards.temperature(data.celsiusDegree)) ||
    (data.type === 'weight' && healthyStandards.weight(150, data.weight)) ||
    (data.type === 'glucose' && healthyStandards.glucose(data.sugarConcentration)) ||
    (data.type === 'inr' && healthyStandards.inr(data.INR)) ||
    (data.type === 'oxygen' && healthyStandards.heartbeat(data.heartbeat));

  const classes = useStyles({ color });

  return (
    <PopoverComponent
      header={<TitleAndIconComponent type={data.type} />}
      title={
        <Typography className={classes.textColor} component="span">
          {(data.type === 'pressure' && `${data.sistolica}/${data.diastolica}`) ||
            (data.type === 'heartrate' && `${data.heartrate}`) ||
            (data.type === 'temperature' && data.celsiusDegree) ||
            (data.type === 'weight' && data.weight) ||
            (data.type === 'breathing' && data.breathingFrecuency) ||
            (data.type === 'glucose' && data.sugarConcentration) ||
            (data.type === 'inr' && data.INR) ||
            (data.type === 'oxygen' && data.heartbeat) ||
            (data.type === 'exercises' && data.steps) ||
            (data.type === 'otherstest' &&
              getPropValue(
                severityConstant.find(sc => sc.id === data.severity),
                'name'
              )) ||
            '?'}
        </Typography>
      }
      content={<DetailHistoryMedicalFormContentComponent selected={data} className={classes.contextDetail} />}
    />
  );
}

export default PopupTestTypeComponent;

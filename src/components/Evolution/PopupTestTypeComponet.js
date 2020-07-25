import { Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PopoverComponent from '../containers/PopoverComponent';
import { DetailHistoryMedicalFormContentComponent } from '../ClinicalHistory/DetailHistoryMedicalFormComponent';
import { severityConstant } from '../../helpers/constants';
import { getPropValue } from '../../helpers/utils';
import TitleAndIconComponent from '../TitleAndIconComponent';
import legendColors from '../../helpers/legendColors';

const useStyles = makeStyles({
  contextDetail: {
    width: 250
  },
  textColor: {
    color: props => (props.color ? props.color : '')
  }
});

function PressureTextWithColor({ pressure }) {
  const classesSis = useStyles({
    color:
      pressure.sisLegend.option === -1
        ? pressure.sisLegend.color
        : legendColors[pressure.sisLegend.option][pressure.sisLegend.color]
  });

  const classesDis = useStyles({
    color:
      pressure.diasLegend.option === -1
        ? pressure.diasLegend.color
        : legendColors[pressure.diasLegend.option][pressure.diasLegend.color]
  });

  return (
    <div>
      <span className={classesSis.textColor}>{pressure.sistolica}</span>
      <span>/</span>
      <span className={classesDis.textColor}> {pressure.diastolica}</span>
    </div>
  );
}

function PopupTestTypeComponent({ data }) {
  const legend = data.legend || data.diasLegend || data.sisLegend;

  const classes = useStyles({
    color: legend.option === -1 ? legend.color : legendColors[legend.option][legend.color]
  });

  return (
    <PopoverComponent
      header={<TitleAndIconComponent type={data.type} />}
      title={
        <Typography className={classes.textColor} component="span">
          {(data.type === 'pressure' && <PressureTextWithColor pressure={data} />) ||
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

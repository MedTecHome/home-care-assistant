import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PopoverComponent from '../containers/PopoverComponent';
import { DetailHistoryMedicalFormContentComponent } from '../ClinicalHistory/DetailHistoryMedicalFormComponent';

const useStyles = makeStyles({
  textPopupDetail: {}
});

function PopupTestTypeComponent({ data }) {
  const classes = useStyles();
  return (
    <PopoverComponent
      title={
        (data.type.id === 'pressure' && `${data.sistolica}/${data.diastolica}`) ||
        (data.type.id === 'temperature' && data.celsiusDegree) ||
        (data.type.id === 'weight' && data.weight) ||
        (data.type.id === 'breathing' && data.breathingFrequency) ||
        (data.type.id === 'glucose' && data.sugarConcentration) ||
        (data.type.id === 'oxygen' && data.heartbeat) ||
        (data.type.id === 'exercises' && data.steps)
      }
      content={<DetailHistoryMedicalFormContentComponent selected={data} className={classes.textPopupDetail} />}
    />
  );
}

export default PopupTestTypeComponent;

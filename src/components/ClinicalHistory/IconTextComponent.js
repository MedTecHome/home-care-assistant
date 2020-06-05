import React from 'react';
import { makeStyles, Avatar } from '@material-ui/core';
import ClinicalTestIcon1 from '../../images/svg/1.svg';
import ClinicalTestIcon2 from '../../images/svg/2.svg';
import ClinicalTestIcon3 from '../../images/svg/3.svg';
import ClinicalTestIcon4 from '../../images/svg/4.svg';
import ClinicalTestIcon5 from '../../images/svg/5.svg';
import BreathingIconSvg from '../../images/svg/breathing.svg';
import ExercisesIconSvg from '../../images/svg/exercises.svg';
import TemperatureIconSvg from '../../images/svg/temperature.svg';
import GlucoseIconSvg from '../../images/svg/glucose.svg';
import InrIconSvg from '../../images/svg/inr.svg';

const useStyles = makeStyles({
  iconTest: {
    width: 53,
    height: 53
  }
});

function IconTestComponent({ type }) {
  const classes = useStyles();
  let iconSrc = '';
  switch (type) {
    case 'pressure': {
      iconSrc = ClinicalTestIcon1;
      break;
    }
    case 'temperature': {
      iconSrc = TemperatureIconSvg;
      break;
    }
    case 'weight': {
      iconSrc = ClinicalTestIcon3;
      break;
    }
    case 'glucose': {
      iconSrc = GlucoseIconSvg;
      break;
    }
    case 'breathing': {
      iconSrc = BreathingIconSvg;
      break;
    }
    case 'inr': {
      iconSrc = InrIconSvg;
      break;
    }
    case 'oxygen': {
      iconSrc = ClinicalTestIcon2;
      break;
    }
    case 'exercises': {
      iconSrc = ExercisesIconSvg;
      break;
    }
    case 'heartrate': {
      iconSrc = ClinicalTestIcon4;
      break;
    }
    case 'others': {
      iconSrc = ClinicalTestIcon5;
      break;
    }
    default:
      break;
  }
  return <Avatar alt="" src={iconSrc} className={classes.iconTest} />;
}

export default IconTestComponent;

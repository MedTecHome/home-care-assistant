import React from 'react';
import clsx from 'clsx';
import { makeStyles, Avatar } from '@material-ui/core';
import OxygenIconSvg from '../../images/svg/oxygen.svg';
import PressureIconSvg from '../../images/svg/pressure.svg';
import WeightIconSvg from '../../images/svg/weight.svg';
import HeartrateIconSvg from '../../images/svg/heartrate.svg';
import OthersIconSvg from '../../images/svg/others.svg';
import BreathingIconSvg from '../../images/svg/breathing.svg';
import ExercisesIconSvg from '../../images/svg/exercises.svg';
import TemperatureIconSvg from '../../images/svg/temperature.svg';
import GlucoseIconSvg from '../../images/svg/glucose.svg';
import InrIconSvg from '../../images/svg/inr.svg';
import DefaultIconSvg from '../../images/svg/recently.svg';

const useStyles = makeStyles({
  iconTest: {
    width: 64,
    height: 64
  }
});

function IconTestComponent({ type, className = {} }) {
  const classes = useStyles();
  let iconSrc = DefaultIconSvg;
  switch (type) {
    case 'pressure': {
      iconSrc = PressureIconSvg;
      break;
    }
    case 'temperature': {
      iconSrc = TemperatureIconSvg;
      break;
    }
    case 'weight': {
      iconSrc = WeightIconSvg;
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
      iconSrc = OxygenIconSvg;
      break;
    }
    case 'exercises': {
      iconSrc = ExercisesIconSvg;
      break;
    }
    case 'heartrate': {
      iconSrc = HeartrateIconSvg;
      break;
    }
    case 'otherstest': {
      iconSrc = OthersIconSvg;
      break;
    }
    default:
      break;
  }
  return <Avatar alt="" src={iconSrc} className={clsx(classes.iconTest, className)} />;
}

export default IconTestComponent;

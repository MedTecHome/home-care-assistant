import { isEmpty } from 'ramda';
import { dbRef } from '../../../firebaseConfig';
import {
  breathingMutate,
  glucoseMutate,
  inrMutate,
  pressureMutate,
  pulseMutate,
  tempratureMutate,
  weightMutate,
} from './mutations';

export const PessureRef = dbRef('health').collection('pressure');
export const TemperatureRef = dbRef('health').collection('temperature');
export const WeightRef = dbRef('health').collection('weight');
export const GlucoseRef = dbRef('health').collection('glucose');
export const BreathingRef = dbRef('health').collection('breathing');
export const INRRef = dbRef('health').collection('inr');
export const PulseRef = dbRef('health').collection('pulse');

export const saveHealthDataAction = async values => {
  try {
    if (!isEmpty(pressureMutate(values))) {
      await PessureRef.add(pressureMutate(values));
    }
    if (!isEmpty(tempratureMutate(values))) {
      await TemperatureRef.add(tempratureMutate(values));
    }
    if (!isEmpty(weightMutate(values))) {
      await WeightRef.add(weightMutate(values));
    }
    if (!isEmpty(glucoseMutate(values))) {
      await GlucoseRef.add(glucoseMutate(values));
    }
    if (!isEmpty(breathingMutate(values))) {
      await BreathingRef.add(breathingMutate(values));
    }
    if (!isEmpty(inrMutate(values))) {
      await INRRef.add(inrMutate(values));
    }
    if (!isEmpty(pulseMutate(values))) {
      await PulseRef.add(pulseMutate(values));
    }
  } catch (e) {
    // handle the error
    console.error(e);
  }
};

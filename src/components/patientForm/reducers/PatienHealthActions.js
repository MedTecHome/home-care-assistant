import { dbRef } from '../../../firebaseConfig';

export const PessureRef = dbRef('health').collection('pressure');
export const TemperatureRef = dbRef('health').collection('temperature');
export const WeightRef = dbRef('health').collection('weight');
export const GlucoseRef = dbRef('health').collection('glucose');
export const BreathingRef = dbRef('health').collection('breathing');
export const INRRef = dbRef('health').collection('inr');
export const PulseRef = dbRef('health').collection('pulse');

const pressureMutate = ({}) => ({});
const tempratureMutate = ({}) => ({});
const weightMutate = ({}) => ({});
const glucoseMutate = ({}) => ({});
const breathingMutate = ({}) => ({});
const inrMutate = ({}) => ({});
const pulseMutate = ({}) => ({});

export const saveHealthDataAction = async values => {
  console.log(values);
  /*  try {
    await PessureRef.add(pressureMutate(values));
    await TemperatureRef.add(tempratureMutate(values));
    await WeightRef.add(weightMutate(values));
    await GlucoseRef.add(glucoseMutate(values));
    await BreathingRef.add(breathingMutate(values));
    await INRRef.add(inrMutate(values));
    await PulseRef.add(pulseMutate(values));
  } catch (e) {
    // handle the error
  } */
};

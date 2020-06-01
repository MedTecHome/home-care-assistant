import { dbRef } from '../../../firebaseConfig';
import {
  breathingModel,
  exercicesModel,
  glucoseModel,
  inrModel,
  oxygenModel,
  pressureModel,
  heartrateModel,
  tempratureModel,
  weightModel,
  othersModel
} from './models';

const PressureRef = dbRef('health').collection('pressure');
const HeartrateRef = dbRef('health').collection('heartrate');
const TemperatureRef = dbRef('health').collection('temperature');
const WeightRef = dbRef('health').collection('weight');
const GlucoseRef = dbRef('health').collection('glucose');
const BreathingRef = dbRef('health').collection('breathing');
const INRRef = dbRef('health').collection('inr');
const OxygenRef = dbRef('health').collection('oxygen');
const ExericesRef = dbRef('health').collection('exercises');
const OthersRef = dbRef('health').collection('others');

const saveHealthDataAction = async ({ forms, ...values }) => {
  if (forms.includes('pressure')) {
    await PressureRef.add(pressureModel(values));
  }
  if (forms.includes('heartrate')) {
    await HeartrateRef.add(heartrateModel(values));
  }
  if (forms.includes('temperature')) {
    await TemperatureRef.add(tempratureModel(values));
  }
  if (forms.includes('weight')) {
    await WeightRef.add(weightModel(values));
  }
  if (forms.includes('glucose')) {
    const result = await glucoseModel(values);
    await GlucoseRef.add(result);
  }
  if (forms.includes('breathing')) {
    await BreathingRef.add(breathingModel(values));
  }
  if (forms.includes('inr')) {
    await INRRef.add(inrModel(values));
  }
  if (forms.includes('oxygen')) {
    await OxygenRef.add(oxygenModel(values));
  }
  if (forms.includes('exercises')) {
    await ExericesRef.add(exercicesModel(values));
  }
  if (forms.includes('others')) {
    await OthersRef.add(othersModel(values));
  }
};

export default saveHealthDataAction;

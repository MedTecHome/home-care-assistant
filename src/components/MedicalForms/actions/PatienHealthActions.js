import { dbFirebase } from '../../../firebaseConfig';
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

const PressureRef = dbFirebase.collection('pressure');
const HeartrateRef = dbFirebase.collection('heartrate');
const TemperatureRef = dbFirebase.collection('temperature');
const WeightRef = dbFirebase.collection('weight');
const GlucoseRef = dbFirebase.collection('glucose');
const BreathingRef = dbFirebase.collection('breathing');
const INRRef = dbFirebase.collection('inr');
const OxygenRef = dbFirebase.collection('oxygen');
const ExericesRef = dbFirebase.collection('exercises');
const OthersRef = dbFirebase.collection('others');

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
  if (forms.includes('otherstest')) {
    await OthersRef.add(othersModel(values));
  }
};

export default saveHealthDataAction;

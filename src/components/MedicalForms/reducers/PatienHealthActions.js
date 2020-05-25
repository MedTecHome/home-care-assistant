import { dbRef } from '../../../firebaseConfig';
import {
  breathingModel,
  exercicesModel,
  glucoseModel,
  inrModel,
  oxygenModel,
  pressureModel,
  tempratureModel,
  weightModel
} from './models';
import { getNomenclatorByIdActions } from '../../../Nomenclators/NomenclatorsAction';
import { getListOfData } from '../../../commons/actions/GlobalActions';

const PressureRef = dbRef('health').collection('pressure');
const TemperatureRef = dbRef('health').collection('temperature');
const WeightRef = dbRef('health').collection('weight');
const GlucoseRef = dbRef('health').collection('glucose');
const BreathingRef = dbRef('health').collection('breathing');
const INRRef = dbRef('health').collection('inr');
const OxygenRef = dbRef('health').collection('oxygen');
const ExericesRef = dbRef('health').collection('exercises');

export const saveHealthDataAction = async ({ forms, ...values }) => {
  if (forms.includes('pressure')) {
    await PressureRef.add(pressureModel(values));
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
};

export const getBloodPressureAction = async params => {
  const type = await getNomenclatorByIdActions('medicalforms', 'pressure');
  const data = await getListOfData(PressureRef, params);
  return data.map(el => ({ ...el, type }));
};

export const getTemperatureAction = async params => {
  const type = await getNomenclatorByIdActions('medicalforms', 'temperature');
  const data = await getListOfData(TemperatureRef, params);
  return data.map(el => ({ ...el, type }));
};

export const getWeightAction = async params => {
  const type = await getNomenclatorByIdActions('medicalforms', 'weight');
  const data = await getListOfData(WeightRef, params);
  return data.map(el => ({ ...el, type }));
};

export const getGlucoseAction = async params => {
  const type = await getNomenclatorByIdActions('medicalforms', 'glucose');
  const data = await getListOfData(GlucoseRef, params);
  return data.map(el => ({ ...el, type }));
};

export const getBreathingAction = async params => {
  const type = await getNomenclatorByIdActions('medicalforms', 'breathing');
  const data = await getListOfData(BreathingRef, params);
  return data.map(el => ({ ...el, type }));
};
export const getINRAction = async params => {
  const type = await getNomenclatorByIdActions('medicalforms', 'inr');
  const data = await getListOfData(INRRef, params);
  return data.map(el => ({ ...el, type }));
};

export const getOxygenAction = async params => {
  const type = await getNomenclatorByIdActions('medicalforms', 'oxygen');
  const data = await getListOfData(OxygenRef, params);
  return data.map(el => ({ ...el, type }));
};

export const getExercisesAction = async params => {
  const type = await getNomenclatorByIdActions('medicalforms', 'exercises');
  const data = await getListOfData(ExericesRef, params);
  return data.map(el => ({ ...el, type }));
};

const isPressureOrAll = type => type === 'all' || type === 'pressure';
const isTemperatureOrAll = type => type === 'all' || type === 'temperature';
const isWeightOrAll = type => type === 'all' || type === 'weight';
const isGlucoseOrAll = type => type === 'all' || type === 'glucose';
const isBreathingOrAll = type => type === 'all' || type === 'breathing';
const isINROrAll = type => type === 'all' || type === 'inr';
const isOxygenOrAll = type => type === 'all' || type === 'oxygen';
const isExercisesOrAll = type => type === 'all' || type === 'exercises';

export const getAllPatientHistoryAction = async ({ limit, filters }) => {
  const { type, ...rest } = filters;
  const params = { ...rest, limit: type === 'all' ? limit || 1 : limit || 1000 };
  const promises = [];
  if (isPressureOrAll(type)) {
    promises.push(await getBloodPressureAction(params));
  }
  if (isTemperatureOrAll(type)) {
    promises.push(await getTemperatureAction(params));
  }
  if (isWeightOrAll(type)) {
    promises.push(await getWeightAction(params));
  }
  if (isGlucoseOrAll(type)) {
    promises.push(await getGlucoseAction(params));
  }
  if (isBreathingOrAll(type)) {
    promises.push(await getBreathingAction(params));
  }
  if (isINROrAll(type)) {
    promises.push(await getINRAction(params));
  }
  if (isOxygenOrAll(type)) {
    promises.push(await getOxygenAction(params));
  }
  if (isExercisesOrAll(type)) {
    promises.push(await getExercisesAction(params));
  }
  const result = await Promise.all(promises);
  return result.reduce((previousValue, currentValue) => {
    return [...previousValue, ...currentValue];
  }, []);
};

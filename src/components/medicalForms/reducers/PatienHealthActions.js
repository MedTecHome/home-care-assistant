import { isEmpty } from 'ramda';
import { dbRef } from '../../../firebaseConfig';
import {
  breathingMutate,
  exercicesMutate,
  glucoseMutate,
  inrMutate,
  pressureMutate,
  oxygenMutate,
  tempratureMutate,
  weightMutate,
} from './mutations';
import { getMedicalFormById } from '../../../nomenc/NomMedicalHealth';

export const PessureRef = dbRef('health').collection('pressure');
export const TemperatureRef = dbRef('health').collection('temperature');
export const WeightRef = dbRef('health').collection('weight');
export const GlucoseRef = dbRef('health').collection('glucose');
export const BreathingRef = dbRef('health').collection('breathing');
export const INRRef = dbRef('health').collection('inr');
export const OxygenRef = dbRef('health').collection('oxygen');
export const ExericesRef = dbRef('health').collection('exercises');

export const saveHealthDataAction = async ({ user, ...values }) => {
  if (!isEmpty(pressureMutate(values))) {
    await PessureRef.add({
      ...pressureMutate(values),
      user,
    });
  }
  if (!isEmpty(tempratureMutate(values))) {
    await TemperatureRef.add({
      ...tempratureMutate(values),
      user,
    });
  }
  if (!isEmpty(weightMutate(values))) {
    await WeightRef.add({
      ...weightMutate(values),
      user,
    });
  }
  if (!isEmpty(glucoseMutate(values))) {
    await GlucoseRef.add({
      ...glucoseMutate(values),
      user,
    });
  }
  if (!isEmpty(breathingMutate(values))) {
    await BreathingRef.add({ ...breathingMutate(values), user });
  }
  if (!isEmpty(inrMutate(values))) {
    await INRRef.add({ ...inrMutate(values), user });
  }
  if (!isEmpty(oxygenMutate(values))) {
    await OxygenRef.add({ ...oxygenMutate(values), user });
  }
  if (!isEmpty(exercicesMutate(values))) {
    await ExericesRef.add({ ...exercicesMutate(values), user });
  }
};

export const getBloodPressureAction = async ({ limit = 1, ...params }) => {
  let ref = PessureRef;
  Object.keys(params).map(k => {
    ref = ref.where(k, '==', params[k]);
    return null;
  });
  const type = await getMedicalFormById('pressure');
  return (await ref.limit(limit).get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data(), type }));
};

export const getTemperatureAction = async ({ limit = 1, ...params }) => {
  let ref = TemperatureRef;
  Object.keys(params).map(k => {
    ref = ref.where(k, '==', params[k]);
    return null;
  });
  const type = await getMedicalFormById('temperature');
  return (await ref.limit(limit).get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data(), type }));
};

export const getWeightAction = async ({ limit = 1, ...params }) => {
  let ref = WeightRef;
  Object.keys(params).map(k => {
    ref = ref.where(k, '==', params[k]);
    return null;
  });
  const type = await getMedicalFormById('weight');
  return (await ref.limit(limit).get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data(), type }));
};

export const getGlucoseAction = async ({ limit = 1, ...params }) => {
  let ref = GlucoseRef;
  Object.keys(params).map(k => {
    ref = ref.where(k, '==', params[k]);
    return null;
  });
  const type = await getMedicalFormById('glucose');
  return (await ref.limit(limit).get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data(), type }));
};

export const getBreathingAction = async ({ limit = 1, ...params }) => {
  let ref = BreathingRef;
  Object.keys(params).map(k => {
    ref = ref.where(k, '==', params[k]);
    return null;
  });
  const type = await getMedicalFormById('breathing');
  return (await ref.limit(limit).get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data(), type }));
};
export const getINRAction = async ({ limit = 1, ...params }) => {
  let ref = INRRef;
  Object.keys(params).map(k => {
    ref = ref.where(k, '==', params[k]);
    return null;
  });
  const type = await getMedicalFormById('inr');
  return (await ref.limit(limit).get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data(), type }));
};

export const getOxygenAction = async ({ limit = 1, ...params }) => {
  let ref = OxygenRef;
  Object.keys(params).map(k => {
    ref = ref.where(k, '==', params[k]);
    return null;
  });
  const type = await getMedicalFormById('oxygen');
  return (await ref.limit(limit).get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data(), type }));
};

export const getExercisesAction = async ({ limit = 1, ...params }) => {
  let ref = ExericesRef;
  Object.keys(params).map(k => {
    ref = ref.where(k, '==', params[k]);
    return null;
  });
  const type = await getMedicalFormById('exercises');
  return (await ref.limit(limit).get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data(), type }));
};

const isPressureOrAll = type => type === 'all' || type === 'pressure';
const isTemperatureOrAll = type => type === 'all' || type === 'temperature';
const isWeightOrAll = type => type === 'all' || type === 'weight';
const isGlucoseOrAll = type => type === 'all' || type === 'glucose';
const isBreathingOrAll = type => type === 'all' || type === 'breathing';
const isINROrAll = type => type === 'all' || type === 'inr';
const isOxygenOrAll = type => type === 'all' || type === 'oxygen';
const isExercisesOrAll = type => type === 'all' || type === 'exercises';

export const getAllPatientHistoryAction = async ({ filters }) => {
  const { type, ...rest } = filters;
  const params = { ...rest, limit: type === 'all' ? 1 : 1000 };
  const promises = [];
  if (isPressureOrAll(type)) {
    promises.push(getBloodPressureAction(params));
  }
  if (isTemperatureOrAll(type)) {
    promises.push(getTemperatureAction(params));
  }
  if (isWeightOrAll(type)) {
    promises.push(getWeightAction(params));
  }
  if (isGlucoseOrAll(type)) {
    promises.push(getGlucoseAction(params));
  }
  if (isBreathingOrAll(type)) {
    promises.push(getBreathingAction(params));
  }
  if (isINROrAll(type)) {
    promises.push(getINRAction(params));
  }
  if (isOxygenOrAll(type)) {
    promises.push(getOxygenAction(params));
  }
  if (isExercisesOrAll(type)) {
    promises.push(getExercisesAction(params));
  }
  const result = await Promise.all(promises);
  return result.reduce((previousValue, currentValue) => {
    return [...previousValue, ...currentValue];
  }, []);
};

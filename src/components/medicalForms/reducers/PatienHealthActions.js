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
  return (await ref.limit(limit).get())
    .docChanges()
    .map(({ doc }) => ({ id: doc.id, ...doc.data(), type: 'pressure' }));
};

export const getTemperatureAction = async ({ limit = 1, ...params }) => {
  let ref = TemperatureRef;
  Object.keys(params).map(k => {
    ref = ref.where(k, '==', params[k]);
    return null;
  });
  return (await ref.limit(limit).get())
    .docChanges()
    .map(({ doc }) => ({ id: doc.id, ...doc.data(), type: 'temperature' }));
};

export const getWeightAction = async ({ limit = 1, ...params }) => {
  let ref = WeightRef;
  Object.keys(params).map(k => {
    ref = ref.where(k, '==', params[k]);
    return null;
  });
  return (await ref.limit(limit).get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data(), type: 'weight' }));
};

export const getGlucoseAction = async ({ limit = 1, ...params }) => {
  let ref = GlucoseRef;
  Object.keys(params).map(k => {
    ref = ref.where(k, '==', params[k]);
    return null;
  });
  return (await ref.limit(limit).get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data(), type: 'glucose' }));
};

export const getBreathingAction = async ({ limit = 1, ...params }) => {
  let ref = BreathingRef;
  Object.keys(params).map(k => {
    ref = ref.where(k, '==', params[k]);
    return null;
  });
  return (await ref.limit(limit).get())
    .docChanges()
    .map(({ doc }) => ({ id: doc.id, ...doc.data(), type: 'breathing' }));
};
export const getINRAction = async ({ limit = 1, ...params }) => {
  let ref = INRRef;
  Object.keys(params).map(k => {
    ref = ref.where(k, '==', params[k]);
    return null;
  });
  return (await ref.limit(limit).get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data(), type: 'inr' }));
};

export const getOxygenAction = async ({ limit = 1, ...params }) => {
  let ref = OxygenRef;
  Object.keys(params).map(k => {
    ref = ref.where(k, '==', params[k]);
    return null;
  });
  return (await ref.limit(limit).get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data(), type: 'oxygen' }));
};

export const getExercisesAction = async ({ limit = 1, ...params }) => {
  let ref = ExericesRef;
  Object.keys(params).map(k => {
    ref = ref.where(k, '==', params[k]);
    return null;
  });
  return (await ref.limit(limit).get())
    .docChanges()
    .map(({ doc }) => ({ id: doc.id, ...doc.data(), type: 'exercises' }));
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

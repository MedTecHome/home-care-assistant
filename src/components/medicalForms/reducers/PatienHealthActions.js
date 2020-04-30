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
  if (!isEmpty(pulseMutate(values))) {
    await PulseRef.add({ ...pulseMutate(values), user });
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

export const getPulseAction = async ({ limit = 1, ...params }) => {
  let ref = PulseRef;
  Object.keys(params).map(k => {
    ref = ref.where(k, '==', params[k]);
    return null;
  });
  return (await ref.limit(limit).get())
    .docChanges()
    .map(({ doc }) => ({ id: doc.id, ...doc.data(), type: 'heartbeat' }));
};

export const getAllPatientHistoryAction = async ({ filters }) => {
  const { type, ...rest } = filters;
  const params = { ...rest, limit: type === 'all' ? 1 : 1000 };
  try {
    let result = [];
    if ((filters && type === 'all') || type === 'pressure') {
      const pressures = await getBloodPressureAction(params);
      result = [...result, ...pressures];
    }
    if ((filters && type === 'all') || type === 'temperature') {
      const temperature = await getTemperatureAction(params);
      result = [...result, ...temperature];
    }
    if ((filters && type === 'all') || type === 'weight') {
      const weight = await getWeightAction(params);
      result = [...result, ...weight];
    }
    if ((filters && type === 'all') || type === 'glucose') {
      const glucose = await getGlucoseAction(params);
      result = [...result, ...glucose];
    }
    if ((filters && type === 'all') || type === 'breathing') {
      const breathing = await getBreathingAction(params);
      result = [...result, ...breathing];
    }
    if ((filters && type === 'all') || type === 'inr') {
      const inr = await getINRAction(params);
      result = [...result, ...inr];
    }
    if ((filters && type === 'all') || type === 'pulse') {
      const pulse = await getPulseAction(params);
      result = [...result, ...pulse];
    }
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

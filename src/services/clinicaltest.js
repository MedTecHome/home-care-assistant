import { retriveData } from './utils';
import { testFormsNames } from '../helpers/constants';

const getPressure = async (limit, offset, filters) => {
  try {
    const type = testFormsNames.find(tf => tf.id === 'pressure');
    const result = await retriveData(
      'pressure',
      limit,
      offset,
      filters,
      filters.clinicalDate ? undefined : 'clinicalDate',
      filters.clinicalDate ? undefined : 'desc'
    );
    return { ...result, data: result.data.map(item => ({ ...item, type })) };
  } catch (e) {
    throw new Error(e);
  }
};

const getHeartrate = async (limit, offset, filters) => {
  try {
    const type = testFormsNames.find(tf => tf.id === 'heartrate');
    const result = await retriveData(
      'heartrate',
      limit,
      offset,
      filters,
      filters.clinicalDate ? undefined : 'clinicalDate',
      filters.clinicalDate ? undefined : 'desc'
    );
    return { ...result, data: result.data.map(item => ({ ...item, type })) };
  } catch (e) {
    throw new Error(e);
  }
};

const getTemperature = async (limit, offset, filters) => {
  try {
    const type = testFormsNames.find(tf => tf.id === 'temperature');
    const result = await retriveData(
      'temperature',
      limit,
      offset,
      filters,
      filters.clinicalDate ? undefined : 'clinicalDate',
      filters.clinicalDate ? undefined : 'desc'
    );
    return { ...result, data: result.data.map(item => ({ ...item, type })) };
  } catch (e) {
    throw new Error(e);
  }
};
const getWeight = async (limit, offset, filters) => {
  try {
    const type = testFormsNames.find(tf => tf.id === 'weight');
    const result = await retriveData(
      'weight',
      limit,
      offset,
      filters,
      filters.clinicalDate ? undefined : 'clinicalDate',
      filters.clinicalDate ? undefined : 'desc'
    );
    return { ...result, data: result.data.map(item => ({ ...item, type })) };
  } catch (e) {
    throw new Error(e);
  }
};
const getGlucose = async (limit, offset, filters) => {
  try {
    const type = testFormsNames.find(tf => tf.id === 'glucose');
    const result = await retriveData(
      'glucose',
      limit,
      offset,
      filters,
      filters.clinicalDate ? undefined : 'clinicalDate',
      filters.clinicalDate ? undefined : 'desc'
    );
    return { ...result, data: result.data.map(item => ({ ...item, type })) };
  } catch (e) {
    throw new Error(e);
  }
};

const getBreathing = async (limit, offset, filters) => {
  try {
    const type = testFormsNames.find(tf => tf.id === 'breathing');
    const result = await retriveData(
      'breathing',
      limit,
      offset,
      filters,
      filters.clinicalDate ? undefined : 'clinicalDate',
      filters.clinicalDate ? undefined : 'desc'
    );
    return { ...result, data: result.data.map(item => ({ ...item, type })) };
  } catch (e) {
    throw new Error(e);
  }
};

const getOxygen = async (limit, offset, filters) => {
  try {
    const type = testFormsNames.find(tf => tf.id === 'oxygen');
    const result = await retriveData(
      'oxygen',
      limit,
      offset,
      filters,
      filters.clinicalDate ? undefined : 'clinicalDate',
      filters.clinicalDate ? undefined : 'desc'
    );
    return { ...result, data: result.data.map(item => ({ ...item, type })) };
  } catch (e) {
    throw new Error(e);
  }
};

const getExercises = async (limit, offset, filters) => {
  try {
    const type = testFormsNames.find(tf => tf.id === 'exercises');
    const result = await retriveData(
      'exercises',
      limit,
      offset,
      filters,
      filters.clinicalDate ? undefined : 'clinicalDate',
      filters.clinicalDate ? undefined : 'desc'
    );
    return { ...result, data: result.data.map(item => ({ ...item, type })) };
  } catch (e) {
    throw new Error(e);
  }
};

const getINR = async (limit, offset, filters) => {
  try {
    const type = testFormsNames.find(tf => tf.id === 'inr');
    const result = await retriveData(
      'inr',
      limit,
      offset,
      filters,
      filters.clinicalDate ? undefined : 'clinicalDate',
      filters.clinicalDate ? undefined : 'desc'
    );
    return { ...result, data: result.data.map(item => ({ ...item, type })) };
  } catch (e) {
    throw new Error(e);
  }
};

const getOthers = async (limit, offset, filters) => {
  try {
    const type = testFormsNames.find(tf => tf.id === 'others');
    const result = await retriveData(
      'others',
      limit,
      offset,
      filters,
      filters.clinicalDate ? undefined : 'clinicalDate',
      filters.clinicalDate ? undefined : 'desc'
    );
    return { ...result, data: result.data.map(item => ({ ...item, type })) };
  } catch (e) {
    throw new Error(e);
  }
};

const getClinicalTests = async (limit, offset, params) => {
  const { user, ...filters } = params;
  try {
    const pressure = await getPressure(1, 0, { user: user || 'none', ...filters });
    const heartrate = await getHeartrate(1, 0, { user: user || 'none', ...filters });
    const temperature = await getTemperature(1, 0, { user: user || 'none', ...filters });
    const weight = await getWeight(1, 0, { user: user || 'none', ...filters });
    const glucose = await getGlucose(1, 0, { user: user || 'none', ...filters });
    const breathing = await getBreathing(1, 0, { user: user || 'none', ...filters });
    const inr = await getINR(1, 0, { user: user || 'none', ...filters });
    const oxygen = await getOxygen(1, 0, { user: user || 'none', ...filters });
    const exercises = await getExercises(1, 0, { user: user || 'none', ...filters });
    const others = await getOthers(1, 0, { user: user || 'none', ...filters });

    return {
      total:
        pressure.data.length +
        heartrate.data.length +
        temperature.data.length +
        breathing.data.length +
        weight.data.length +
        glucose.data.length +
        inr.data.length +
        oxygen.data.length +
        exercises.data.length +
        others.data.length,
      data: [
        ...pressure.data,
        ...heartrate.data,
        ...temperature.data,
        ...breathing.data,
        ...weight.data,
        ...glucose.data,
        ...inr.data,
        ...oxygen.data,
        ...exercises.data,
        ...others.data
      ]
    };
  } catch (e) {
    throw new Error(e);
  }
};

export {
  getPressure,
  getHeartrate,
  getTemperature,
  getWeight,
  getGlucose,
  getBreathing,
  getINR,
  getOxygen,
  getExercises,
  getOthers,
  getClinicalTests
};

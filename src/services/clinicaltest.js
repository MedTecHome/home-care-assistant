import { retriveData } from './utils';
import getNomenclator from './nomenclators';

const getPressure = async (limit, offset, filters) => {
  try {
    const type = await getNomenclator('medicalforms', 'pressure');
    const result = await retriveData(
      'health/pressure',
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
    const type = await getNomenclator('medicalforms', 'temperature');
    const result = await retriveData(
      'health/temperature',
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
    const type = await getNomenclator('medicalforms', 'weight');
    const result = await retriveData(
      'health/weight',
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
    const type = await getNomenclator('medicalforms', 'glucose');
    const result = await retriveData(
      'health/glucose',
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
    const type = await getNomenclator('medicalforms', 'breathing');
    const result = await retriveData(
      'health/breathing',
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
    const type = await getNomenclator('medicalforms', 'oxygen');
    const result = await retriveData(
      'health/oxygen',
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
    const type = await getNomenclator('medicalforms', 'exercises');
    const result = await retriveData(
      'health/exercises',
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
    const type = await getNomenclator('medicalforms', 'inr');
    const result = await retriveData(
      'health/inr',
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

const getClinicalTests = async (limit, offset, filters) => {
  try {
    const pressure = await getPressure(1, 0, filters);
    const temperature = await getTemperature(1, 0, filters);
    const weight = await getWeight(1, 0, filters);
    const glucose = await getGlucose(1, 0, filters);
    const breathing = await getBreathing(1, 0, filters);
    const inr = await getINR(1, 0, filters);
    const oxygen = await getOxygen(1, 0, filters);
    const exercises = await getExercises(1, 0, filters);

    return {
      total:
        pressure.data.length +
        temperature.data.length +
        breathing.data.length +
        weight.data.length +
        glucose.data.length +
        inr.data.length +
        oxygen.data.length +
        exercises.data.length,
      data: [
        ...pressure.data,
        ...temperature.data,
        ...breathing.data,
        ...weight.data,
        ...glucose.data,
        ...inr.data,
        ...oxygen.data,
        ...exercises.data
      ]
    };
  } catch (e) {
    throw new Error(e);
  }
};

export {
  getPressure,
  getTemperature,
  getWeight,
  getGlucose,
  getBreathing,
  getINR,
  getOxygen,
  getExercises,
  getClinicalTests
};

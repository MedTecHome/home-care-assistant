import { dbRef } from '../../../firebaseConfig';
import { apiData } from '../../../axiosApiRequest';
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
import { queryFromParams } from '../../../helpers/utils';

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

export const getAllPatientHistoryAction = async ({ limit, offset, filters }) => {
  const { type, ...rest } = filters;
  const params = { limit, offset, type, ...rest };
  const query = queryFromParams(params);
  const response = await apiData.get(`/getClinicalTests${query && `?${query}`}`);

  return response.data;
};

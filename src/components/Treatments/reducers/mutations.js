import { formatMomentToDate } from '../../../helpers/utils';
import { getProfileByIdAction } from '../../Profiles/reducers/ProfileActions';
import { getMedicineByIdAction } from '../../Medicines/reducers/MedicinesActions';

const mutateTreatmentValues = async ({ name, patient, medicine, startDate, endDate }) => ({
  name,
  ...(patient ? { patient: await getProfileByIdAction(patient, ['fullname']) } : {}),
  ...(medicine ? { medicine: await getMedicineByIdAction(medicine, ['name']) } : {}),
  ...(startDate ? { startDate: formatMomentToDate(startDate) } : {}),
  ...(endDate ? { endDate: formatMomentToDate(endDate) } : {})
});

export default mutateTreatmentValues;

import { formatMomentToDate } from '../../../helpers/utils';
import { getProfileByIdAction } from '../../profiles/reducers/ProfileActions';
import { getMedicineByIdAction } from '../../medicines/reducers/MedicinesActions';

const mutateTreatmentValues = async ({ patient, medicine, startDate, endDate }) => ({
  ...(patient ? { patient: await getProfileByIdAction(patient, ['fullname']) } : {}),
  ...(medicine ? { medicine: await getMedicineByIdAction(medicine, ['name']) } : {}),
  ...(startDate ? { startDate: formatMomentToDate(startDate) } : {}),
  ...(endDate ? { endDate: formatMomentToDate(endDate) } : {})
});

export default mutateTreatmentValues;

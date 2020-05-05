import { formatMomentToDate, returnIfExiste } from '../../../commons/util';
import { getProfileByIdAction } from '../../profiles/reducers/ProfileActions';
import { getMedicineByIdAction } from '../../medicines/reducers/MedicinesActions';

const mutateTreatmentValues = async ({ patient, medicine, startDate, endDate }) => ({
  ...returnIfExiste({ patient: await getProfileByIdAction(patient, ['fullname']) }),
  ...returnIfExiste({ medicine: await getMedicineByIdAction(medicine, ['name']) }),
  ...returnIfExiste({ startDate: formatMomentToDate(startDate) }),
  ...returnIfExiste({ endDate: formatMomentToDate(endDate) }),
});

export default mutateTreatmentValues;

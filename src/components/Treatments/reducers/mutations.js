import { formatMomentToDate } from '../../../helpers/utils';
import { getProfileByIdAction } from '../../Profiles/reducers/ProfileActions';
import { mutateNomenc } from '../../Medicines/reducers/MedicinesActions';

const parseStringJsonMedicines = async string => {
  const medicines = JSON.parse(string);
  return Promise.all(
    await medicines.medicines.map(async medic => {
      const nomenc = await mutateNomenc(medic);
      return { ...medic, ...nomenc };
    })
  );
};

const mutateTreatmentValues = async ({ name, patient, medicines, startDate, endDate }) => ({
  name,
  ...(patient ? { patient: await getProfileByIdAction(patient, ['fullname']) } : {}),
  ...(medicines ? { medicines: await parseStringJsonMedicines(medicines) } : {}),
  ...(startDate ? { startDate: formatMomentToDate(startDate) } : {}),
  ...(endDate ? { endDate: formatMomentToDate(endDate) } : {})
});

export default mutateTreatmentValues;

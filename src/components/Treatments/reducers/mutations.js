import moment from 'moment';
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

const mutateTreatmentValues = async ({ name, user, medicines, startDate, endDate }) => ({
  name,
  ...(user ? { user: await getProfileByIdAction(user, ['fullname']) } : {}),
  ...(medicines ? { medicines: await parseStringJsonMedicines(medicines) } : {}),
  ...(startDate ? { startDate: moment(startDate).unix() } : {}),
  ...(endDate ? { endDate: moment(endDate).unix() } : {})
});

export default mutateTreatmentValues;

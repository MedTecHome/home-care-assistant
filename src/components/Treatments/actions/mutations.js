import moment from 'moment';

const mutateTreatmentValues = async ({ name, user, medicines, medicineSetting, startDate, endDate }) => ({
  name,
  medicines,
  medicineSetting,
  user,
  ...(startDate ? { startDate: moment(startDate).unix() } : {}),
  ...(endDate ? { endDate: moment(endDate).unix() } : {})
});

export default mutateTreatmentValues;

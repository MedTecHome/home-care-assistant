import moment from 'moment';

const mutateTreatmentValues = async ({ user, medicines, medicineSetting, startDate, endDate }) => ({
  medicines,
  medicineSetting,
  user,
  ...(startDate ? { startDate: moment(startDate).unix() } : {}),
  ...(endDate ? { endDate: moment(endDate).unix() } : {})
});

export default mutateTreatmentValues;

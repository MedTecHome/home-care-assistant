import moment from 'moment';

const formatDate = (date, time) => {
  const m1 = moment(time).format('hh:mm:ss a');
  const m2 = moment(date, 'DD/MM/YYYY').format('YYYY/MM/DD');
  return moment(`${m2} ${m1}`, 'YYYY/MM/DD hh:mm:ss a').toDate();
};

export const pressureMutate = ({
  user,
  sistolica,
  diastolica,
  heartrate,
  bloodPressureNota,
  bloodPressureDate,
  bloodPressureTime,
}) => ({
  ...(user ? { user } : {}),
  ...(sistolica ? { sistolica } : {}),
  ...(diastolica ? { diastolica } : {}),
  ...(heartrate ? { heartrate } : {}),
  ...(bloodPressureDate && bloodPressureTime ? { date: formatDate(bloodPressureDate, bloodPressureTime) } : {}),
  ...(bloodPressureNota ? { nota: bloodPressureNota } : {}),
});
export const tempratureMutate = ({ user, celsiusDegree, temperatureNote, temperatureDate, temperatureTime }) => ({
  ...(user ? { user } : {}),
  ...(celsiusDegree ? { celsiusDegree } : {}),
  ...(temperatureDate && temperatureTime ? { date: formatDate(temperatureDate, temperatureTime) } : {}),
  ...(temperatureNote ? { nota: temperatureNote } : {}),
});
export const weightMutate = ({ user, weight, weightDate, weightTime, weightNote }) => ({
  ...(user ? { user } : {}),
  ...(weight ? { weight } : {}),
  ...(weightNote ? { note: weightNote } : {}),
  ...(weightDate && weightTime ? { date: formatDate(weightDate, weightTime) } : {}),
});

export const glucoseMutate = ({ user, sugarConcentration, shedule, glucoseNote, glucoseDate, glucoseTime }) => ({
  ...(user ? { user } : {}),
  ...(sugarConcentration ? { sugarConcentration } : {}),
  ...(shedule ? { shedule } : {}),
  ...(glucoseDate && glucoseTime ? { date: formatDate(glucoseDate, glucoseTime) } : {}),
  ...(glucoseNote ? { nota: glucoseNote } : {}),
});
export const breathingMutate = ({
  user,
  EtCO,
  breathingFrecuency,
  breathingtPI,
  breathingtDate,
  breathingTime,
  breathingNote,
}) => ({
  ...(user ? { user } : {}),
  ...(EtCO ? { EtCO } : {}),
  ...(breathingFrecuency ? { breathingFrecuency } : {}),
  ...(breathingtPI ? { PI: breathingtPI } : {}),
  ...(breathingtDate && breathingTime ? { date: formatDate(breathingtDate, breathingTime) } : {}),
  ...(breathingNote ? { note: breathingNote } : {}),
});
export const inrMutate = ({ user, INR, coagulationInrNota, coagulationInrDate, coagulationInrTime }) => ({
  ...(user ? { user } : {}),
  ...(INR ? { INR } : {}),
  ...(coagulationInrNota ? { nota: coagulationInrNota } : {}),
  ...(coagulationInrDate && coagulationInrTime ? { date: formatDate(coagulationInrDate, coagulationInrTime) } : {}),
});
export const oxygenMutate = ({ user, SpO2, heartbeat, oxygenPI, oxygenDate, oxygenTime, oxygenNote }) => ({
  ...(user ? { user } : {}),
  ...(SpO2 ? { SpO2 } : {}),
  ...(heartbeat ? { heartbeat } : {}),
  ...(oxygenPI ? { PI: oxygenPI } : {}),
  ...(oxygenDate && oxygenTime ? { date: formatDate(oxygenDate, oxygenTime) } : {}),
  ...(oxygenNote ? { note: oxygenNote } : {}),
});

export const exercicesMutate = ({ distance, time, steps, exercisesDate, exercisesTime, exercisesNote }) => ({
  ...(distance ? { distance } : {}),
  ...(time ? { time } : {}),
  ...(steps ? { steps } : {}),
  ...(exercisesDate && exercisesTime ? { date: formatDate(exercisesDate, exercisesTime) } : {}),
  ...(exercisesNote ? { note: exercisesNote } : {}),
});

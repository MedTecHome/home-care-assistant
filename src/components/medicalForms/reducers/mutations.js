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
export const weightMutate = ({ user, weight, weightDate, weightTime }) => ({
  ...(user ? { user } : {}),
  ...(weight ? { weight } : {}),
  ...(weightDate && weightTime ? { date: formatDate(weightDate, weightTime) } : {}),
});
export const glucoseMutate = ({ user, sugarConcentration, shedule, glucoseNote, glucoseDate, glucoseTime }) => ({
  ...(user ? { user } : {}),
  ...(sugarConcentration ? { sugarConcentration } : {}),
  ...(shedule ? { shedule } : {}),
  ...(glucoseDate && glucoseTime ? { date: formatDate(glucoseDate, glucoseTime) } : {}),
  ...(glucoseNote ? { nota: glucoseNote } : {}),
});
export const breathingMutate = ({ user, EtCO, breathingFrecuency, breathingtPI, breathingtDate, breathingTime }) => ({
  ...(user ? { user } : {}),
  ...(EtCO ? { EtCO } : {}),
  ...(breathingFrecuency ? { breathingFrecuency } : {}),
  ...(breathingtPI ? { PI: breathingtPI } : {}),
  ...(breathingtDate && breathingTime ? { date: formatDate(breathingtDate, breathingTime) } : {}),
});
export const inrMutate = ({ user, INR, coagulationInrNota, coagulationInrDate, coagulationInrTime }) => ({
  ...(user ? { user } : {}),
  ...(INR ? { INR } : {}),
  ...(coagulationInrNota ? { nota: coagulationInrNota } : {}),
  ...(coagulationInrDate && coagulationInrTime ? { date: formatDate(coagulationInrDate, coagulationInrTime) } : {}),
});
export const pulseMutate = ({ user, SpO2, heartbeat, heartbeatPI, heartbeatDate, heartbeatTime }) => ({
  ...(user ? { user } : {}),
  ...(SpO2 ? { SpO2 } : {}),
  ...(heartbeat ? { heartbeat } : {}),
  ...(heartbeatPI ? { PI: heartbeatPI } : {}),
  ...(heartbeatDate && heartbeatTime ? { date: formatDate(heartbeatDate, heartbeatTime) } : {}),
});

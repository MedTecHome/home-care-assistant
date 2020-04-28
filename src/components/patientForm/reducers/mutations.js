import moment from 'moment';

const formatDate = value => (moment(value).isValid() ? moment(value).format('YYYY-MM-DD') : '');
const formatTime = value => (moment(value).isValid() ? moment(value).format('hh:ss:mm') : '');

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
  ...(bloodPressureDate ? { date: formatDate(bloodPressureDate) } : {}),
  ...(bloodPressureTime ? { time: formatTime(bloodPressureTime) } : {}),
  ...(bloodPressureNota ? { nota: bloodPressureNota } : {}),
});
export const tempratureMutate = ({ user, celsiusDegree, temperatureNote, temperatureDate, temperatureTime }) => ({
  ...(user ? { user } : {}),
  ...(celsiusDegree ? { celsiusDegree } : {}),
  ...(temperatureDate ? { date: formatDate(temperatureDate) } : {}),
  ...(temperatureTime ? { time: formatTime(temperatureTime) } : {}),
  ...(temperatureNote ? { nota: temperatureNote } : {}),
});
export const weightMutate = ({ user, weight, weightDate, weightTime }) => ({
  ...(user ? { user } : {}),
  ...(weight ? { weight } : {}),
  ...(weightDate ? { date: formatDate(weightDate) } : {}),
  ...(weightTime ? { time: formatTime(weightTime) } : {}),
});
export const glucoseMutate = ({ user, sugarConcentration, shedule, glucoseNote, glucoseDate, glucoseTime }) => ({
  ...(user ? { user } : {}),
  ...(sugarConcentration ? { sugarConcentration } : {}),
  ...(shedule ? { shedule } : {}),
  ...(glucoseDate ? { date: formatDate(glucoseDate) } : {}),
  ...(glucoseTime ? { time: formatTime(glucoseTime) } : {}),
  ...(glucoseNote ? { nota: glucoseNote } : {}),
});
export const breathingMutate = ({ user, EtCO, breathingFrecuency, breathingtPI, breathingtDate, breathingTime }) => ({
  ...(user ? { user } : {}),
  ...(EtCO ? { EtCO } : {}),
  ...(breathingFrecuency ? { breathingFrecuency } : {}),
  ...(breathingtPI ? { PI: breathingtPI } : {}),
  ...(breathingtDate ? { date: formatDate(breathingtDate) } : {}),
  ...(breathingTime ? { time: formatTime(breathingTime) } : {}),
});
export const inrMutate = ({ user, INR, coagulationInrNota, coagulationInrDate, coagulationInrTime }) => ({
  ...(user ? { user } : {}),
  ...(INR ? { INR } : {}),
  ...(coagulationInrNota ? { nota: coagulationInrNota } : {}),
  ...(coagulationInrDate ? { date: formatDate(coagulationInrDate) } : {}),
  ...(coagulationInrTime ? { time: formatTime(coagulationInrTime) } : {}),
});
export const pulseMutate = ({ user, SpO2, heartbeat, heartbeatPI, heartbeatDate, heartbeatTime }) => ({
  ...(user ? { user } : {}),
  ...(SpO2 ? { SpO2 } : {}),
  ...(heartbeat ? { heartbeat } : {}),
  ...(heartbeatPI ? { PI: heartbeatPI } : {}),
  ...(heartbeatDate ? { date: formatDate(heartbeatDate) } : {}),
  ...(heartbeatTime ? { time: formatTime(heartbeatTime) } : {}),
});

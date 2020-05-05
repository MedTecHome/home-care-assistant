import { formatDateWithTime } from '../../../commons/util';

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
  ...(bloodPressureDate && bloodPressureTime ? { date: formatDateWithTime(bloodPressureDate, bloodPressureTime) } : {}),
  ...(bloodPressureNota ? { nota: bloodPressureNota } : {}),
});
export const tempratureMutate = ({ user, celsiusDegree, temperatureNote, temperatureDate, temperatureTime }) => ({
  ...(user ? { user } : {}),
  ...(celsiusDegree ? { celsiusDegree } : {}),
  ...(temperatureDate && temperatureTime ? { date: formatDateWithTime(temperatureDate, temperatureTime) } : {}),
  ...(temperatureNote ? { nota: temperatureNote } : {}),
});
export const weightMutate = ({ user, weight, weightDate, weightTime, weightNote }) => ({
  ...(user ? { user } : {}),
  ...(weight ? { weight } : {}),
  ...(weightNote ? { note: weightNote } : {}),
  ...(weightDate && weightTime ? { date: formatDateWithTime(weightDate, weightTime) } : {}),
});

export const glucoseMutate = ({ user, sugarConcentration, shedule, glucoseNote, glucoseDate, glucoseTime }) => ({
  ...(user ? { user } : {}),
  ...(sugarConcentration ? { sugarConcentration } : {}),
  ...(shedule ? { shedule } : {}),
  ...(glucoseDate && glucoseTime ? { date: formatDateWithTime(glucoseDate, glucoseTime) } : {}),
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
  ...(breathingtDate && breathingTime ? { date: formatDateWithTime(breathingtDate, breathingTime) } : {}),
  ...(breathingNote ? { note: breathingNote } : {}),
});
export const inrMutate = ({ user, INR, coagulationInrNota, coagulationInrDate, coagulationInrTime }) => ({
  ...(user ? { user } : {}),
  ...(INR ? { INR } : {}),
  ...(coagulationInrNota ? { nota: coagulationInrNota } : {}),
  ...(coagulationInrDate && coagulationInrTime
    ? { date: formatDateWithTime(coagulationInrDate, coagulationInrTime) }
    : {}),
});
export const oxygenMutate = ({ user, SpO2, heartbeat, oxygenPI, oxygenDate, oxygenTime, oxygenNote }) => ({
  ...(user ? { user } : {}),
  ...(SpO2 ? { SpO2 } : {}),
  ...(heartbeat ? { heartbeat } : {}),
  ...(oxygenPI ? { PI: oxygenPI } : {}),
  ...(oxygenDate && oxygenTime ? { date: formatDateWithTime(oxygenDate, oxygenTime) } : {}),
  ...(oxygenNote ? { note: oxygenNote } : {}),
});

export const exercicesMutate = ({ distance, time, steps, exercisesDate, exercisesTime, exercisesNote }) => ({
  ...(distance ? { distance } : {}),
  ...(time ? { time } : {}),
  ...(steps ? { steps } : {}),
  ...(exercisesDate && exercisesTime ? { date: formatDateWithTime(exercisesDate, exercisesTime) } : {}),
  ...(exercisesNote ? { note: exercisesNote } : {}),
});

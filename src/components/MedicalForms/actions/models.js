import { formatDateWithTime } from '../../../helpers/utils';

export const pressureModel = ({
  user,
  sistolica,
  diastolica,
  heartrate,
  bloodPressureNota,
  bloodPressureDate,
  bloodPressureTime
}) => ({
  user,
  sistolica,
  diastolica,
  heartrate,
  clinicalDate: formatDateWithTime(bloodPressureDate, bloodPressureTime),
  ...(bloodPressureNota ? { note: bloodPressureNota } : {})
});
export const heartrateModel = ({ user, heartrate, heartrateNota, heartrateDate, heartrateTime }) => ({
  user,
  heartrate,
  clinicalDate: formatDateWithTime(heartrateDate, heartrateTime),
  ...(heartrateNota ? { note: heartrateNota } : {})
});

export const tempratureModel = ({ user, celsiusDegree, temperatureNote, temperatureDate, temperatureTime }) => ({
  user,
  celsiusDegree,
  clinicalDate: formatDateWithTime(temperatureDate, temperatureTime),
  ...(temperatureNote ? { note: temperatureNote } : {})
});

export const weightModel = ({ user, weight, weightDate, weightTime, weightNote }) => ({
  user,
  weight,
  clinicalDate: formatDateWithTime(weightDate, weightTime),
  ...(weightNote ? { note: weightNote } : {})
});

export const glucoseModel = ({
  user,
  sugarConcentration,
  shedule,
  intakeTime,
  glucoseUnity,
  hba1c,
  insulinaFood,
  basal,
  breadUnity,
  glucoseNote,
  glucoseDate,
  glucoseTime
}) => ({
  user,
  sugarConcentration,
  shedule,
  intakeTime,
  glucoseUnity,
  clinicalDate: formatDateWithTime(glucoseDate, glucoseTime),
  ...(hba1c ? { hba1c } : {}),
  ...(insulinaFood ? { insulinaFood } : {}),
  ...(basal ? { basal } : {}),
  ...(breadUnity ? { breadUnity } : {}),
  ...(glucoseNote ? { note: glucoseNote } : {})
});

export const breathingModel = ({
  user,
  EtCO,
  breathingFrecuency,
  breathingPI,
  breathingtDate,
  breathingTime,
  breathingNote
}) => ({
  user,
  EtCO,
  breathingFrecuency,
  breathingPI,
  clinicalDate: formatDateWithTime(breathingtDate, breathingTime),
  ...(breathingNote ? { note: breathingNote } : {})
});

export const inrModel = ({ user, INR, coagulationInrNote, coagulationInrDate, coagulationInrTime }) => ({
  user,
  INR,
  clinicalDate: formatDateWithTime(coagulationInrDate, coagulationInrTime),
  ...(coagulationInrNote ? { note: coagulationInrNote } : {})
});
export const oxygenModel = ({ user, SpO2, heartbeat, oxygenPI, oxygenDate, oxygenTime, oxygenNote }) => ({
  user,
  SpO2,
  heartbeat,
  oxygenPI,
  clinicalDate: formatDateWithTime(oxygenDate, oxygenTime),
  ...(oxygenNote ? { note: oxygenNote } : {})
});

export const exercicesModel = ({ user, distance, time, steps, exercisesDate, exercisesTime, exercisesNote }) => ({
  user,
  distance,
  time,
  steps,
  clinicalDate: formatDateWithTime(exercisesDate, exercisesTime),
  ...(exercisesNote ? { note: exercisesNote } : {})
});

export const othersModel = ({ user, othersName, severity, othersDate, othersTime, othersNote = '' }) => ({
  user,
  othersName,
  severity,
  clinicalDate: formatDateWithTime(othersDate, othersTime),
  note: othersNote
});

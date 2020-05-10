import {
  INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT,
  REGEX_POSITIVE_NUMBER,
  REGEX_POSITIVE_NUMBER_AND_DECIMAL,
  REQUIRED_FIELD
} from '../../commons/globalText';

export const validateDate = value => {
  if (!value) return REQUIRED_FIELD;
  return null;
};

export const validateTime = value => {
  if (!value) return REQUIRED_FIELD;
  return null;
};

export const validateSistolica = value => {
  if (!value) return REQUIRED_FIELD;
  if (value) if (!REGEX_POSITIVE_NUMBER.test(value)) return INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  return null;
};

export const validateDiastolica = value => {
  if (!value) return REQUIRED_FIELD;
  if (value) if (!REGEX_POSITIVE_NUMBER.test(value)) return INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  return null;
};

export const validateHeartrate = value => {
  if (!value) return REQUIRED_FIELD;
  if (value) if (!REGEX_POSITIVE_NUMBER.test(value)) return INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  return null;
};

export const validateCelsiusDegree = value => {
  if (!value) return REQUIRED_FIELD;
  if (value) if (!REGEX_POSITIVE_NUMBER_AND_DECIMAL.test(value)) return INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  return null;
};

export const validateWeight = value => {
  if (!value) return REQUIRED_FIELD;
  if (value) if (!REGEX_POSITIVE_NUMBER_AND_DECIMAL.test(value)) return INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  return null;
};

export const validateSugarConcentration = value => {
  if (!value) return REQUIRED_FIELD;
  if (value) if (!REGEX_POSITIVE_NUMBER.test(value)) return INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  return null;
};

export const validateHorario = value => {
  if (!value) return REQUIRED_FIELD;
  return null;
};

export const validateEtCO = value => {
  if (!value) return REQUIRED_FIELD;
  if (value) if (!REGEX_POSITIVE_NUMBER.test(value)) return INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  return null;
};

export const validateBreathingFrecuency = value => {
  if (!value) return REQUIRED_FIELD;
  if (value) if (!REGEX_POSITIVE_NUMBER.test(value)) return INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  return null;
};

export const validatePI = value => {
  if (!value) return REQUIRED_FIELD;
  if (value) if (!REGEX_POSITIVE_NUMBER_AND_DECIMAL.test(value)) return INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  return null;
};

export const validateINR = value => {
  if (!value) return REQUIRED_FIELD;
  if (value) if (!REGEX_POSITIVE_NUMBER_AND_DECIMAL.test(value)) return INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  return null;
};

export const validateSpO2 = value => {
  if (!value) return REQUIRED_FIELD;
  if (value) if (!REGEX_POSITIVE_NUMBER.test(value)) return INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  return null;
};

export const validateHearbeat = value => {
  if (!value) return REQUIRED_FIELD;
  if (value) if (!REGEX_POSITIVE_NUMBER.test(value)) return INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  return null;
};

export const validateDistance = value => {
  if (!value) return REQUIRED_FIELD;
  if (value) if (!REGEX_POSITIVE_NUMBER.test(value)) return INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  return null;
};

export const validateTime2 = value => {
  if (!value) return REQUIRED_FIELD;
  if (value) if (!REGEX_POSITIVE_NUMBER.test(value)) return INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  return null;
};
export const validateSteps = value => {
  if (!value) return REQUIRED_FIELD;
  if (value) if (!REGEX_POSITIVE_NUMBER.test(value)) return INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  return null;
};

export const validateSex = value => {
  if (!value) return REQUIRED_FIELD;
  return null;
};

export const validateIntakeTime = value => {
  if (!value) return REQUIRED_FIELD;
  return null;
};

export const validateGlucoseUnity = value => {
  if (!value) return REQUIRED_FIELD;
  return null;
};

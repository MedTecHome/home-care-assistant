import {
  INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT,
  INVALID_EMAIL_ADDRESS,
  REGEX_EMAIL_ADDRESS,
  REGEX_POSITIVE_NUMBER,
  REGEX_POSITIVE_NUMBER_AND_DECIMAL,
  REQUIRED_FIELD,
} from '../../../commons/globalText';

export const validateProfile = values => {
  const errors = {};
  if (!values.name) {
    errors.name = REQUIRED_FIELD;
  }
  if (!values.lastName) {
    errors.lastName = REQUIRED_FIELD;
  }
  if (!values.role) {
    errors.role = REQUIRED_FIELD;
  }
  if (!values.phone) {
    errors.phone = REQUIRED_FIELD;
  }
  if (!values.user) {
    errors.user = REQUIRED_FIELD;
  }
  if (values.user) {
    if (!REGEX_EMAIL_ADDRESS.test(values.user)) {
      errors.user = INVALID_EMAIL_ADDRESS;
    }
  }
  if (values.phone) {
    if (!REGEX_POSITIVE_NUMBER.test(values.phone)) {
      errors.phone = INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
    }
  }
  return errors;
};

export const validateBirthday = value => {
  if (!value) return REQUIRED_FIELD;
  return null;
};

export const validateHeight = value => {
  if (!value) return REQUIRED_FIELD;
  if (value) if (!REGEX_POSITIVE_NUMBER_AND_DECIMAL.test(value)) return INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  return null;
};

export const validateDoctor = value => {
  if (!value) return REQUIRED_FIELD;
  return null;
};

export const validateHospital = value => {
  let error = '';
  if (!value) {
    error = REQUIRED_FIELD;
  }
  return error;
};

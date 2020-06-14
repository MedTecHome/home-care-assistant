import {
  INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT,
  INVALID_EMAIL_ADDRESS,
  REGEX_EMAIL_ADDRESS,
  REGEX_POSITIVE_NUMBER_AND_DECIMAL,
  REQUIRED_FIELD,
  REGEX_PHONE,
  REGEX_ONLY_ALPHANUMERIC_AND_DOT,
  INVALID_PHONE_NUMBER,
  USERNAME_DOMAIN
} from '../../../commons/globalText';
import getProfiles, { getByEmail } from '../../../services/profiles';

const validateProfile = values => {
  const errors = {};
  if (!values.name) {
    errors.name = REQUIRED_FIELD;
  }
  if (!values.role) {
    errors.role = REQUIRED_FIELD;
  }
  if (!values.primaryPhone) {
    errors.primaryPhone = REQUIRED_FIELD;
  }
  if (!values.email) {
    errors.email = REQUIRED_FIELD;
  }
  if (values.email) {
    if (!REGEX_EMAIL_ADDRESS.test(values.email)) {
      errors.email = INVALID_EMAIL_ADDRESS;
    }
  }
  if (values.primaryPhone) {
    if (!REGEX_PHONE.test(values.primaryPhone)) {
      errors.primaryPhone = INVALID_PHONE_NUMBER;
    }
  }
  if (values.secondaryPhone) {
    if (!REGEX_PHONE.test(values.secondaryPhone)) {
      errors.secondaryPhone = INVALID_PHONE_NUMBER;
    }
  }
  return errors;
};

const validateLastname = value => {
  if (!value) {
    return REQUIRED_FIELD;
  }
  return null;
};

const validateBirthday = value => {
  if (!value) return REQUIRED_FIELD;
  return null;
};

const validateHeight = value => {
  if (!value) return REQUIRED_FIELD;
  if (value) if (!REGEX_POSITIVE_NUMBER_AND_DECIMAL.test(value)) return INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  if (value) if (value > 250) return 'Solo valores menor o igual 250cm';
  return null;
};

const validateDoctor = value => {
  if (!value) return REQUIRED_FIELD;
  return null;
};

const validateHospital = value => {
  let error = '';
  if (!value) {
    error = REQUIRED_FIELD;
  }
  return error;
};

const validatePassword = value => {
  if (!value) {
    return REQUIRED_FIELD;
  }
  return null;
};

const validateUsername = async value => {
  if (!value) {
    return REQUIRED_FIELD;
  }
  if (value) {
    if (!REGEX_ONLY_ALPHANUMERIC_AND_DOT.test(value)) {
      return 'Solo se admite numeros y letras';
    }
    try {
      const response = await getByEmail(`${value}${USERNAME_DOMAIN}`);
      return response.data.exist ? 'Ya existe una cuenta asociada a ese usuario.' : null;
    } catch (e) {
      return 'Error en la conexión';
    }
  }
  return null;
};

const validateEmail = async value => {
  try {
    const response = await getProfiles(1, 0, { email: value }, false);
    return response.total > 0 ? 'Ya existe una cuenta asociada a ese correo.' : null;
  } catch (e) {
    return 'Error en la conexión';
  }
};

const agreementValidate = value => {
  if (!value) return REQUIRED_FIELD;
  return null;
};

export {
  validateLastname,
  validateProfile,
  validateBirthday,
  validateHeight,
  validateDoctor,
  validateHospital,
  validateEmail,
  validatePassword,
  agreementValidate,
  validateUsername
};

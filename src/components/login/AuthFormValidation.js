import { PASSWORD_MISMATCH, REQUIRED_FIELD } from '../../commons/globalText';

function LoginFormValidation(values) {
  const errors = {};
  if (!values.email) {
    errors.email = REQUIRED_FIELD;
  }
  if (!values.password) {
    errors.password = REQUIRED_FIELD;
  }
  return errors;
}

function RegisterFormValidation(values) {
  let errors = {};
  if (!values.name) {
    errors.name = REQUIRED_FIELD;
  }
  if (!values.lastName) {
    errors.lastName = REQUIRED_FIELD;
  }
  if (!values.phone) {
    errors.phone = REQUIRED_FIELD;
  }
  errors = LoginFormValidation(values);
  if (!values.passwordConfirm) {
    errors.passwordConfirm = REQUIRED_FIELD;
  }
  if (values.password && values.passwordConfirm && values.password !== values.passwordConfirm) {
    errors.passwordConfirm = PASSWORD_MISMATCH;
  }
  return errors;
}

export { LoginFormValidation, RegisterFormValidation };

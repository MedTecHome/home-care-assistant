import { REQUIRED_FIELD, REGEX_ONLY_ALPHANUMERIC } from '../../commons/globalText';

export default function loginValidate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = REQUIRED_FIELD;
  }
  if (!values.password) {
    errors.password = REQUIRED_FIELD;
  }
  if (values.username) {
    if (!REGEX_ONLY_ALPHANUMERIC.test(values.username)) errors.username = 'Este campo solo admite números y letras.';
  }
  return errors;
}

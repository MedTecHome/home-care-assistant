import { REQUIRED_FIELD } from '../../commons/globalText';

export default function loginValidate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = REQUIRED_FIELD;
  }
  if (!values.password) {
    errors.password = REQUIRED_FIELD;
  }
  return errors;
}

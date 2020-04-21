import { isEmpty, isNil } from 'ramda';
import { REQUIRED_FIELD } from '../../../commons/globalText';

export default values => {
  const errors = {};
  if (isEmpty(values.name) || isNil(values.name)) {
    errors.name = REQUIRED_FIELD;
  }
  if (isEmpty(values.lastName) || isNil(values.lastName)) {
    errors.lastName = REQUIRED_FIELD;
  }
  if (isEmpty(values.birthday) || isNil(values.birthday)) {
    errors.birthday = REQUIRED_FIELD;
  }
  if (isEmpty(values.height) || isNil(values.height)) {
    errors.height = REQUIRED_FIELD;
  }
  if (isEmpty(values.address) || isNil(values.address)) {
    errors.address = REQUIRED_FIELD;
  }
  if (isEmpty(values.phone) || isNil(values.phone)) {
    errors.phone = REQUIRED_FIELD;
  }
  if (isEmpty(values.userId) || isNil(values.userId)) {
    errors.userId = REQUIRED_FIELD;
  }
  if (isEmpty(values.doctorId) || isNil(values.doctorId)) {
    errors.doctorId = REQUIRED_FIELD;
  }

  return errors;
};

import { REQUIRED_FIELD } from '../../../commons/globalText';

const validateForm = value => {
  const errors = {};
  if (!value.name) {
    errors.name = REQUIRED_FIELD;
  }
  if (!value.medicines) {
    errors.medicines = REQUIRED_FIELD;
  }
  return errors;
};

export default validateForm;

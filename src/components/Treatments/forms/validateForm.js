import { REQUIRED_FIELD } from '../../../commons/globalText';

const validateForm = value => {
  const errors = {};
  if (!value.medicine) {
    errors.medicine = REQUIRED_FIELD;
  }
  return errors;
};

export default validateForm;

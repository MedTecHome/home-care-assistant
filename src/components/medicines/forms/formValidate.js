import {
  INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT,
  REQUIRED_FIELD,
  REGEX_POSITIVE_NUMBER,
  INVALID_WEIRD_CHARACTERS_ON_TEXT,
  REGEX_ONLY_ALPHA,
} from '../../../commons/globalText';

const formValidate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = REQUIRED_FIELD;
  }
  if (values.name && !REGEX_ONLY_ALPHA.test(values.name)) {
    errors.name = INVALID_WEIRD_CHARACTERS_ON_TEXT;
  }
  if (!values.concentrationCant) {
    errors.concentrationCant = REQUIRED_FIELD;
  }
  if (!values.concentrationType) {
    errors.concentrationType = REQUIRED_FIELD;
  }
  if (!values.dose) {
    errors.dose = REQUIRED_FIELD;
  }
  if (!values.doseType) {
    errors.doseType = REQUIRED_FIELD;
  }
  if (!values.administrationRoute) {
    errors.administrationRoute = REQUIRED_FIELD;
  }
  if (!values.frequency) {
    errors.frequency = REQUIRED_FIELD;
  }
  if (!values.administrationReason) {
    errors.administrationReason = REQUIRED_FIELD;
  }
  if (values.concentrationCant && !REGEX_POSITIVE_NUMBER.test(values.concentrationCant)) {
    errors.concentrationCant = INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  }
  if (values.dose && !REGEX_POSITIVE_NUMBER.test(values.dose)) {
    errors.dose = INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  }
  if (values.frequency && !REGEX_POSITIVE_NUMBER.test(values.frequency)) {
    errors.frequency = INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  }
  return errors;
};

export default formValidate;

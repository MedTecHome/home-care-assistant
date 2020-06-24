import {
  INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT,
  REQUIRED_FIELD,
  REGEX_POSITIVE_NUMBER,
  INVALID_WEIRD_CHARACTERS_ON_TEXT,
  REGEX_POSITIVE_NUMBER_AND_DECIMAL_AND_FRACTION,
  REGEX_ALPHANUMERIC_AND_SPACE
} from '../../../commons/globalText';

const formValidate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = REQUIRED_FIELD;
  }
  if (values.name && !REGEX_ALPHANUMERIC_AND_SPACE.test(values.name)) {
    errors.name = INVALID_WEIRD_CHARACTERS_ON_TEXT;
  }
  if (values.concentrationCant && !REGEX_POSITIVE_NUMBER.test(values.concentrationCant)) {
    errors.concentrationCant = INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  }
  if (values.doseCant && !REGEX_POSITIVE_NUMBER_AND_DECIMAL_AND_FRACTION.test(values.doseCant)) {
    errors.doseCant = INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT;
  }

  return errors;
};

export default formValidate;

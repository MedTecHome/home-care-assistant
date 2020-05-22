import React from 'react';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';
import { intakeTimeSource } from '../../helpers/constants';

function IntakeTimeFieldComponent({ label, name, validate, required }) {
  return (
    <CustomSelectFieldComponent
      required={required}
      source={intakeTimeSource}
      label={label}
      name={name}
      validate={validate}
    />
  );
}

export default IntakeTimeFieldComponent;

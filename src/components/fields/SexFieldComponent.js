import React from 'react';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';
import { validateSex } from '../MedicalForms/validateMedicalForms';
import { genders } from '../../helpers/constants';

function SexFieldComponent({ required, name, label, className, disabled }) {
  return (
    <CustomSelectFieldComponent
      disabled={disabled}
      className={className}
      required={required}
      name={name}
      label={label}
      validate={validateSex}
      source={genders}
    />
  );
}

export default SexFieldComponent;

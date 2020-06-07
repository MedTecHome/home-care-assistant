import React from 'react';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';
import { severityConstant } from '../../helpers/constants';

function SeverityFieldComponent({ validate }) {
  return (
    <CustomSelectFieldComponent
      required
      source={severityConstant}
      name="severity"
      label="Severidad"
      validate={validate}
    />
  );
}

export default SeverityFieldComponent;

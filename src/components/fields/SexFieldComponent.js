import React, { useEffect, useState } from 'react';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';
import { validateSex } from '../MedicalForms/validateMedicalForms';
import getNomenclator from '../../services/nomenclators';

function SexFieldComponent({ required, name, label, className, disabled }) {
  const [options, setOptions] = useState([]);
  //  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getNomenclator('sex').then(res => {
      setOptions(res.data);
    });
  }, []);
  return (
    <CustomSelectFieldComponent
      disabled={disabled}
      className={className}
      required={required}
      name={name}
      label={label}
      validate={validateSex}
      source={options}
    />
  );
}

export default SexFieldComponent;

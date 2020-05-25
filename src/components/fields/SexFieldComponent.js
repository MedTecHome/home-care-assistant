import React, { useEffect, useState } from 'react';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';
import { validateSex } from '../MedicalForms/validateMedicalForms';
import { getNomenclatorListActions } from '../../Nomenclators/NomenclatorsAction';

function SexFieldComponent({ required, name, label, className }) {
  const [options, setOptions] = useState([]);
  //  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getNomenclatorListActions('sex').then(result => {
      setOptions(result.data);
    });
  }, []);
  return (
    <CustomSelectFieldComponent
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

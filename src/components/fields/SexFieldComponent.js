import React, { useEffect, useState } from 'react';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';
import { validateSex } from '../MedicalForms/validateMedicalForms';
import { getNomList } from '../../nomenc/NomencAction';

function SexFieldComponent({ required, name, label, className }) {
  const [options, setOptions] = useState([]);
  //  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getNomList('sex')().then(result => {
      setOptions(result);
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

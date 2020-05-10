import React, { useEffect, useState } from 'react';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';
import { validateSex } from '../medicalForms/validateMedicalForms';
import { getNomList } from '../../nomenc/NomencAction';

function SexFieldComponent({ required, name, label }) {
  const [options, setOptions] = useState([]);
  //  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getNomList('sex')().then(result => {
      setOptions(result);
    });
  }, []);
  return (
    <CustomSelectFieldComponent required={required} name={name} label={label} validate={validateSex} source={options} />
  );
}

export default SexFieldComponent;

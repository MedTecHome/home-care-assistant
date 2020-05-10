import React, { useEffect, useState } from 'react';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';
import { getNomList } from '../../nomenc/NomencAction';

function SheduleFieldComponent({ label, name, validate }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getNomList('shedules')().then(result => {
      setOptions(result);
    });
  }, []);

  return <CustomSelectFieldComponent required source={options} label={label} name={name} validate={validate} />;
}

export default SheduleFieldComponent;

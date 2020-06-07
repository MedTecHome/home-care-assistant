import React, { useEffect, useState } from 'react';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';
import getNomenclator from '../../services/nomenclators';

function SheduleFieldComponent({ label, name, validate }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getNomenclator('shedules').then(res => {
      setOptions(res.data);
    });
  }, []);

  return <CustomSelectFieldComponent required source={options} label={label} name={name} validate={validate} />;
}

export default SheduleFieldComponent;

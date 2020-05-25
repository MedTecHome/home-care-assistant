import React, { useEffect, useState } from 'react';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';
import { getNomenclatorListActions } from '../../Nomenclators/NomenclatorsAction';

function SheduleFieldComponent({ label, name, validate }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getNomenclatorListActions('shedules').then(result => {
      setOptions(result.data);
    });
  }, []);

  return <CustomSelectFieldComponent required source={options} label={label} name={name} validate={validate} />;
}

export default SheduleFieldComponent;

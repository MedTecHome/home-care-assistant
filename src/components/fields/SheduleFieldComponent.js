import React, { useEffect, useState } from 'react';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';
import { getNomList } from '../../nomenc/NomencAction';

function SheduleFieldComponent({ label, name, validate }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function loadList() {
      const result = await getNomList('shedules')();
      setOptions(result);
    }
    loadList();
  }, []);

  return <CustomSelectFieldComponent required source={options} label={label} name={name} validate={validate} />;
}

export default SheduleFieldComponent;

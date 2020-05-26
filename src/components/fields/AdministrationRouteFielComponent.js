import React, { useEffect, useState } from 'react';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';
import getNomenclator from '../../services/nomenclators';

function AdministrationRouteFielComponent({ required, name, label, validate }) {
  const [options, setOptions] = useState([]);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    getNomenclator('administrationroute').then(res => {
      setOptions(res.data);
    });
  }, []);

  return (
    <CustomSelectFieldComponent required={required} name={name} label={label} validate={validate} source={options} />
  );
}

export default AdministrationRouteFielComponent;

import React, { useEffect, useState } from 'react';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';
import { getNomenclatorListActions } from '../../Nomenclators/NomenclatorsAction';

function ConcentrationFieldComponent({ required, name, label, validate }) {
  const [options, setOptions] = useState([]);
  //  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getNomenclatorListActions('concentrations').then(result => {
      setOptions(result.data);
    });
  }, []);
  return (
    <CustomSelectFieldComponent required={required} name={name} label={label} validate={validate} source={options} />
  );
}

export default ConcentrationFieldComponent;

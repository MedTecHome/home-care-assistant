import React, { useEffect, useState } from 'react';
import { getListConcentrations } from '../../nomenc/NomConcentration';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';

function ConcentrationFieldComponent({ required, name, label, validate }) {
  const [options, setOptions] = useState([]);
  //  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function loadList() {
      const result = await getListConcentrations();
      setOptions(result);
    }
    loadList();
  }, []);
  return (
    <CustomSelectFieldComponent required={required} name={name} label={label} validate={validate} source={options} />
  );
}

export default ConcentrationFieldComponent;

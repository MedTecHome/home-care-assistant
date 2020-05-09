import React, { useEffect, useState } from 'react';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';
import { getNomList } from '../../nomenc/NomencAction';

function DosisFieldComponent({ required, name, label, validate }) {
  const [options, setOptions] = useState([]);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function loadList() {
      const result = await getNomList('dosis')();
      setOptions(result);
    }
    loadList();
  }, []);
  return (
    <CustomSelectFieldComponent required={required} name={name} label={label} validate={validate} source={options} />
  );
}

export default DosisFieldComponent;

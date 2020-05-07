import React, { useEffect, useState } from 'react';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';
import { getListDosis } from '../../nomenc/NomDosis';

function DosisFieldComponent({ required, name, label, validate }) {
  const [options, setOptions] = useState([]);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function loadList() {
      const result = await getListDosis();
      setOptions(result);
    }
    loadList();
  }, []);
  return (
    <CustomSelectFieldComponent required={required} name={name} label={label} validate={validate} source={options} />
  );
}

export default DosisFieldComponent;

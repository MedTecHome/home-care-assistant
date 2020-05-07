import React, { useEffect, useState } from 'react';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';
import { getListAdministrationRoute } from '../../nomenc/NomAdministrationRoute';

function AdministrationRouteFielComponent({ required, name, label, validate }) {
  const [options, setOptions] = useState([]);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function loadList() {
      const result = await getListAdministrationRoute();
      setOptions(result);
    }
    loadList();
  }, []);
  return (
    <CustomSelectFieldComponent required={required} name={name} label={label} validate={validate} source={options} />
  );
}

export default AdministrationRouteFielComponent;

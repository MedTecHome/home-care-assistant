import React, { useEffect, useState } from 'react';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';
import { validateSex } from '../medicalForms/validateMedicalForms';
import { getLisSex } from '../../nomenc/NomSex';

function SexFieldComponent({ required, name, label }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function loadList() {
      const result = await getLisSex();
      setOptions(result);
    }
    loadList();
  }, []);
  return (
    <CustomSelectFieldComponent required={required} name={name} label={label} validate={validateSex} source={options} />
  );
}

export default SexFieldComponent;

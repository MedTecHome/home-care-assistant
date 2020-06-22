import React, { useState, useEffect, useRef } from 'react';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';
import getNomenclator from '../../services/nomenclators';

function GenericSelectNomenclatorFieldComponent({ required, name, label, validate, nomenclator }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    setLoading(true);
    getNomenclator(nomenclator)
      .then(res => {
        if (mounted.current) {
          setOptions(res.data);
        }
      })
      // eslint-disable-next-line no-console
      .catch(console.log)
      .finally(() => {
        if (mounted.current) setLoading(false);
      });

    return () => {
      mounted.current = false;
    };
  }, [nomenclator]);

  return (
    <CustomSelectFieldComponent
      waiting={loading}
      required={required}
      name={name}
      label={label}
      validate={validate}
      source={options}
    />
  );
}

export default GenericSelectNomenclatorFieldComponent;

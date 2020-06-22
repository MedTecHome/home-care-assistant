import React, { useEffect, useMemo, useState, memo, useRef } from 'react';
import { Autocomplete } from 'mui-rff';
import { CircularProgress, TextField } from '@material-ui/core';
import useDebounceCustom from '../../commons/useDebounceCustom';
import getMedicines from '../../services/medicines';

function MedicinesFieldComponent({
  required,
  disabled,
  size = 'small',
  variant = 'outlined',
  label,
  name,
  validate,
  placeholder,
  clinic
}) {
  const [medicines, setMedicines] = useState([]);
  const [filterName, setFilterName] = useState('');
  const debounceValue = useDebounceCustom(filterName, 500);
  const filterNameMemoize = useMemo(() => debounceValue, [debounceValue]);
  const [loading, setLoading] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    setLoading(true);
    getMedicines(5, 0, { clinic, name: filterNameMemoize })
      .then(result => {
        if (mounted.current) setMedicines(result.data);
      })
      .finally(() => {
        if (mounted.current) setLoading(false);
      });

    return () => {
      mounted.current = false;
    };
  }, [clinic, filterNameMemoize]);

  const handleInputChange = event => {
    setFilterName(event.target.value);
  };

  return (
    <Autocomplete
      required={required}
      autoHighlight
      blurOnSelect
      size={size}
      label={label}
      name={name}
      disabled={disabled}
      fieldProps={{
        validate
      }}
      textFieldProps={{
        size,
        placeholder,
        variant,
        onChange: handleInputChange
      }}
      renderInput={({ InputProps, ...input }) => (
        <TextField
          required={required}
          label={label}
          variant={variant}
          disabled={disabled}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...input}
          InputProps={{
            ...InputProps,
            startAdornment: loading ? <CircularProgress size={20} /> : null
          }}
        />
      )}
      openOnFocus={false}
      options={medicines}
      getOptionValue={option => option.id}
      getOptionLabel={option => option.name}
    />
  );
}

export default memo(MedicinesFieldComponent);

import React, { useEffect, useMemo, useState, memo } from 'react';
import { Autocomplete } from 'mui-rff';
import useDebounceCustom from '../../../commons/useDebounceCustom';
import getMedicines from '../../../services/medicines';

function MedicinesFieldComponent({
  required,
  disabled,
  size = 'small',
  variant = 'outlined',
  label,
  name,
  validate,
  placeholder
}) {
  const [medicines, setMedicines] = useState([]);
  const [filterName, setFilterName] = useState('');
  const debounceValue = useDebounceCustom(filterName, 500);
  const filterNameMemoize = useMemo(() => debounceValue, [debounceValue]);

  useEffect(() => {
    getMedicines(5, {}, { name: filterNameMemoize }).then(result => {
      setMedicines(result.data);
    });
  }, [filterNameMemoize]);

  const handleInputChange = event => {
    setFilterName(event.target.value);
  };

  return (
    <Autocomplete
      required={required}
      autoHighlight
      blurOnSelect
      size="small"
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
      openOnFocus={false}
      options={medicines}
      getOptionValue={option => option.id}
      getOptionLabel={option => option.name}
    />
  );
}

export default memo(MedicinesFieldComponent);

import React, { useEffect, useMemo, useState, memo } from 'react';
import { Autocomplete } from 'mui-rff';
import useDebounceCustom from '../../commons/useDebounceCustom';
import getMedicines from '../../services/medicines';
import useCustomStyles from '../../jss/globalStyles';

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
  const classes = useCustomStyles();

  useEffect(() => {
    getMedicines(5, 0, { clinic, name: filterNameMemoize }).then(result => {
      setMedicines(result.data);
    });
  }, [clinic, filterNameMemoize]);

  const handleInputChange = event => {
    setFilterName(event.target.value);
  };

  return (
    <Autocomplete
      className={classes.textUpperCase}
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
      openOnFocus={false}
      options={medicines}
      getOptionValue={option => option.id}
      getOptionLabel={option => option.name.toUpperCase()}
    />
  );
}

export default memo(MedicinesFieldComponent);

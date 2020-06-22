import { Autocomplete } from 'mui-rff';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { CircularProgress, TextField } from '@material-ui/core';
import useDebounceCustom from '../../commons/useDebounceCustom';
import getProfiles from '../../services/profiles';

function ProfileFieldComponent({
  required,
  disabled,
  size = 'small',
  variant = 'outlined',
  label,
  name,
  validate,
  filterRole = '',
  parent = '',
  placeholder
}) {
  const [profiles, setProfiles] = useState([]);
  const [filterName, setFilterName] = useState('');
  const debounceValue = useDebounceCustom(filterName, 500);
  const filterNameMemoize = useMemo(() => debounceValue, [debounceValue]);
  const [loading, setLoading] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    setLoading(true);
    getProfiles(5, 0, {
      parent,
      role: filterRole,
      ...(filterNameMemoize ? { fullname: filterNameMemoize } : {})
    })
      .then(res => {
        if (mounted.current) setProfiles(res.data);
      })
      .finally(() => {
        if (mounted.current) setLoading(false);
      });
    return () => {
      mounted.current = false;
    };
  }, [parent, filterRole, filterNameMemoize]);

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
      options={profiles}
      getOptionValue={option => option.id}
      getOptionLabel={option => `${option.name} ${option.lastName ? option.lastName : ''}`}
    />
  );
}

export default ProfileFieldComponent;

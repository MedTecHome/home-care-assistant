import { Autocomplete } from 'mui-rff';
import React, { useEffect, useMemo, useState } from 'react';
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
  placeholder
}) {
  const [profiles, setProfiles] = useState([]);
  const [filterName, setFilterName] = useState('');
  const debounceValue = useDebounceCustom(filterName, 500);
  const filterNameMemoize = useMemo(() => debounceValue, [debounceValue]);

  useEffect(() => {
    getProfiles(5, 0, { role: filterRole, ...(filterNameMemoize ? { fullname: filterNameMemoize } : {}) }).then(res =>
      setProfiles(res.data)
    );
  }, [filterRole, filterNameMemoize]);

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
      options={profiles}
      getOptionValue={option => option.id}
      getOptionLabel={option => `${option.name.toUpperCase()} ${option.lastName ? option.lastName.toUpperCase() : ''}`}
    />
  );
}

export default ProfileFieldComponent;

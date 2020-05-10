import { Autocomplete } from 'mui-rff';
import React, { useEffect, useMemo, useState } from 'react';
import { getProfilesAction } from '../profiles/reducers/ProfileActions';
import useDebounceCustom from '../../commons/useDebounceCustom';

function ProfileFieldComponent({
  required,
  disabled,
  size = 'small',
  variant = 'standard',
  label,
  name,
  validate,
  filterRole = '',
  placeholder
}) {
  const [doctors, setDoctors] = useState([]);
  const [filterName, setFilterName] = useState('');
  const debounceValue = useDebounceCustom(filterName, 500);
  const filterNameMemoize = useMemo(() => debounceValue, [debounceValue]);

  useEffect(() => {
    getProfilesAction({
      filters: { 'role.id': filterRole, ...(filterNameMemoize ? { fullname: filterNameMemoize } : {}) }
    }).then(res => setDoctors(res));
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
      options={doctors}
      getOptionValue={option => option.id}
      getOptionLabel={option => `${option.name} ${option.lastName}`}
    />
  );
}

export default ProfileFieldComponent;

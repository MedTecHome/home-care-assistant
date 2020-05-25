import { Autocomplete } from 'mui-rff';
import React, { useEffect, useMemo, useState } from 'react';
import { fetchProfilesAction } from '../Profiles/reducers/ProfileActions';
import useDebounceCustom from '../../commons/useDebounceCustom';

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
    fetchProfilesAction({
      filters: { 'role.id': filterRole, ...(filterNameMemoize ? { fullname: filterNameMemoize } : {}) }
    }).then(res => setProfiles(res.data));
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
      getOptionLabel={option => `${option.name} ${option.lastName}`}
    />
  );
}

export default ProfileFieldComponent;

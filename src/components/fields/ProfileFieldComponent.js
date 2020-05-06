import { Autocomplete } from 'mui-rff';
import React, { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { getProfilesAction } from '../profiles/reducers/ProfileActions';

function ProfileFieldComponent({
  required,
  size = 'small',
  variant = 'standard',
  label,
  name,
  userRole,
  validate,
  filterRole = '',
}) {
  const [doctors, setDoctors] = useState([]);
  const [filterName, setFilterName] = useState('');
  const setFilterNameDebounced = debounce(setFilterName, 500);

  const filterNameMemoize = useMemo(() => filterName, [filterName]);
  useEffect(() => {
    getProfilesAction({
      filters: { 'role.id': filterRole, ...(filterNameMemoize ? { fullname: filterNameMemoize } : {}) },
    }).then(res => setDoctors(res));
  }, [filterRole, filterNameMemoize]);

  const handleInputChange = event => {
    setFilterNameDebounced(event.target.value);
  };

  return (
    <Autocomplete
      required={required}
      autoHighlight
      blurOnSelect
      size="small"
      label={label}
      name={name}
      disabled={userRole.id === 'doctor'}
      fieldProps={{
        validate,
      }}
      textFieldProps={{
        size,
        placeholder: 'busque y seleccione',
        variant,
        onChange: handleInputChange,
      }}
      openOnFocus={false}
      options={doctors}
      getOptionValue={option => option.id}
      getOptionLabel={option => `${option.name} ${option.lastName}`}
    />
  );
}

export default ProfileFieldComponent;

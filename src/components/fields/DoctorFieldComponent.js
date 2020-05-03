import { Autocomplete } from 'mui-rff';
import React, { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { getDoctorsListAction } from '../profiles/reducers/ProfileActions';

function DoctorFieldComponent({ classes, userRole, validate }) {
  const [doctors, setDoctors] = useState([]);
  const [filterName, setFilterName] = useState('');
  const setFilterNameDebounced = debounce(setFilterName, 500);

  const filterNameMemoize = useMemo(() => filterName, [filterName]);
  useEffect(() => {
    getDoctorsListAction({ filters: { ...(filterNameMemoize ? { name: filterNameMemoize } : {}) } }).then(res =>
      setDoctors(res)
    );
  }, [filterNameMemoize]);

  const handleInputChange = event => {
    setFilterNameDebounced(event.target.value);
  };

  return (
    <Autocomplete
      required
      className={classes.formControl}
      autoHighlight
      blurOnSelect
      size="small"
      label="Doctor"
      name="doctor"
      disabled={userRole.id === 'doctor'}
      fieldProps={{
        validate,
      }}
      textFieldProps={{
        size: 'small',
        placeholder: 'busque y seleccione',
        variant: 'outlined',
        InputLabelProps: { shrink: true },
        onChange: handleInputChange,
      }}
      openOnFocus={false}
      options={doctors}
      getOptionValue={option => option.id}
      getOptionLabel={option => option.name}
    />
  );
}

export default DoctorFieldComponent;

import { Autocomplete } from 'mui-rff';
import React, { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { getDoctorsListAction } from '../profiles/reducers/ProfileActions';

function DoctorFieldComponent({ classes }) {
  const [doctors, setDoctors] = useState([]);
  const [filterName, setFilterName] = useState('');
  const setFilterNameDebounced = debounce(setFilterName, 500);

  const filterNameMemoize = useMemo(() => filterName, [filterName]);
  useEffect(() => {
    getDoctorsListAction({ name: filterNameMemoize }).then(res => setDoctors(res));
  }, [filterNameMemoize]);

  const handleInputChange = event => {
    setFilterNameDebounced(event.target.value);
  };

  return (
    <Autocomplete
      className={classes.formControl}
      required
      autoHighlight
      blurOnSelect
      size="small"
      label="Doctor"
      name="doctor"
      // popupIcon={false ? <CircularProgress size={12} /> : <ExpandMoreIcon size={12} />}
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

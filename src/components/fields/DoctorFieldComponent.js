import { Autocomplete } from 'mui-rff';
import React, { useEffect, useMemo, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import debounce from 'lodash/debounce';
import { useDoctorsContext, withDoctorContext } from '../../contexts/DoctorsContext';

function DoctorFieldComponent({ classes }) {
  const { getListDoctors, listLoading, doctors } = useDoctorsContext();
  const [filterName, setFilterName] = useState('');
  const setFilterNameDebounced = debounce(setFilterName, 500);

  const filterNameMemoize = useMemo(() => filterName, [filterName]);

  useEffect(() => {
    getListDoctors({ limit: 5, filters: { name: filterNameMemoize } });
  }, [getListDoctors, filterNameMemoize]);

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
      name="doctorId"
      popupIcon={listLoading ? <CircularProgress size={12} /> : <ExpandMoreIcon size={12} />}
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

export default withDoctorContext(DoctorFieldComponent);

import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete } from 'mui-rff';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import debounce from 'lodash/debounce';

import { useHospitalContext, withHospitalContext } from '../hospital/HospitalContext';

function HospitalFieldComponent({ classes }) {
  const { getListHospitals, listLoading, hospitals } = useHospitalContext();
  const [filterName, setFilterName] = useState('');
  const setFilterNameDebounced = debounce(setFilterName, 500);

  const filterNameMemoize = useMemo(() => filterName, [filterName]);

  useEffect(() => {
    getListHospitals({ limit: 5, filters: { name: filterNameMemoize } });
  }, [getListHospitals, filterNameMemoize]);

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
      label="Hospital"
      name="hospital"
      popupIcon={listLoading ? <CircularProgress size={12} /> : <ExpandMoreIcon size={12} />}
      textFieldProps={{
        size: 'small',
        placeholder: 'busque y seleccione',
        variant: 'outlined',
        InputLabelProps: { shrink: true },
        onChange: handleInputChange,
      }}
      openOnFocus={false}
      options={hospitals}
      getOptionValue={option => option.id}
      getOptionLabel={option => option.name}
    />
  );
}

export default withHospitalContext(HospitalFieldComponent);

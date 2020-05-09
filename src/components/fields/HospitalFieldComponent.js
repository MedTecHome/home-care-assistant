import React, { memo, useEffect, useMemo, useState } from 'react';
import { Autocomplete } from 'mui-rff';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import debounce from 'lodash/debounce';

import { useHospitalContext, withHospitalContext } from '../hospital/HospitalContext';
import useCustomStyles from '../../jss/globalStyles';

function HospitalFieldComponent({ validate, disabled }) {
  const { getListHospitals, loadingList, hospitalsList } = useHospitalContext();
  const [filterName, setFilterName] = useState('');
  const setFilterNameDebounced = debounce(setFilterName, 500);
  const filterNameMemoize = useMemo(() => filterName, [filterName]);
  const classes = useCustomStyles();

  useEffect(() => {
    getListHospitals({ limit: 5, filters: { name: filterNameMemoize } });
  }, [getListHospitals, filterNameMemoize]);

  const handleInputChange = event => {
    setFilterNameDebounced(event.target.value);
  };
  return (
    <Autocomplete
      required
      disabled={disabled}
      className={classes.formControl}
      autoHighlight
      blurOnSelect
      size="small"
      label="Hospital"
      name="hospital"
      popupIcon={loadingList ? <CircularProgress size={12} /> : <ExpandMoreIcon size={12} />}
      textFieldProps={{
        size: 'small',
        placeholder: 'busque y seleccione',
        onChange: handleInputChange
      }}
      fieldProps={{
        validate
      }}
      openOnFocus={false}
      options={hospitalsList}
      getOptionValue={option => option.id}
      getOptionLabel={option => option.name}
    />
  );
}

export default memo(withHospitalContext(HospitalFieldComponent));

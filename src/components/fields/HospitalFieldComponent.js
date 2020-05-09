import React, { memo, useEffect, useMemo, useState } from 'react';
import { Autocomplete } from 'mui-rff';
import { CircularProgress } from '@material-ui/core';
import { ExpandMoreOutlined as ExpandMoreIcon } from '@material-ui/icons';
import { useHospitalContext, withHospitalContext } from '../hospital/HospitalContext';
import useCustomStyles from '../../jss/globalStyles';
import useDebounceCustom from '../../commons/useDebounceCustom';

function HospitalFieldComponent({ validate, disabled }) {
  const { getListHospitals, loadingList, hospitalsList } = useHospitalContext();
  const [filterName, setFilterName] = useState('');
  const debounceValue = useDebounceCustom(filterName, 500);
  const filterNameMemoize = useMemo(() => debounceValue, [debounceValue]);
  const classes = useCustomStyles();

  useEffect(() => {
    getListHospitals({ limit: 5, filters: { name: filterNameMemoize } });
  }, [getListHospitals, filterNameMemoize]);

  const handleInputChange = event => {
    setFilterName(event.target.value);
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
        onChange: handleInputChange,
      }}
      fieldProps={{
        validate,
      }}
      openOnFocus={false}
      options={hospitalsList}
      getOptionValue={option => option.id}
      getOptionLabel={option => option.name}
    />
  );
}

export default memo(withHospitalContext(HospitalFieldComponent));

import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete } from 'mui-rff';
import { CircularProgress } from '@material-ui/core';
import { ExpandMoreOutlined as ExpandMoreIcon } from '@material-ui/icons';
import useCustomStyles from '../../jss/globalStyles';
import useDebounceCustom from '../../commons/useDebounceCustom';
import getHospitals from '../../services/hospital';

function HospitalFieldComponent({ validate, disabled }) {
  const [hospitalsList, setHospitalList] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [filterName, setFilterName] = useState('');
  const debounceValue = useDebounceCustom(filterName, 500);
  const filterNameMemoize = useMemo(() => debounceValue, [debounceValue]);
  const classes = useCustomStyles();

  useEffect(() => {
    setLoadingList(true);
    getHospitals(5, {}, { name: filterNameMemoize })
      .then(result => setHospitalList(result.data))
      .finally(() => setLoadingList(false));
  }, [filterNameMemoize]);

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
        variant: 'outlined'
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

export default HospitalFieldComponent;

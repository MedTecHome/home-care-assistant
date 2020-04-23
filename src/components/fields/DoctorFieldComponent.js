import { Autocomplete } from 'mui-rff';
import React, { useEffect, useMemo, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import debounce from 'lodash/debounce';
import { useProfilesContext } from '../../contexts/ProfilesContext';

function DoctorFieldComponent({ classes }) {
  const { getProfilesList, listLoading, profiles } = useProfilesContext();
  const [filterName, setFilterName] = useState('');
  const setFilterNameDebounced = debounce(setFilterName, 500);

  const filterNameMemoize = useMemo(() => filterName, [filterName]);

  useEffect(() => {
    getProfilesList({ limit: 5, filters: { name: filterNameMemoize } });
  }, [getProfilesList, filterNameMemoize]);

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
      options={profiles}
      getOptionValue={option => option.id}
      getOptionLabel={option => option.name}
    />
  );
}

export default DoctorFieldComponent;

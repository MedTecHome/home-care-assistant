import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete } from 'mui-rff';
import debounce from 'lodash/debounce';
import { withMedicinesContext } from '../medicines/MedicinesContext';
import { getMedicinesListAction } from '../medicines/reducers/MedicinesActions';
import { REQUIRED_FIELD } from '../../commons/globalText';

function MedicinesFieldComponent({ classes }) {
  const [medicines, setMedicines] = useState([]);
  const [filterName, setFilterName] = useState('');
  const setFilterNameDebounced = debounce(setFilterName, 500);

  const filterNameMemoize = useMemo(() => filterName, [filterName]);
  useEffect(() => {
    getMedicinesListAction({ filters: { name: filterNameMemoize } }).then(res => {
      setMedicines(res);
    });
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
      label="Medicamentos"
      name="medicine"
      fieldProps={{
        validate: value => (!value ? REQUIRED_FIELD : null),
      }}
      textFieldProps={{
        size: 'small',
        placeholder: 'busque y seleccione',
        variant: 'outlined',
        InputLabelProps: { shrink: true },
        onChange: handleInputChange,
      }}
      openOnFocus={false}
      options={medicines}
      getOptionValue={option => option.id}
      getOptionLabel={option => option.name}
    />
  );
}
export default withMedicinesContext(MedicinesFieldComponent);

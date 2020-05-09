import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete } from 'mui-rff';
import { withMedicinesContext } from '../medicines/MedicinesContext';
import { getMedicinesListAction } from '../medicines/reducers/MedicinesActions';
import { REQUIRED_FIELD } from '../../commons/globalText';
import useDebounceCustom from '../../commons/useDebounceCustom';

function MedicinesFieldComponent({ classes }) {
  const [medicines, setMedicines] = useState([]);
  const [filterName, setFilterName] = useState('');
  const debounceValue = useDebounceCustom(filterName, 500);
  const filterNameMemoize = useMemo(() => debounceValue, [debounceValue]);

  useEffect(() => {
    getMedicinesListAction({ filters: { name: filterNameMemoize } }).then(res => {
      setMedicines(res);
    });
  }, [filterNameMemoize]);

  const handleInputChange = event => {
    setFilterName(event.target.value);
  };

  return (
    <Autocomplete
      required
      className={classes.formControl}
      autoHighlight
      blurOnSelect
      label="Medicamentos"
      name="medicine"
      fieldProps={{
        validate: value => (!value ? REQUIRED_FIELD : null),
      }}
      textFieldProps={{
        size: 'small',
        placeholder: 'busque y seleccione',
        onChange: handleInputChange,
        color: 'primary',
      }}
      openOnFocus={false}
      options={medicines}
      getOptionValue={option => option.id}
      getOptionLabel={option => option.name}
    />
  );
}
export default withMedicinesContext(MedicinesFieldComponent);

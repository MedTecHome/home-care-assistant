import React, { useState, useMemo, useEffect } from 'react';
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons/';
import useDebounceCustom from '../../commons/useDebounceCustom';
import useCustomStyles from '../../jss/globalStyles';

function InputSearchByTagname({ nameFilter, setNameFilter }) {
  const [filterName, setFilterName] = useState('');
  const debounceValue = useDebounceCustom(filterName, 500);
  const filterNameMemoize = useMemo(() => debounceValue, [debounceValue]);
  const classes = useCustomStyles();

  useEffect(() => {
    if (nameFilter !== filterNameMemoize) {
      setNameFilter(filterNameMemoize);
    }
  }, [nameFilter, filterNameMemoize, setNameFilter]);

  const handleInputChange = event => {
    setFilterName(event.target.value);
  };
  return (
    <FormControl className={classes.formControl} size="small">
      <InputLabel variant="outlined">Buscar por nombre</InputLabel>
      <OutlinedInput
        type="search"
        label="Buscar por nombre"
        onChange={handleInputChange}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

export default InputSearchByTagname;

import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import useCustomStyles from '../../jss/globalStyles';
import { useMedicinesContext } from './MedicinesContext';

function FiltersMedicineComponent() {
  const [name, setName] = useState('');
  const { setFilters } = useMedicinesContext();
  const classes = useCustomStyles();

  const handleSearch = () => {
    setFilters({ name });
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>buscar por nombre</InputLabel>
      <Input
        type="search"
        value={name}
        onChange={event => setName(event.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
export default FiltersMedicineComponent;

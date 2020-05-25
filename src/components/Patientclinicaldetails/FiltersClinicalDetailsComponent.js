/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState } from 'react';
import { List, ListItem } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import useDebounceCustom from '../../commons/useDebounceCustom';
import { getPatientsAction } from '../Profiles/reducers/ProfileActions';

function ProfileSearchComponent({ value, onSelect, doctor, filterRole = '' }) {
  const [profiles, setProfiles] = useState([]);
  const [filterName, setFilterName] = useState('');
  const debounceValue = useDebounceCustom(filterName, 500);
  const filterNameMemoize = useMemo(() => debounceValue, [debounceValue]);

  useEffect(() => {
    getPatientsAction({
      filters: {
        'role.id': filterRole,
        'doctor.id': doctor,
        ...(filterNameMemoize ? { fullname: filterNameMemoize } : {})
      }
    }).then(res => setProfiles(res.data));
  }, [filterRole, filterNameMemoize, doctor]);

  const handleInputChange = event => {
    setFilterName(event.target.value);
  };

  const handleSelect = item => {
    onSelect(item);
  };

  return (
    <Autocomplete
      id="controlled-demo"
      options={profiles}
      value={value}
      filterSelectedOptions
      getOptionLabel={option => `${option.name} ${option.lastName}`}
      getOptionSelected={option => option.id}
      onChange={(event, newValue) => {
        handleSelect(newValue);
      }}
      renderInput={params => <TextField {...params} label="Paciente" margin="normal" onChange={handleInputChange} />}
    />
  );
}

function FiltersClinicalDetails({ patient, setPatient, doctor }) {
  return (
    <List>
      <ListItem>
        <Grid container>
          <Grid item xs={12}>
            <ProfileSearchComponent
              value={patient}
              onSelect={setPatient}
              doctor={doctor}
              filterRole="patient"
              placeholder="Buscar por nombre"
            />
          </Grid>
        </Grid>
      </ListItem>
    </List>
  );
}

export default FiltersClinicalDetails;

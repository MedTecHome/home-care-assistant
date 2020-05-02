import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import { isEmpty } from 'ramda';

function FiltersMedicineComponent() {
  const [name, setName] = useState('');
  const history = useHistory();
  const { pathname, search } = useLocation();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(search);
    if (urlSearchParams.has('nM')) {
      setName(urlSearchParams.get('nM'));
    }
  }, [search]);

  const handleSearch = () => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('nM', name);
    history.push({
      pathname,
      search: urlSearchParams.toString(),
    });
  };

  const clearFilters = () => {
    const urlSearchParams = new URLSearchParams();
    setName('');
    history.push({
      pathname,
      search: urlSearchParams.toString(),
    });
  };

  return (
    <List>
      <ListItem>
        <Grid container spacing={2}>
          <Grid item xs={12} container>
            <TextField
              size="small"
              label="Nombre"
              name="name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <IconButton onClick={handleSearch}>
              <SearchIcon fontVariant={66} color="primary" />
            </IconButton>
            {!isEmpty(name) && (
              <IconButton onClick={clearFilters}>
                <RemoveCircleIcon fontVariant={66} />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </ListItem>
    </List>
  );
}
export default FiltersMedicineComponent;

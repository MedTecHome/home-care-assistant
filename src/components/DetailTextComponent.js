import React from 'react';
import Grid from '@material-ui/core/Grid';

function DetailTextComponent({ label, value }) {
  return (
    <>
      <Grid
        item
        xs={6}
        container
        justify="flex-end"
        alignContent="flex-end"
        style={{
          textAlign: 'right',
        }}
      >
        <strong>{`${label}:`}</strong>
      </Grid>
      <Grid item xs={6} container alignContent="flex-end">
        {value}
      </Grid>
    </>
  );
}

export default DetailTextComponent;

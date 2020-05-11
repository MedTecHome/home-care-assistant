import React from 'react';
import Grid from '@material-ui/core/Grid';

function DetailTextComponent({ label, value, xsLabel = 3, xsValue = 9 }) {
  return (
    <>
      <Grid
        item
        xs={xsLabel}
        container
        style={{
          textAlign: 'right'
        }}
      >
        <strong>{`${label}:`}</strong>
      </Grid>
      <Grid item xs={xsValue} container>
        {value}
      </Grid>
    </>
  );
}

export default DetailTextComponent;

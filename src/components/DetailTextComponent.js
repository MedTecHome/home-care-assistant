import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

function DetailTextComponent({ label, value, divider = false, spacing = 5 }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        borderBottom: divider ? '1px solid #ccc' : 'none',
        marginBottom: spacing
      }}
    >
      <Typography
        style={{
          minWidth: '34%',
          fontWeight: 600,
          textAlign: 'right'
        }}
      >{`${label}:`}</Typography>
      <Typography
        style={{
          width: '64%',
          alignSelf: 'flex-end'
        }}
      >
        {value}
      </Typography>
    </div>
  );
}

export default DetailTextComponent;

import React from 'react';
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
          maxWidth: '24%',
          fontWeight: 600,
          textAlign: 'right'
        }}
      >{`${label}`}</Typography>
      <Typography
        style={{
          width: '74%',
          alignSelf: 'flex-end'
        }}
      >
        {value}
      </Typography>
    </div>
  );
}

export default DetailTextComponent;

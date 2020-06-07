import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    borderBottom: props => (props.divider ? '1px solid #ccc' : 'none'),
    marginBottom: props => props.spacing
  },
  textLabel: {
    maxWidth: '24%',
    fontWeight: 600,
    textAlign: 'right'
  },
  textValue: {
    width: '74%',
    alignSelf: 'flex-end'
  }
});

function DetailTextComponent({ label, value, divider = false, spacing = 5 }) {
  const classes = useStyle({ divider, spacing });
  return (
    <div className={classes.root}>
      <Typography className={classes.textLabel}>{`${label}`}</Typography>
      <Typography className={classes.textValue}>{value}</Typography>
    </div>
  );
}

export default DetailTextComponent;

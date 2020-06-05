import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: '5%'
  }
});

function EmptyComponent() {
  const classes = useStyles();
  return <h2 className={classes.root}>No hay datos a mostrar</h2>;
}

export default EmptyComponent;

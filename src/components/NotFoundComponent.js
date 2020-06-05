import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: '5%'
  }
});

function NotFoundComponent() {
  const classes = useStyles();
  return <h2 className={classes.root}>Pagina no encontrada</h2>;
}

export default NotFoundComponent;

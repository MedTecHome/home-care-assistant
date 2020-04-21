import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  spinner: {
    minHeight: 50,
    width: '100%',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
  },
});

export default function CircularProgressComponent() {
  const classes = useStyles();
  return (
    <div className={classes.spinner}>
      <CircularProgress size={25} />
    </div>
  );
}

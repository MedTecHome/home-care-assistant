import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  loginFormTitle: {
    color: '#666',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default function AuthFormsTitle({ title }) {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Typography className={classes.loginFormTitle} variant="subtitle1">
        {title}
      </Typography>
    </Grid>
  );
}

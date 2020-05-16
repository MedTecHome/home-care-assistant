import React from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  errorMessage: {
    marginBottom: 10
  }
});

export default function ErrorMessageComponent({ errorState }) {
  const classes = useStyles();
  return (
    <div className={classes.errorMessage}>
      {errorState && (
        <Alert severity="message" variant="filled">
          <AlertTitle>Error</AlertTitle>
          {errorState && errorState.message}
        </Alert>
      )}
    </div>
  );
}

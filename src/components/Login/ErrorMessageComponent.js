import React, { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { makeStyles } from '@material-ui/core/styles';
import { getPropValue } from '../../helpers/utils';

const useStyles = makeStyles({
  errorMessage: {
    marginBottom: 10
  },
  errorMessageContent: {
    textAlign: 'justify',
    wordBreak: 'break-all'
  }
});

export default function ErrorMessageComponent({ error }) {
  const classes = useStyles();
  const [errorDetail, setErrorDetail] = useState('');

  useEffect(() => {
    setErrorDetail(getPropValue(error, 'message'));
    const timeOute = setTimeout(() => {
      setErrorDetail('');
    }, 100000000);
    return () => {
      clearTimeout(timeOute);
    };
  }, [error]);

  return (
    <div className={classes.errorMessage}>
      {errorDetail && (
        <Alert severity="error" variant="filled">
          <AlertTitle>Error</AlertTitle>
          <div className={classes.errorMessageContent}>{errorDetail}</div>
        </Alert>
      )}
    </div>
  );
}

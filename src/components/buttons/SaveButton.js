import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

function SaveButton({ submitting, pristine, invalid }) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Button
        disabled={submitting || pristine || invalid}
        disableElevation
        variant="contained"
        type="submit"
        color="primary"
      >
        guardar
      </Button>
      {submitting && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  );
}

export default SaveButton;

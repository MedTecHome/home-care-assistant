import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  fieldset: {
    border: '1px solid #ccc',
    borderRadius: 2,
    padding: 15
  },
  legend: {
    paddingRight: 10,
    paddingLeft: 10
  }
});

function Fieldset({ title, children }) {
  const classes = useStyles();
  return (
    <fieldset className={classes.fieldset}>
      <legend className={classes.legend}>{title}</legend>
      {children}
    </fieldset>
  );
}
export default Fieldset;

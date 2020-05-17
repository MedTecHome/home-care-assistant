import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  fieldset: {
    border: 'none',
    borderTop: '1px solid #ccc',
    borderRadius: 2,
    padding: 20,
    paddingTop: props => props.paddingTop
  },
  legend: {
    paddingRight: 10,
    paddingLeft: 10
  }
});

function Fieldset({ title, children, paddingTop = 20 }) {
  const classes = useStyles({ paddingTop });
  return (
    <fieldset className={classes.fieldset}>
      <legend className={classes.legend}>{title}</legend>
      {children}
    </fieldset>
  );
}
export default Fieldset;

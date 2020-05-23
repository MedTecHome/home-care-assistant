import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  fieldset: {
    height: '100%',
    border: props => (props.bordered ? '1px solid #ccc' : 'none'),
    borderTop: '1px solid #ccc',
    borderRadius: 2,
    padding: props => props.padding,
    paddingTop: props => props.paddingTop
  },
  legend: {
    paddingRight: 10,
    paddingLeft: 10
  }
});

function Fieldset({ title, children, paddingTop, padding = 5, bordered = true }) {
  const classes = useStyles({ padding, paddingTop, bordered });
  return (
    <fieldset className={classes.fieldset}>
      <legend className={classes.legend}>{title}</legend>
      {children}
    </fieldset>
  );
}
export default Fieldset;

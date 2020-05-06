import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import useCustomStyles from '../../jss/globalStyles';

function FiltersTratmentComponent() {
  const classes = useCustomStyles();

  return <FormControl className={classes.formControl} />;
}

export default FiltersTratmentComponent;

import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import useCustomStyles from '../../jss/globalStyles';

function FiltersTreatmentComponent() {
  const classes = useCustomStyles();

  return <FormControl className={classes.formControl} />;
}

export default FiltersTreatmentComponent;

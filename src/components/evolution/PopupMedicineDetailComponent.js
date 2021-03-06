import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core';
import PopoverComponent from '../containers/PopoverComponent';
import { DetailsContentMedicineComponent } from '../Medicines/forms/DetailsMedicineComponent';
import { getPropValue } from '../../helpers/utils';

const useStyles = makeStyles({
  contentDetail: {
    width: 300
  }
});

function PopupTreatmentDetailComponent({ data }) {
  const classes = useStyles();
  return (
    <PopoverComponent
      title={getPropValue(data, 'frequency')}
      content={<DetailsContentMedicineComponent data={data} classes={classes} />}
    />
  );
}

export default memo(PopupTreatmentDetailComponent);

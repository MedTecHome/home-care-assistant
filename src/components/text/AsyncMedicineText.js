import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { getMedicineById } from '../../services/medicines';
import { getPropValue } from '../../helpers/utils';
import useCustomStyles from '../../jss/globalStyles';

function AsyncMedicineText({ id, field = 'name' }) {
  const [detail, setDetailt] = useState({});
  const classes = useCustomStyles();
  useEffect(() => {
    getMedicineById(id).then(result => {
      setDetailt(result);
    });
  }, [id]);
  return (
    <Typography className={field === 'name' ? classes.textUpperCase : {}}>{getPropValue(detail, field)}</Typography>
  );
}

export default AsyncMedicineText;

import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { getMedicineById } from '../../services/medicines';
import { getPropValue } from '../../helpers/utils';

function AsyncMedicineText({ id, field = 'name' }) {
  const [detail, setDetailt] = useState({});
  useEffect(() => {
    getMedicineById(id).then(result => {
      setDetailt(result);
    });
  }, [id]);
  return <Typography>{getPropValue(detail, field)}</Typography>;
}

export default AsyncMedicineText;

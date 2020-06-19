import React, { useState, useEffect, useRef } from 'react';
import { Typography } from '@material-ui/core';
import { getMedicineById } from '../../services/medicines';
import { getPropValue } from '../../helpers/utils';

function AsyncMedicineText({ id, field = 'name' }) {
  const [detail, setDetailt] = useState({});
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    getMedicineById(id).then(result => {
      if (mounted.current) setDetailt(result);
    });

    return () => {
      mounted.current = false;
    };
  }, [id]);
  return <Typography>{getPropValue(detail, field)}</Typography>;
}

export default AsyncMedicineText;

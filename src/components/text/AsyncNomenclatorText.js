import React, { useEffect, useState, useRef } from 'react';
import { Typography, CircularProgress, makeStyles } from '@material-ui/core';
import { getPropValue } from '../../helpers/utils';
import getNomenclator from '../../services/nomenclators';

const useStyles = makeStyles({
  circularProgress: {
    verticalAlign: 'middle'
  }
});

function GenericAsyncNomenclator({ id, nomenclator }) {
  const [detail, setDetail] = useState({});
  const mounted = useRef(true);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (id && nomenclator) {
      setLoading(true);
      mounted.current = true;
      getNomenclator(nomenclator, id)
        .then(result => {
          if (mounted.current) {
            setDetail(result);
            setLoading(false);
          }
        })
        // eslint-disable-next-line no-console
        .catch(console.log)
        .finally(() => {
          if (mounted.current) {
            setLoading(false);
          }
        });
    }
    return () => {
      mounted.current = false;
    };
  }, [id, nomenclator]);

  if (loading) return <CircularProgress className={classes.circularProgress} size={14} />;

  return (
    <Typography component="span">
      {` ${
        getPropValue(detail, 'measure') ||
        getPropValue(detail, 'abbreviation') ||
        getPropValue(detail, 'name') ||
        (nomenclator === 'administrationroute' && '-') ||
        '-'
      }`}
    </Typography>
  );
}

export default GenericAsyncNomenclator;

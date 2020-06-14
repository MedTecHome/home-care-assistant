import React, { useEffect, useState, useRef } from 'react';
import { Typography } from '@material-ui/core';
import { getPropValue } from '../../helpers/utils';
import getNomenclator from '../../services/nomenclators';

export function AsyncAdministrationroute({ id }) {
  const [detail, setDetail] = useState({});
  const mounted = useRef(true);

  useEffect(() => {
    getNomenclator('administrationroute', id).then(result => {
      if (mounted.current) setDetail(result);
    });
    return () => {
      mounted.current = false;
    };
  }, [id, setDetail]);

  return <Typography component="span">{` ${getPropValue(detail, 'name') || ''}`}</Typography>;
}

export function AsyncDosis({ id }) {
  const [detail, setDetail] = useState({});
  const mounted = useRef(true);

  useEffect(() => {
    getNomenclator('dosis', id).then(result => {
      if (mounted.current) setDetail(result);
    });
    return () => {
      mounted.current = false;
    };
  }, [id, setDetail]);

  return (
    <Typography component="span">
      {` ${getPropValue(detail, 'abbreviation') || getPropValue(detail, 'name') || ''}`}
    </Typography>
  );
}

export function AsyncConcentration({ id }) {
  const [detail, setDetail] = useState({});
  const mounted = useRef(true);

  useEffect(() => {
    getNomenclator('concentrations', id).then(result => {
      if (mounted.current) setDetail(result);
    });
    return () => {
      mounted.current = false;
    };
  }, [id, setDetail]);

  return (
    <Typography component="span">{` ${
      getPropValue(detail, 'measure') || getPropValue(detail, 'name') || ''
    }`}</Typography>
  );
}

export function AsyncShedule({ id }) {
  const [detail, setDetail] = useState({});
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    getNomenclator('shedules', id).then(result => {
      if (mounted.current) setDetail(result);
    });
    return () => {
      mounted.current = false;
    };
  }, [id, setDetail]);

  return <Typography component="span"> {` ${getPropValue(detail, 'name') || ''}`}</Typography>;
}

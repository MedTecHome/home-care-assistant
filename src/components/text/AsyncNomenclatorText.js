import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { getPropValue } from '../../helpers/utils';
import getNomenclator from '../../services/nomenclators';

export function AsyncAdministrationroute({ id }) {
  const [detail, setDetail] = useState({});
  useEffect(() => {
    getNomenclator('administrationroute', id).then(result => {
      setDetail(result);
    });
  }, [id, setDetail]);
  return <Typography component="span">{` ${getPropValue(detail, 'name') || ''}`}</Typography>;
}

export function AsyncDosis({ id }) {
  const [detail, setDetail] = useState({});
  useEffect(() => {
    getNomenclator('dosis', id).then(result => {
      setDetail(result);
    });
  }, [id, setDetail]);
  return (
    <Typography component="span">
      {` ${getPropValue(detail, 'abbreviation') || getPropValue(detail, 'name') || ''}`}
    </Typography>
  );
}

export function AsyncConcentration({ id }) {
  const [detail, setDetail] = useState({});
  useEffect(() => {
    getNomenclator('concentrations', id).then(result => {
      setDetail(result);
    });
  }, [id, setDetail]);
  return (
    <Typography component="span">{` ${
      getPropValue(detail, 'measure') || getPropValue(detail, 'name') || ''
    }`}</Typography>
  );
}

export function AsyncShedule({ id }) {
  const [detail, setDetail] = useState({});
  useEffect(() => {
    getNomenclator('shedules', id).then(result => {
      setDetail(result);
    });
  }, [id, setDetail]);
  return <Typography component="span"> {` ${getPropValue(detail, 'name') || ''}`}</Typography>;
}

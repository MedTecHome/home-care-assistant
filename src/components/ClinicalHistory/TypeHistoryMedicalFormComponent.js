import React, { memo } from 'react';
import { useMediaQuery } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { getPropValue } from '../../helpers/utils';
import useCustomStyles from '../../jss/globalStyles';

function TextLabelAndValue({ label, value }) {
  const classes = useCustomStyles();
  return (
    <div>
      <span className={classes.textLabel}>{`${label}: `}</span>
      {value}
    </div>
  );
}

function ListItemTextComponent({ one, two }) {
  const classes = useCustomStyles();
  const match700 = useMediaQuery(theme => theme.breakpoints.down(700));
  const match900 = useMediaQuery(theme => theme.breakpoints.down(900));
  return (
    <>
      <Grid item xs={8} container spacing={1} className={classes.extraText}>
        {!match700 && (
          <Grid item xs={12}>
            {one}
          </Grid>
        )}
        {!match900 && (
          <Grid item xs={12}>
            {two}
          </Grid>
        )}
      </Grid>
    </>
  );
}

function TypeHistoryMedicalFormComponent({ data }) {
  const idType = getPropValue(data, 'type.id');
  return (
    <>
      {idType === 'pressure' && (
        <ListItemTextComponent
          one={<TextLabelAndValue label="Sistolica" value={data.sistolica || ' - '} />}
          two={<TextLabelAndValue label="Diastolica" value={data.diastolica || ' - '} />}
        />
      )}
      {idType === 'temperature' && (
        <ListItemTextComponent one={<TextLabelAndValue label="Grados" value={`${data.celsiusDegree || '-'}℃`} />} />
      )}
      {idType === 'weight' && (
        <ListItemTextComponent one={<TextLabelAndValue label="Peso" value={`${data.weight || '-'}kg`} />} />
      )}
      {idType === 'glucose' && (
        <ListItemTextComponent
          one={<TextLabelAndValue label="Concentración azucar" value={data.sugarConcentration || ' - '} />}
          two={<TextLabelAndValue label="Unidad Glucosa" value={data.glucoseUnity || ' - '} />}
        />
      )}
      {idType === 'breathing' && (
        <ListItemTextComponent
          one={<TextLabelAndValue label="EtCO" value={`${data.EtCO || '-'}mmHg`} />}
          two={<TextLabelAndValue label="PI" value={`${data.breathingPI || '-'}%`} />}
        />
      )}
      {idType === 'inr' && <ListItemTextComponent one={<TextLabelAndValue label="INR" value={`${data.INR}`} />} />}
      {idType === 'oxygen' && (
        <ListItemTextComponent
          one={<TextLabelAndValue label="Pulso" value={`${data.heartbeat || '-'}LPM`} />}
          two={<TextLabelAndValue label="SpO2" value={`${data.SpO2 || '-'}%`} />}
        />
      )}
      {idType === 'exercises' && (
        <ListItemTextComponent
          one={<TextLabelAndValue label="Distancia" value={`${data.distance || '-'}m`} />}
          two={<TextLabelAndValue label="Tiempo" value={`${data.time || '-'}min`} />}
        />
      )}
      {idType === 'others' && (
        <ListItemTextComponent
          one={<TextLabelAndValue label="Severidad" value={getPropValue(data, 'severity.name')} />}
        />
      )}
    </>
  );
}
export default memo(TypeHistoryMedicalFormComponent);

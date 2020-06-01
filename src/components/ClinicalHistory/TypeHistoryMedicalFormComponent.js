import React, { memo } from 'react';
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

function TypeHistoryMedicalFormComponent({ data }) {
  const idType = getPropValue(data, 'type.id');
  return (
    <>
      {idType === 'pressure' && (
        <>
          <TextLabelAndValue label="Sistólica" value={data.sistolica || ' - '} />
          <TextLabelAndValue label="Diastolica" value={data.diastolica || ' - '} />
          <TextLabelAndValue label="Frecuencia Cardiaca" value={data.heartrate || ' - '} />
        </>
      )}
      {idType === 'temperature' && <TextLabelAndValue label="Grados" value={`${data.celsiusDegree || '-'}℃`} />}
      {idType === 'weight' && <TextLabelAndValue label="Peso" value={`${data.weight || '-'}kg`} />}
      {idType === 'glucose' && (
        <>
          <TextLabelAndValue
            label="Concentración azucar"
            value={`${data.sugarConcentration}${data.glucoseUnity}` || ' - '}
          />
        </>
      )}
      {idType === 'breathing' && (
        <>
          <TextLabelAndValue label="EtCO" value={`${data.EtCO || '-'}mmHg`} />
          <TextLabelAndValue label="PI" value={`${data.breathingPI || '-'}%`} />
        </>
      )}
      {idType === 'inr' && <TextLabelAndValue label="INR" value={`${data.INR}`} />}
      {idType === 'oxygen' && (
        <>
          <TextLabelAndValue label="Pulso" value={`${data.heartbeat || '-'}LPM`} />
          <TextLabelAndValue label="SpO2" value={`${data.SpO2 || '-'}%`} />
        </>
      )}
      {idType === 'exercises' && (
        <>
          <TextLabelAndValue label="Distancia" value={`${data.distance || '-'}m`} />
          <TextLabelAndValue label="Tiempo" value={`${data.time || '-'}min`} />
        </>
      )}
      {idType === 'others' && <TextLabelAndValue label="Severidad" value={getPropValue(data, 'severity.name')} />}
    </>
  );
}
export default memo(TypeHistoryMedicalFormComponent);

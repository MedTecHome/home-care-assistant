import { testFormsNames } from '../../helpers/constants';
import { getPropValue } from '../../helpers/utils';

const headMonitoringCells = [
  {
    id: 'name',
    numeric: false,
    label: 'Nombre y  Apellidos'
  },
  {
    id: 'latestDate',
    numeric: true,
    label: 'Fecha'
  },
  {
    id: 'age',
    numeric: true,
    label: 'Edad(años)'
  },
  {
    id: 'pressure',
    numeric: true,
    label: `${getPropValue(
      testFormsNames.find(tf => tf.id === 'pressure'),
      'name'
    )}`
  },
  {
    id: 'oxygen',
    numeric: true,
    label: 'Frecuencia Cardiaca(LPM)'
  },
  {
    id: 'weight',
    numeric: true,
    label: `${getPropValue(
      testFormsNames.find(tf => tf.id === 'weight'),
      'name'
    )}(kg)`
  },
  {
    id: 'glucose',
    numeric: true,
    label: `${getPropValue(
      testFormsNames.find(tf => tf.id === 'glucose'),
      'name'
    )}`
  },
  {
    id: 'temperature',
    numeric: true,
    label: `${getPropValue(
      testFormsNames.find(tf => tf.id === 'temperature'),
      'name'
    )} (°C)`
  },
  {
    id: 'exercises',
    numeric: true,
    label: `${getPropValue(
      testFormsNames.find(tf => tf.id === 'exercises'),
      'name'
    )}(pasos)`
  },
  {
    id: 'inr',
    numeric: true,
    label: `${getPropValue(
      testFormsNames.find(tf => tf.id === 'inr'),
      'name'
    )}`
  }
];

export default headMonitoringCells;

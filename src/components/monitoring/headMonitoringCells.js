const headMonitoringCells = [
  {
    id: 'user.fullname',
    numeric: false,
    label: 'Nombre y  Apellidos'
  },
  {
    id: 'user.age',
    numeric: true,
    label: 'Edad(años)'
  },
  {
    id: 'latestDate',
    numeric: true,
    label: 'Fecha'
  },
  {
    id: 'pressure',
    numeric: true,
    label: 'Presión'
  },
  {
    id: 'oxygen.heartbeat',
    numeric: true,
    label: 'Pulso(LPM)'
  },
  {
    id: 'weight.weight',
    numeric: true,
    label: 'Peso(kg)'
  },
  {
    id: 'glucose.sugarConcentration',
    numeric: true,
    label: 'Glucosa'
  },
  {
    id: 'temperature.celsiusDegree',
    numeric: true,
    label: 'Temperatura(℃)'
  },
  {
    id: 'exercises.steps',
    numeric: true,
    label: 'Actividad(pasos)'
  },
  {
    id: 'inr.INR',
    numeric: true,
    label: 'INR'
  }
];

export default headMonitoringCells;

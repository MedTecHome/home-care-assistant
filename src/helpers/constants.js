import { compareStringTagName } from './utils';

export const testFormsNames = [
  {
    id: 'pressure',
    name: 'Tensión Arterial'
  },
  {
    id: 'heartrate',
    name: 'Frecuencia Cardiaca'
  },
  { id: 'temperature', name: 'Temperatura' },
  { id: 'glucose', name: 'Glucosa' },
  { id: 'weight', name: 'Peso Coporal' },
  { id: 'breathing', name: 'Respiración (Capnometría)' },
  { id: 'inr', name: 'Coagulación(INR)' },
  { id: 'oxygen', name: 'Oximetría Pulso (SpO2)' },
  { id: 'exercises', name: 'Actividad Física' },
  { id: 'otherstest', name: 'Prueba general' }
].sort(compareStringTagName);

export const PrincipalFieldsTests = {
  diastolica: 'Diastólica',
  sistolica: 'Sistólica',
  heartrate: 'Frecuencia Cardiaca (LPM)',
  celsiusDegree: 'Temperatura (C)',
  weight: 'Pesos (Kg)',
  sugarConcentration: 'Concentracion de azúcar',
  breathingFrecuency: 'Frecuencia respiratoria (RPM)',
  INR: 'INR (%)',
  heartbeat: 'Pulso(LPM)',
  steps: 'Pasos',
  severity: 'Severidad'
};

export const genders = [
  {
    id: 'male',
    name: 'Masculino'
  },
  { id: 'female', name: 'Femenino' }
];

export const intakeTimeSource = [
  {
    id: 'beforeEat',
    name: 'Antes de comer'
  },
  {
    id: 'afterEat',
    name: 'Después de comer'
  },
  {
    id: 'speedDial',
    name: 'Marcación rápida'
  }
];

export const severityConstant = [
  {
    id: 'nulo',
    name: 'Nulo'
  },
  {
    id: 'leve',
    name: 'Leve'
  },
  {
    id: 'noImprovement',
    name: 'Sin mejora'
  },
  { id: 'verySerious', name: ' Muy severo' }
];

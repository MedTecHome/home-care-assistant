const optionsTypesFormsPatientHealth = [
  { name: 'Presion', id: 'pressure' },
  { name: 'Temperatura', id: 'temperature' },
  { name: 'Peso', id: 'weight' },
  { name: 'Glucosa', id: 'glucose' },
  { name: 'Respiracion', id: 'breathing' },
  { name: 'Oxígeno', id: 'oxygeno' },
  { name: 'INR', id: 'inr' },
  { name: 'Pulso', id: 'heartbeat' },
];

export default optionsTypesFormsPatientHealth;

export const findByIdePatientMedicalForm = value => optionsTypesFormsPatientHealth.find(op => op.id === value) || {};

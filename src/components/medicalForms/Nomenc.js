const optionsTypesFormsPatientHealth = [
  { name: 'Presion', id: 'pressure' },
  { name: 'Temperatura', id: 'temperature' },
  { name: 'Peso', id: 'weight' },
  { name: 'Glucosa', id: 'glucose' },
  { name: 'Respiracion', id: 'breathing' },
  { name: 'INR', id: 'inr' },
  { name: 'Oxigeno', id: 'oxygen' },
  { name: 'Actividad fisica', id: 'exercises' },
];

export default optionsTypesFormsPatientHealth;

export const findByIdePatientMedicalForm = value => optionsTypesFormsPatientHealth.find(op => op.id === value) || {};

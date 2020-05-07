import { dbRef } from '../firebaseConfig';

const NomenclatorsRef = dbRef('nomenclators').collection('medicalforms');

export const getMedicalFormById = async id => {
  let result = null;
  result = await NomenclatorsRef.doc(id).get();
  if (!result.data()) return result;
  return { id: result.id, ...result.data() };
};

export const getListMedicalForms = async () => {
  return (await NomenclatorsRef.get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data() }));
};

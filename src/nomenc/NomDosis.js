import { dbRef } from '../firebaseConfig';

const NomenclatorsRef = dbRef('nomenclators').collection('dosis');

export const getDosisById = async id => {
  let result = null;
  result = await NomenclatorsRef.doc(id).get();
  if (!result.data()) return result;
  return { id: result.id, ...result.data() };
};

export const getListDosis = async () => {
  return (await NomenclatorsRef.get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data() }));
};

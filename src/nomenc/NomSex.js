import { dbRef } from '../firebaseConfig';

const NomenclatorsRef = dbRef('nomenclators').collection('sex');

export const getSexById = async id => {
  let result = null;
  result = await NomenclatorsRef.doc(id).get();
  if (!result.data()) return result;
  return { id: result.id, ...result.data() };
};

export const getLisSex = async () => {
  return (await NomenclatorsRef.get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data() }));
};

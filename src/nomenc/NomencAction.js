import { dbRef } from '../firebaseConfig';

export const getNomById = nomenclator => async id => {
  const NomenclatorsRef = dbRef('nomenclators').collection(nomenclator);
  let result = null;
  result = await NomenclatorsRef.doc(id).get();
  if (!result.data()) return result;
  return { id: result.id, ...result.data() };
};

export const getNomList = nomenclator => async () => {
  const NomenclatorsRef = dbRef('nomenclators').collection(nomenclator);
  return (await NomenclatorsRef.get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data() }));
};

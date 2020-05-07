import { dbRef } from '../firebaseConfig';

const NomenclatorsRef = dbRef('nomenclators').collection('administrationroute');

export const getAdministrationRouteById = async id => {
  let result = null;
  result = await NomenclatorsRef.doc(id).get();
  if (!result.data()) return result;
  return { id: result.id, ...result.data() };
};

export const getListAdministrationRoute = async () => {
  return (await NomenclatorsRef.get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data() }));
};

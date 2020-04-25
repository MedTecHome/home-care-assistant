import { dbRef } from '../../../../firebaseConfig';

const rolesRef = dbRef('role');
export const getRolesAction = () => rolesRef.collection('roles');

export const getRoleByIdAction = async id => {
  const ref = await rolesRef.collection('roles').doc(id).get();
  return { id: ref.id, ...ref.data() };
};

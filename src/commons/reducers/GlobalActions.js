import { SET_MODAL_VISIBLE, SET_ROLES, UNSUSBCRIBE_FROM_ALL } from '../globalText';
import { dbRef } from '../../firebaseConfig';

const rolesRef = dbRef('role');
export const setModalVisibleAction = (flag, formType) => ({
  type: SET_MODAL_VISIBLE,
  flag,
  formType,
});

export const setUnsubscriptionAction = unsubscription => ({
  type: UNSUSBCRIBE_FROM_ALL,
  unsubscription,
});

export const setRolesAction = roles => ({
  type: SET_ROLES,
  roles,
});

export const getRolesAction = () => rolesRef.collection('roles');

export const getRoleById = id => rolesRef.collection('roles').doc(id);

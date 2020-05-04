// import uuid from 'uuid4';
import { isEmpty } from 'ramda';
import { authFirebase, dbRef } from '../../../firebaseConfig';
import {
  LIST_PROFILES,
  LIST_PROFILES_LOADING,
  SELECTED_PROFILE,
  ADD_FORM_TEXT,
  EDIT_FORM_TEXT,
  DELETE_FORM_TEXT,
  LIST_PROFILES_NOMENCLADOR,
} from '../../../commons/globalText';

const actionCodeSettings = {
  url: 'http://localhost:3000/inicio',
  handleCodeInApp: true,
};

const profilesRef = dbRef('profile');

export const setListProfilesAction = list => ({
  type: LIST_PROFILES,
  list,
});

export const getDoctorsNomencladorAction = list => ({
  type: LIST_PROFILES_NOMENCLADOR,
  list,
});

export const setProfileListLoadingAction = flag => ({
  type: LIST_PROFILES_LOADING,
  flag,
});

export const setProfileSelected = selected => ({
  type: SELECTED_PROFILE,
  selected,
});

export const getRefProfiles = async ({ filters }) => {
  let ref = profilesRef.collection('profiles');
  if (filters) {
    Object.keys(filters).map(k => {
      ref = ref.where(k, '==', filters[k]);
      return null;
    });
  }
  return (await ref.get()).docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getDoctorsListAction = async ({ filters }) => {
  return getRefProfiles({ filters: { 'role.id': 'doctor', ...filters } });
};

export const getProfileByIdAction = async (id, fields = []) => {
  const ref = await getRefProfiles().doc(id).get();
  const data = fields.map(k => ({ [k]: ref.data()[k] })).reduce((a, b) => ({ ...a, ...b }), {});
  return { id: ref.id, ...(isEmpty(fields) ? ref.data() : data) };
};

export const saveProfileValuesAction = async ({ id, email, ...values }, formType) => {
  const ref = profilesRef.collection('profiles');
  if (formType === ADD_FORM_TEXT) {
    try {
      // const user = await authFirebase.createUserWithEmailAndPassword(email, uuid());
      const user = await authFirebase.createUserWithEmailAndPassword(email, 'Test*123');
      await authFirebase.sendPasswordResetEmail(user.user.email, actionCodeSettings);
      return ref.add({
        ...values,
        user: { id: user.user.uid, email: user.user.email },
        fullname: `${values.name} ${values.lastName}`,
        createdAt: Date.now(),
      });
    } catch (e) {
      // handle error
    }
  }
  if (formType === EDIT_FORM_TEXT) {
    return ref.doc(id).update({
      ...values,
      fullname: `${values.name} ${values.lastName}`,
      updatedAt: Date.now(),
    });
  }
  if (formType === DELETE_FORM_TEXT) {
    return ref.doc(id).delete();
  }
  return Promise;
};

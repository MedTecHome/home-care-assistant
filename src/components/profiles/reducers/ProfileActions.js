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

const profilesRef = dbRef('profile').collection('profiles');

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

export const getProfilesAction = async ({ filters }) => {
  let ref = profilesRef;
  if (filters) {
    Object.keys(filters).map(k => {
      if (k === 'fullname') {
        ref = ref.where(k, '>=', filters[k]).where(k, '<=', `${filters[k]}\uf8ff`);
      } else {
        ref = ref.where(k, '==', filters[k]);
      }
      return null;
    });
  }
  return (await ref.get()).docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProfileByIdAction = async (id, fields = []) => {
  const ref = await profilesRef.doc(id).get();
  const data = fields.map(k => ({ [k]: ref.data()[k] })).reduce((a, b) => ({ ...a, ...b }), {});
  return { id: ref.id, ...(isEmpty(fields) ? ref.data() : data) };
};

export const saveProfileValuesAction = async ({ id, email, ...values }, formType) => {
  if (formType === ADD_FORM_TEXT) {
    try {
      // const user = await authFirebase.createUserWithEmailAndPassword(email, uuid());
      const user = await authFirebase.createUserWithEmailAndPassword(email, 'Test*123');
      await authFirebase.sendPasswordResetEmail(user.user.email, actionCodeSettings);
      return profilesRef.add({
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
    return profilesRef.doc(id).update({
      ...values,
      fullname: `${values.name} ${values.lastName}`,
      updatedAt: Date.now(),
    });
  }
  if (formType === DELETE_FORM_TEXT) {
    return profilesRef.doc(id).delete();
  }
  return Promise;
};

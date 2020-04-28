import uuid from 'uuid4';
import { authFirebase, dbRef } from '../../../firebaseConfig';
import {
  LIST_PROFILES,
  LIST_PROFILES_LOADING,
  SAVE_PROFILES_LOADING,
  SELECTED_PROFILE,
  ADD_FORM_TEXT,
  EDIT_FORM_TEXT,
  DELETE_FORM_TEXT,
  LIST_PROFILES_NOMENCLADOR,
} from '../../../commons/globalText';

// import { apiData } from '../../../axiosApiRequest';

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

export const setProfilesSaveLoadingAction = flag => ({
  type: SAVE_PROFILES_LOADING,
  flag,
});

export const setProfileSelected = selected => ({
  type: SELECTED_PROFILE,
  selected,
});

export const getRefProfiles = () => profilesRef.collection('profiles');

// eslint-disable-next-line no-unused-vars
export const getDoctorsListAction = async ({ filters }) => {
  const ref = getRefProfiles().where('role.id', '==', 'doctor');
  return (await ref.get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data() }));
};

export const getDoctorByIdAction = async id => {
  const ref = await getRefProfiles().doc(id).get();
  return { id: ref.id, ...ref.data() };
};

export const saveProfileValuesAction = async ({ id, email, ...values }, formType) => {
  const ref = profilesRef.collection('profiles');

  if (formType === ADD_FORM_TEXT) {
    try {
      const user = await authFirebase.createUserWithEmailAndPassword(email, uuid());
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

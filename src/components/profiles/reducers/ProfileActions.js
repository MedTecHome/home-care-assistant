import { dbRef } from '../../../firebaseConfig';
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

export const saveProfileValuesAction = ({ id, ...values }, formType) => {
  const ref = profilesRef.collection('profiles');

  if (formType === ADD_FORM_TEXT) {
    return ref.add({
      ...values,
      fullname: `${values.name} ${values.lastName}`,
      createdAt: Date.now(),
    });
  }
  if (formType === EDIT_FORM_TEXT) {
    return ref.doc(id).update({
      ...values,
      fullname: `${values.name} ${values.lastName}`,
      updateAt: Date.now(),
    });
  }
  if (formType === DELETE_FORM_TEXT) {
    return ref.doc(id).delete();
  }
  return Promise;
};

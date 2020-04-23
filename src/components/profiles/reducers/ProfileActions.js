import firebase, { dbRef } from '../../../firebaseConfig';
import {
  LIST_PROFILES,
  LIST_PROFILES_LOADING,
  SAVE_PROFILES_LOADING,
  SET_PROFILE_HOSPITAL,
  SET_PROFILE_DOCTOR,
  SET_PROFILE_USER,
  SELECTED_PROFILE,
  ADD_FORM_TEXT,
  EDIT_FORM_TEXT,
  DELETE_FORM_TEXT,
  SET_PROFILE_ROLE,
  LIST_PROFILES_NOMENCLADOR,
} from '../../../commons/globalText';

const profilesRef = dbRef('profile');

export const setListProfilesAction = list => ({
  type: LIST_PROFILES,
  list,
});

export const setListProfilesNomencladorAction = list => ({
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

export const setProfilesUserAction = user => ({
  type: SET_PROFILE_USER,
  user,
});

export const setProfilesDoctorAction = doctor => ({
  type: SET_PROFILE_DOCTOR,
  doctor,
});

export const setProfilesHospitalAction = hospital => ({
  type: SET_PROFILE_HOSPITAL,
  hospital,
});

export const setProfilesRoleAction = role => ({
  type: SET_PROFILE_ROLE,
  role,
});

export const setProfileSelected = selected => ({
  type: SELECTED_PROFILE,
  selected,
});

export const getRefProfiles = () => profilesRef.collection('profiles');

export const getDoctorById = id => profilesRef.collection('profiles').doc(id);

export const saveProfileValuesAction = ({ id, ...values }, formType) => {
  const ref = profilesRef.collection('profiles');
  if (formType === ADD_FORM_TEXT) {
    return ref.add({ ...values, fullname: `${values.name} ${values.lastName}`, createdAt: Date.now() });
  }
  if (formType === EDIT_FORM_TEXT) {
    return ref.doc(id).update({ ...values, fullname: `${values.name} ${values.lastName}`, updateAt: Date.now() });
  }
  if (formType === DELETE_FORM_TEXT) {
    return ref.doc(id).delete();
  }
  return Promise;
};

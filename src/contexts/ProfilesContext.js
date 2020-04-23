import React, { createContext, useCallback, useContext, useReducer } from 'react';
import { isEmpty } from 'ramda';
import { initialProfilesState, ProfilesReducer } from '../components/profiles/reducers/ProfileReducer';
import { GlobalReducer, initialGlobalState } from '../commons/reducers/GlobalReducers';
import {
  getDoctorById,
  getRefProfiles,
  saveProfileValuesAction,
  setListProfilesAction,
  setProfileListLoadingAction,
  setProfilesDoctorAction,
  setProfileSelected,
  setProfilesHospitalAction,
  setProfilesRoleAction,
  setProfilesSaveLoadingAction,
} from '../components/profiles/reducers/ProfileActions';
import { getHospitalDetailsAction, saveHospitalValuesAction } from '../components/hospital/reducers/HospitalActions';
import { getRoleById, setModalVisibleAction } from '../commons/reducers/GlobalActions';

const ProfilesContext = createContext({});

export const withProfileContext = WrapperComponent => () => {
  const [state, dispatch] = useReducer(ProfilesReducer, initialProfilesState, init => init);
  const [globalState, globalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);

  const getProfilesList = useCallback(({ limit = 5, next, prev, filters }) => {
    dispatch(setProfileListLoadingAction(true));
    let ref = getRefProfiles().orderBy('name');

    if (filters) {
    } else if (next) {
      ref = ref.startAfter(next.name).limit(limit);
    } else if (prev) {
      ref = ref.endBefore(prev.name).limitToLast(limit);
    } else {
      ref = ref.limit(limit);
    }

    ref.onSnapshot(snapshot => {
      const result = snapshot.docChanges().map(({ doc }) => {
        if (doc.data().userId) {
          console.log(doc.data().userId);
        }
        if (doc.data().doctorId) {
          getDoctorById(doc.data().doctorId).onSnapshot(doctor => {
            dispatch(setProfilesDoctorAction({ id: doctor.id, ...doctor.data() }));
          });
        }
        if (doc.data().hospitalId) {
          getHospitalDetailsAction(doc.data().hospitalId).onSnapshot(hospital => {
            dispatch(setProfilesHospitalAction({ id: hospital.id, ...hospital.data() }));
          });
        }
        if (doc.data().roleId) {
          getRoleById(doc.data().roleId).onSnapshot(role => {
            dispatch(setProfilesRoleAction({ id: role.id, ...role.data() }));
          });
        }
        return { id: doc.id, ...doc.data() };
      });
      dispatch(setListProfilesAction(result));
      dispatch(setProfileListLoadingAction(false));
    });
  }, []);

  const saveProfileValues = useCallback((values, formType) => {
    dispatch(setProfilesSaveLoadingAction(true));
    saveProfileValuesAction(values, formType)
      .then(result => {
        console.log(result);
      })
      .catch(console.error);
  }, []);

  const selectProfileFromList = useCallback(selected => dispatch(setProfileSelected(selected)), []);

  const setModalVisible = useCallback(
    (visible, formType) => globalDispatch(setModalVisibleAction(visible, formType)),
    []
  );

  return (
    <ProfilesContext.Provider
      value={{
        ...state,
        ...globalState,
        getProfilesList,
        selectProfileFromList,
        saveProfileValues,
        setModalVisible,
      }}
    >
      <WrapperComponent />
    </ProfilesContext.Provider>
  );
};

export const useProfilesContext = () => {
  const values = useContext(ProfilesContext);
  if (!values || isEmpty(values)) throw new Error('This context only works inside ProfilesContextProvider');
  return {
    profiles: values.profiles,
    total: values.total,
    profileSelected: values.profileSelected,
    usersProfiles: values.usersProfiles,
    doctorsProfile: values.doctorsProfile,
    hospitalsProfile: values.hospitalsProfile,
    rolesProfile: values.rolesProfile,
    loadingList: values.loadingList,
    loadingSave: values.loadingSave,
    formType: values.formType,
    modalVisible: values.modalVisible,
    getProfilesList: values.getProfilesList,
    selectProfileFromList: values.selectProfileFromList,
    saveProfileValues: values.saveProfileValues,
    setModalVisible: values.setModalVisible,
  };
};

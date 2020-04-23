import React, { createContext, memo, useCallback, useContext, useReducer } from 'react';
import { isEmpty } from 'ramda';
import { initialProfilesState, ProfilesReducer } from './reducers/ProfileReducer';
import { GlobalReducer, initialGlobalState } from '../../commons/reducers/GlobalReducers';
import {
  getDoctorById,
  getRefProfiles,
  saveProfileValuesAction,
  setListProfilesAction,
  setListProfilesNomencladorAction,
  setProfileListLoadingAction,
  setProfilesDoctorAction,
  setProfileSelected,
  setProfilesHospitalAction,
  setProfilesRoleAction,
  setProfilesSaveLoadingAction,
} from './reducers/ProfileActions';
import { getHospitalDetailsAction } from '../hospital/reducers/HospitalActions';
import { getRoleById, setModalVisibleAction } from '../../commons/reducers/GlobalActions';
import { initialProfileFiltersState, ProfileFiltersReducer } from './reducers/ProfileFiltersReducer';
import setProfileFilterAction from './reducers/ProfilesFiltersActions';

const ProfilesContext = createContext({});

export const withProfileContext = WrapperComponent => () => {
  const [state, dispatch] = useReducer(ProfilesReducer, initialProfilesState, init => init);
  const [filtersState, filtersDispatch] = useReducer(ProfileFiltersReducer, initialProfileFiltersState, init => init);
  const [globalState, globalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);

  const getProfilesList = useCallback(({ limit = 5, next, prev, filters }) => {
    dispatch(setProfileListLoadingAction(true));
    let ref = getRefProfiles();
    if (filters) {
      Object.keys(filters).map(k => {
        ref = ref.where(k, '==', filters[k]);
        return null;
      });
    } else if (next) {
      ref = ref.startAt(next.fullname).limit(limit);
    } else if (prev) {
      ref = ref.endBefore(prev.fullname).limitToLast(limit);
    }

    ref = ref.limit(limit);

    ref.onSnapshot(snapshot => {
      const result = snapshot.docChanges().map(({ doc }) => {
        if (doc.data().userId) {
          // eslint-disable-next-line no-console
          console.log(doc.data().userId);
          console.count(doc.data().userId);
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

  const getListProfilesNomenclador = useCallback(({ filters }) => {
    dispatch(setProfileListLoadingAction(true));
    let ref = getRefProfiles();

    if (filters) {
      Object.keys(filters).map(k => {
        ref = ref.where(k, '==', filters[k]);
        return null;
      });

      ref.onSnapshot(snapshot => {
        const result = snapshot.docChanges().map(({ doc }) => {
          return { id: doc.id, name: doc.data().name };
        });
        dispatch(setListProfilesNomencladorAction(result));
        dispatch(setProfileListLoadingAction(false));
      });
    }
  }, []);

  const saveProfileValues = useCallback((values, formType) => {
    dispatch(setProfilesSaveLoadingAction(true));
    saveProfileValuesAction(values, formType)
      .then(result => {
        // eslint-disable-next-line no-console
        console.log(result);
      })
      // eslint-disable-next-line no-console
      .catch(console.error);
  }, []);

  const selectProfileFromList = useCallback(selected => dispatch(setProfileSelected(selected)), []);

  const setModalVisible = useCallback(
    (visible, formType) => globalDispatch(setModalVisibleAction(visible, formType)),
    []
  );

  const setProfileFilter = useCallback(filters => filtersDispatch(setProfileFilterAction(filters)), []);

  return (
    <ProfilesContext.Provider
      value={{
        ...state,
        ...globalState,
        ...filtersState,
        getProfilesList,
        selectProfileFromList,
        saveProfileValues,
        setModalVisible,
        setProfileFilter,
        getListProfilesNomenclador,
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
    profilesNomenclador: values.profilesNomenclador,
    getListProfilesNomenclador: values.getListProfilesNomenclador,
    filters: values.filters,
    setProfileFilter: values.setProfileFilter,
  };
};

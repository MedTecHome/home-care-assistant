import React, { createContext, useCallback, useContext, useMemo, useReducer, useState } from 'react';
import { isEmpty } from 'ramda';
import { GlobalReducer, initialGlobalState } from '../../commons/reducers/GlobalReducers';
import { getProfilesAction, saveProfileValuesAction } from './reducers/ProfileActions';
import setModalVisibleAction from '../../commons/reducers/GlobalActions';

const ProfilesContext = createContext({});

export const withProfileContext = WrapperComponent => () => {
  const [list, setProfileList] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [slected, setSelected] = useState(null);
  const [filters, setFilters] = useState({});
  const [globalState, globalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);

  const profileList = useMemo(() => list, [list]);
  const selected = useMemo(() => slected, [slected]);

  // eslint-disable-next-line no-unused-vars
  const getProfilesList = useCallback(async params => {
    setLoadingList(true);
    try {
      const result = await getProfilesAction(params);
      setProfileList(result);
    } catch (e) {
      // handle error
    }
    setLoadingList(false);
  }, []);

  const saveProfileValues = useCallback(async (values, formType) => {
    try {
      await saveProfileValuesAction(values, formType);
    } catch (e) {
      // handle error
    }
  }, []);

  const selectProfileFromList = useCallback(
    id => {
      const result = profileList.find(item => item.id === id) || null;
      setSelected(result);
    },
    [profileList]
  );

  const setModalVisible = useCallback(
    (visible, formType) => globalDispatch(setModalVisibleAction(visible, formType)),
    []
  );

  return (
    <ProfilesContext.Provider
      value={{
        profileList,
        loadingList,
        selected,
        filters,
        ...globalState,
        getProfilesList,
        selectProfileFromList,
        saveProfileValues,
        setModalVisible,
        setFilters,
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
    profileList: values.profileList,
    selected: values.selected,
    loadingList: values.loadingList,
    formType: values.formType,
    modalVisible: values.modalVisible,
    getProfilesList: values.getProfilesList,
    selectProfileFromList: values.selectProfileFromList,
    saveProfileValues: values.saveProfileValues,
    setModalVisible: values.setModalVisible,
    filters: values.filters,
    setFilters: values.setFilters,
  };
};

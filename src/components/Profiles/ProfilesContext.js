import React, { createContext, useCallback, useContext, useMemo, useReducer, useState, useEffect, useRef } from 'react';

import { GlobalReducer, initialGlobalState } from '../../commons/actions/GlobalReducers';
import saveProfileValuesAction from './reducers/ProfileActions';
import setModalVisibleAction from '../../commons/actions/GlobalActions';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../commons/globalText';
import getProfiles from '../../services/profiles';
import { isEmpty } from '../../helpers/utils';
import { useCustomPaginationContext } from '../pagination/PaginationContext';

const ProfilesContext = createContext({});

export const withProfileContext = WrapperComponent => props => {
  const { RegisterMessage } = useMessageContext();
  const [list, setProfileList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingList, setLoadingList] = useState(false);
  const [action, setAction] = useState('');
  const [slected, setSelected] = useState(null);
  const [params, setParams] = useState({});
  const { pageSize, page, resetPagination } = useCustomPaginationContext();
  const [globalState, globalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);
  const mounted = useRef(true);

  const profileList = useMemo(() => list, [list]);
  const selected = useMemo(() => slected, [slected]);

  const fetchList = useCallback(async (limit, pag, filters) => {
    setLoadingList(true);
    const result = await getProfiles(limit, pag, filters);
    if (mounted.current) {
      setProfileList(result.data);
      setTotal(result.total);
      setLoadingList(false);
      setAction('');
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    if (!isEmpty(params)) {
      setLoadingList(true);
      fetchList(pageSize, page, params);
    }
    return () => {
      mounted.current = false;
    };
  }, [params, page, pageSize, fetchList, action]);

  const saveProfileValues = useCallback(
    async (values, formType) => {
      try {
        await saveProfileValuesAction(values, formType);
      } catch (e) {
        RegisterMessage(ERROR_MESSAGE, e, 'ProfileContext-saveProfileValues');
      } finally {
        setAction('fetch');
      }
    },
    [RegisterMessage]
  );

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
        params,
        ...globalState,
        resetPagination,
        selectProfileFromList,
        saveProfileValues,
        setModalVisible,
        setParams,
        total
      }}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <WrapperComponent {...props} />
    </ProfilesContext.Provider>
  );
};

export const useProfilesContext = () => {
  const values = useContext(ProfilesContext);
  if (!values) throw new Error('This context only works inside ProfilesContextProvider');
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
    params: values.params,
    setParams: values.setParams,
    total: values.total,
    resetPagination: values.resetPagination
  };
};

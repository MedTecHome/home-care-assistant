import React, { createContext, useCallback, useContext, useMemo, useReducer, useState, useEffect, useRef } from 'react';

import { GlobalReducer, initialGlobalState } from '../../commons/actions/GlobalReducers';
import setModalVisibleAction from '../../commons/actions/GlobalActions';
import { ADD_FORM_TEXT, EDIT_FORM_TEXT, DELETE_FORM_TEXT } from '../../commons/globalText';
import getProfiles, { addProfile, editProfile, deleteProfile } from '../../services/profiles';
import { isEmpty } from '../../helpers/utils';
import { useCustomPaginationContext } from '../pagination/PaginationContext';

const ProfilesContext = createContext({});

export const withProfileContext = WrapperComponent => props => {
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

  const saveProfileValues = useCallback(async (values, formType) => {
    try {
      switch (formType) {
        case ADD_FORM_TEXT: {
          await addProfile(values);
          break;
        }
        case EDIT_FORM_TEXT: {
          await editProfile(values);
          break;
        }
        case DELETE_FORM_TEXT: {
          await deleteProfile(values);
          break;
        }
        default:
          break;
      }
    } catch (e) {
      throw new Error(e);
    } finally {
      setAction('fetch');
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

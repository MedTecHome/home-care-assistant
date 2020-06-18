import React, { createContext, useCallback, useContext, useReducer, useState, useEffect, useRef } from 'react';

import { GlobalReducer, initialGlobalState } from '../../commons/actions/GlobalReducers';
import setModalVisibleAction from '../../commons/actions/GlobalActions';
import { ADD_FORM_TEXT, EDIT_FORM_TEXT, DELETE_FORM_TEXT } from '../../commons/globalText';
import getProfiles, { addProfile, editProfile, deleteProfile } from '../../services/profiles';
import { isEmpty } from '../../helpers/utils';
import { useCustomPaginationContext } from '../pagination/PaginationContext';
import { setPostRequest } from '../../services/utils';

const ProfilesContext = createContext({});

export const withProfileContext = WrapperComponent => props => {
  const [profileList, setProfileList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingList, setLoadingList] = useState(false);
  const [action, setAction] = useState('');
  const [selected, setSelected] = useState(null);
  const [parentFilter, setParentFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const { pageSize, page, resetPagination } = useCustomPaginationContext();
  const [globalState, globalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);
  const mounted = useRef(true);

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
    if (!isEmpty(parentFilter) && !isEmpty(roleFilter)) {
      setLoadingList(true);
      fetchList(pageSize, page, { parent: parentFilter, role: roleFilter, fullname: nameFilter });
    }
    return () => {
      mounted.current = false;
    };
  }, [parentFilter, roleFilter, nameFilter, page, pageSize, fetchList, action]);

  const editUserPassword = useCallback(async params => {
    try {
      await setPostRequest('editUserPassword', params);
      setAction('fetch');
    } catch (e) {
      throw new Error(e.message);
    }
  }, []);

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
      setAction('fetch');
    } catch (e) {
      throw new Error(e.message);
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
        parentFilter,
        roleFilter,
        nameFilter,
        ...globalState,
        resetPagination,
        selectProfileFromList,
        saveProfileValues,
        setModalVisible,
        setRoleFilter,
        setParentFilter,
        setNameFilter,
        editUserPassword,
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
    selectProfileFromList: values.selectProfileFromList,
    saveProfileValues: values.saveProfileValues,
    setModalVisible: values.setModalVisible,
    parentFilter: values.parentFilter,
    roleFilter: values.roleFilter,
    nameFilter: values.nameFilter,
    setParentFilter: values.setParentFilter,
    setRoleFilter: values.setRoleFilter,
    setNameFilter: values.setNameFilter,
    total: values.total,
    resetPagination: values.resetPagination,
    editUserPassword: values.editUserPassword
  };
};

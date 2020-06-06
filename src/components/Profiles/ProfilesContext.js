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
  const [loadingSave, setLoadingSave] = useState(false);
  const [slected, setSelected] = useState(null);
  const [params, setParams] = useState({});
  const { pageSize: limit, offset } = useCustomPaginationContext();
  const [globalState, globalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);
  const mounted = useRef(true);

  const profileList = useMemo(() => list, [list]);
  const selected = useMemo(() => slected, [slected]);

  useEffect(() => {
    mounted.current = true;
    if (!loadingSave && !isEmpty(params)) {
      setLoadingList(true);
      getProfiles(limit, offset, params)
        .then(result => {
          if (mounted.current === true) {
            setProfileList(result.data);
            setTotal(result.total);
          }
        })
        .catch(e => {
          RegisterMessage(ERROR_MESSAGE, e, 'ProfilesContext');
        })
        .finally(() => {
          if (mounted.current === true) setLoadingList(false);
        });
    }
    return () => {
      mounted.current = false;
    };
  }, [params, offset, limit, loadingSave, RegisterMessage]);

  const saveProfileValues = useCallback(
    async (values, formType) => {
      setLoadingSave(true);
      try {
        await saveProfileValuesAction(values, formType);
      } catch (e) {
        RegisterMessage(ERROR_MESSAGE, e, 'ProfileContext-saveProfileValues');
      } finally {
        setLoadingSave(false);
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
    total: values.total
  };
};

import React, { useEffect, useState, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import { useProfilesContext, withProfileContext } from './ProfilesContext';
import ListProfilesComponent from './ListProfilesComponent';
import ToolbarProfileComponent from './FiltersProfilesComponent';
import ModalComponent from '../ModalComponent';
import {
  ADD_FORM_TEXT,
  DELETE_FORM_TEXT,
  EDIT_FORM_TEXT,
  EDIT_USER_PASSWORD_FORM_TEXT
} from '../../commons/globalText';
import { withCustomPaginationContext } from '../pagination/PaginationContext';
import { getPropValue } from '../../helpers/utils';
import PaginationComponent from '../pagination/PaginationComponent';
import AddOrEditProfilesComponent from './forms/AddOrEditProfilesComponent';
import DeleteProfilesComponent from './forms/DeleteProfilesComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { getRoleById } from '../../services/roles';
import UpdateUserPasswordComponent from './forms/UpdateUserPasswordComponent';
import TitlePagesComponent from '../text/TitlePagesComponent';

function TitleProfilesComponent({ filterRole }) {
  const [roleDetails, setRoleDetails] = useState(null);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    if (filterRole) {
      getRoleById(filterRole).then(result => {
        if (mounted.current) setRoleDetails(result);
      });
    }

    return () => {
      mounted.current = false;
    };
  }, [filterRole]);

  const text = roleDetails
    ? `Lista de ${roleDetails.name.toLowerCase()}${getPropValue(roleDetails, 'plural') || ''}`
    : 'Todos';
  return <TitlePagesComponent text={text} />;
}

function ProfilesComponent({ filterRole }) {
  const { currentUserProfile, isSuperadmin } = useAuthContext();
  const {
    formType,
    setModalVisible,
    modalVisible,
    profileList,
    total,
    selectProfileFromList,
    selected,
    loadingList,
    saveProfileValues,
    setParentFilter,
    setRoleFilter,
    editUserPassword
  } = useProfilesContext();

  useEffect(() => {
    setRoleFilter(filterRole);
  }, [filterRole, setRoleFilter]);

  useEffect(() => {
    setParentFilter(currentUserProfile.id);
  }, [currentUserProfile.id, setParentFilter]);

  const handleOnClickDelete = () => {
    setModalVisible(true, DELETE_FORM_TEXT);
  };

  const handleOnClickEdit = () => {
    setModalVisible(true, EDIT_FORM_TEXT);
  };

  const handleOnClickAdd = () => {
    setModalVisible(true, ADD_FORM_TEXT);
  };

  const handleEditUserPassword = () => {
    setModalVisible(true, EDIT_USER_PASSWORD_FORM_TEXT);
  };

  return (
    <>
      <ModalComponent visible={modalVisible} fullScreen={[ADD_FORM_TEXT, EDIT_FORM_TEXT].includes(formType)}>
        {([ADD_FORM_TEXT, EDIT_FORM_TEXT].includes(formType) && (
          <AddOrEditProfilesComponent
            filterRole={filterRole}
            title={(formType === ADD_FORM_TEXT && 'Adicionar') || (formType === EDIT_FORM_TEXT && 'Editar') || ''}
            formType={formType}
            selected={selected}
            selectProfileFromList={selectProfileFromList}
            saveProfileValues={saveProfileValues}
            setModalVisible={setModalVisible}
            currentUserProfile={currentUserProfile}
          />
        )) ||
          (formType === DELETE_FORM_TEXT && <DeleteProfilesComponent />) ||
          (formType === EDIT_USER_PASSWORD_FORM_TEXT && (
            <UpdateUserPasswordComponent
              selected={selected}
              setModalVisible={setModalVisible}
              onEditUserPassword={editUserPassword}
            />
          ))}
      </ModalComponent>
      <TitleProfilesComponent filterRole={filterRole} />
      <ToolbarProfileComponent onClickAdd={handleOnClickAdd} />
      <Typography>
        <strong>Total: </strong>({total})
      </Typography>
      <ListProfilesComponent
        loadingList={loadingList}
        profileList={profileList}
        selected={selected}
        selectProfileFromList={selectProfileFromList}
        onClickDelete={handleOnClickDelete}
        onClickEdit={handleOnClickEdit}
        OnEditUserPassword={handleEditUserPassword}
        isSuperadmin={isSuperadmin}
      />
      <PaginationComponent total={total} />
    </>
  );
}

export default withCustomPaginationContext(withProfileContext(ProfilesComponent));

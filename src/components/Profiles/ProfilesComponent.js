import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useProfilesContext, withProfileContext } from './ProfilesContext';
import ListProfilesComponent from './ListProfilesComponent';
import ToolbarProfileComponent from './FiltersProfilesComponent';
import ModalComponent from '../ModalComponent';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';
import useCustomStyles from '../../jss/globalStyles';
import { withCustomPaginationContext, useCustomPaginationContext } from '../pagination/PaginationContext';
import { getPropValue } from '../../helpers/utils';
import PaginationComponent from '../pagination/PaginationComponent';
import AddOrEditProfilesComponent from './forms/AddOrEditProfilesComponent';
import DeleteProfilesComponent from './forms/DeleteProfilesComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { getRoleById } from '../../services/roles';

function TitleProfilesComponent({ filterRole }) {
  const [roleDetails, setRoleDetails] = useState(null);
  useEffect(() => {
    if (filterRole) {
      getRoleById(filterRole).then(result => setRoleDetails(result));
    }
  }, [filterRole]);

  const classes = useCustomStyles();
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Typography color="textPrimary" variant="h5" className={classes.pageHeader}>
        {roleDetails ? `Lista de ${roleDetails.name}${roleDetails.plural}` : 'Todos'}
      </Typography>
    </Breadcrumbs>
  );
}

function ProfilesComponent({ filterRole }) {
  const { currentUserProfile, isSuperadmin } = useAuthContext();
  const { resetPagination } = useCustomPaginationContext();
  const {
    formType,
    setModalVisible,
    modalVisible,
    setParams,
    profileList,
    total,
    selectProfileFromList,
    selected,
    loadingList,
    saveProfileValues,
    params
  } = useProfilesContext();

  const { 'role.id': roleId } = params;

  useEffect(() => {
    resetPagination();
  }, [params.fullname, roleId, resetPagination]);

  useEffect(() => {
    setParams({
      'role.id': filterRole || null,
      ...(filterRole !== 'clinic' ? { 'parent.id': currentUserProfile.id } : {})
    });
  }, [filterRole, currentUserProfile, setParams]);

  const handleOnClickDelete = () => {
    setModalVisible(true, DELETE_FORM_TEXT);
  };

  const handleOnClickEdit = () => {
    setModalVisible(true, EDIT_FORM_TEXT);
  };

  const handleOnClickAdd = () => {
    setModalVisible(true, ADD_FORM_TEXT);
  };

  return (
    <>
      <ModalComponent visible={modalVisible}>
        {[ADD_FORM_TEXT, EDIT_FORM_TEXT].includes(formType) && (
          <AddOrEditProfilesComponent
            title={(formType === ADD_FORM_TEXT && 'Adicionar') || (formType === EDIT_FORM_TEXT && 'Editar') || ''}
            formType={formType}
            selected={selected}
            selectProfileFromList={selectProfileFromList}
            saveProfileValues={saveProfileValues}
            setModalVisible={setModalVisible}
            currentUserProfile={currentUserProfile}
          />
        )}

        {formType === DELETE_FORM_TEXT && <DeleteProfilesComponent />}
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
        isSuperadmin={isSuperadmin}
      />
      <PaginationComponent
        total={total}
        first={getPropValue(profileList[0], 'fullname')}
        last={getPropValue(profileList[profileList.length - 1], 'fullname')}
      />
    </>
  );
}

export default withCustomPaginationContext(withProfileContext(ProfilesComponent));

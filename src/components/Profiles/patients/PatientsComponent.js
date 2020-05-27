import React, { useEffect } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import ModalComponent from '../../ModalComponent';
import { useProfilesContext, withProfileContext } from '../ProfilesContext';
import ProfilesFormComponent from '../forms/ProfilesFormsComponent';
import ListProfilesComponent from '../ListProfilesComponent';
import ToolbarProfileComponent from '../FiltersProfilesComponent';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import { useAuthContext } from '../../../contexts/AuthContext';
import useCustomStyles from '../../../jss/globalStyles';
import PaginationComponent from '../../pagination/PaginationComponent';
import { getPropValue } from '../../../helpers/utils';
import { withCustomPaginationContext } from '../../pagination/PaginationContext';

function PatientsComponent() {
  const {
    formType,
    setModalVisible,
    modalVisible,
    setParams,
    profileList,
    total,
    selectProfileFromList,
    profileSelected,
    loadingList
  } = useProfilesContext();
  const { currentUserProfile } = useAuthContext();
  const classes = useCustomStyles();

  useEffect(() => {
    setParams({
      'role.id': 'patient',
      ...(currentUserProfile ? { 'doctor.id': currentUserProfile.id } : {})
    });
  }, [setParams, currentUserProfile, formType]);

  const handleOnClickDelete = () => {
    setModalVisible(true, DELETE_FORM_TEXT);
  };

  const handleOnClickEdit = () => {
    setModalVisible(true, EDIT_FORM_TEXT);
  };

  const handleOnClickAdd = () => {
    setModalVisible(true, ADD_FORM_TEXT);
  };

  console.log(profileList, total);

  return (
    <>
      <ModalComponent visible={modalVisible}>
        <ProfilesFormComponent formType={formType} />
      </ModalComponent>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="textPrimary" variant="h5" className={classes.pageHeader}>
          Pacientes
        </Typography>
      </Breadcrumbs>
      <ToolbarProfileComponent onClickAdd={handleOnClickAdd} />
      <Typography>
        <strong>Total: </strong>({total})
      </Typography>
      <ListProfilesComponent
        loadingList={loadingList}
        profileList={profileList}
        profileSelected={profileSelected}
        selectProfileFromList={selectProfileFromList}
        onClickDelete={handleOnClickDelete}
        onClickEdit={handleOnClickEdit}
      />
      {!loadingList && (
        <PaginationComponent
          total={total}
          first={getPropValue(profileList[0], 'fullname')}
          last={getPropValue(profileList[profileList.length - 1], 'fullname')}
        />
      )}
    </>
  );
}

export default withCustomPaginationContext(withProfileContext(PatientsComponent));

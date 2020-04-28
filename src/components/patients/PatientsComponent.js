import React, { useCallback, useContext, useEffect } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ModalComponent from '../ModalComponent';
import { useProfilesContext, withProfileContext } from '../profiles/ProfilesContext';
import ProfilesFormComponent from '../profiles/forms/ProfilesFormsComponent';
import ListProfilesComponent from '../profiles/ListProfilesComponent';
import ToolbarProfileComponent from '../profiles/ToolbarProfilesComponent';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';
import { AuthContext } from '../../contexts/AuthContext';

const useStyles = makeStyles({
  pageHeader: {
    color: '#6d6d6d',
  },
});

function PatientsComponent() {
  const {
    setModalVisible,
    modalVisible,
    formType,
    getProfilesList,
    selectProfileFromList,
    setProfileFilter,
  } = useProfilesContext();
  const { currentUserProfile } = useContext(AuthContext);
  const classes = useStyles();

  useEffect(() => {
    setProfileFilter({
      'role.id': 'patient',
      ...(currentUserProfile ? { 'doctor.id': currentUserProfile.id } : {}),
    });
  }, [setProfileFilter, currentUserProfile]);

  const onFormsClose = () => {
    getProfilesList({ filters: { 'role.id': 'patient' } });
    selectProfileFromList(null);
  };

  const handleBackdropClick = useCallback(() => {
    setModalVisible(false, null);
  }, [setModalVisible]);

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
      <ModalComponent visible={modalVisible} handleBackdropClick={handleBackdropClick}>
        <ProfilesFormComponent formType={formType} handleModalClose={onFormsClose} />
      </ModalComponent>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="textPrimary" variant="h5" className={classes.pageHeader}>
          Pacientes
        </Typography>
      </Breadcrumbs>
      <ToolbarProfileComponent onClickAdd={handleOnClickAdd} />
      <ListProfilesComponent onClickDelete={handleOnClickDelete} onClickEdit={handleOnClickEdit} />
    </>
  );
}

export default withProfileContext(PatientsComponent);

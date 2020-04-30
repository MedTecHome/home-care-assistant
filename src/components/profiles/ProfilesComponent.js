import React, { useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';
import { useProfilesContext, withProfileContext } from './ProfilesContext';
import ListProfilesComponent from './ListProfilesComponent';
import ToolbarProfileComponent from './ToolbarProfilesComponent';
import ModalComponent from '../ModalComponent';
import ProfilesFormComponent from './forms/ProfilesFormsComponent';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';
import { AuthContext } from '../../contexts/AuthContext';

const useStyles = makeStyles({
  pageHeader: {
    color: '#6d6d6d',
  },
});
function ProfilesComponent() {
  const {
    formType,
    setModalVisible,
    modalVisible,
    selectProfileFromList,
    getProfilesList,
    filters,
    setProfileFilter,
  } = useProfilesContext();
  const classes = useStyles();

  useEffect(() => {
    setProfileFilter({
      'role.id': 'doctor',
    });
  }, [setProfileFilter]);

  const handleBackdropClick = () => {
    setModalVisible(false, null);
  };

  const handleClosedForms = () => {
    getProfilesList({ filters });
    selectProfileFromList(null);
  };

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
      <ModalComponent visible={modalVisible} onBackdropClick={handleBackdropClick}>
        <ProfilesFormComponent formType={formType} handleModalClose={handleClosedForms} />
      </ModalComponent>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="textPrimary" variant="h5" className={classes.pageHeader}>
          Todos
        </Typography>
      </Breadcrumbs>
      <ToolbarProfileComponent onClickAdd={handleOnClickAdd} />
      <ListProfilesComponent onClickDelete={handleOnClickDelete} onClickEdit={handleOnClickEdit} />
    </>
  );
}

export default withProfileContext(ProfilesComponent);

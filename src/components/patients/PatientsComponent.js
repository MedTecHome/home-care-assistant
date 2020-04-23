import React, { useCallback } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import ModalComponent from '../ModalComponent';
import { useProfilesContext, withProfileContext } from '../profiles/ProfilesContext';
import ProfilesFormComponent from '../profiles/forms/ProfilesFormsComponent';
import ListProfilesComponent from '../profiles/ListProfilesComponent';
import ToolbarProfileComponent from '../profiles/ToolbarProfilesComponent';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';

function PatientsComponent() {
  const { setModalVisible, modalVisible, formType, getProfilesList, selectProfileFromList } = useProfilesContext();

  const onFormsClose = () => {
    getProfilesList({});
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
        <ProfilesFormComponent formType={formType} onFormsClosed={onFormsClose} />
      </ModalComponent>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="textPrimary">Perfiles</Typography>
      </Breadcrumbs>
      <ToolbarProfileComponent onClickAdd={handleOnClickAdd} />
      <ListProfilesComponent onClickDelete={handleOnClickDelete} onClickEdit={handleOnClickEdit} />
    </>
  );
}

export default withProfileContext(PatientsComponent);

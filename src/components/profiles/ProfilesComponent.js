import React from 'react';
import { useProfilesContext, withProfileContext } from '../../contexts/ProfilesContext';
import ListProfilesComponent from './ListProfilesComponent';
import ToolbarProfileComponent from './ToolbarProfilesComponent';
import ModalComponent from '../ModalComponent';
import ProfilesFormComponent from './forms/ProfilesFormsComponent';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';

function ProfilesComponent() {
  const { formType, setModalVisible, modalVisible, selectProfileFromList, getProfilesList } = useProfilesContext();
  const handleBackdropClick = () => {
    setModalVisible(false, null);
  };

  const handleClosedForms = () => {
    getProfilesList({});
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
        <ProfilesFormComponent formType={formType} onFormsClosed={handleClosedForms} />
      </ModalComponent>
      <ToolbarProfileComponent onClickAdd={handleOnClickAdd} />
      <ListProfilesComponent onClickDelete={handleOnClickDelete} onClickEdit={handleOnClickEdit} />
    </>
  );
}

export default withProfileContext(ProfilesComponent);

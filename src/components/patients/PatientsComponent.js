import React, { useCallback } from 'react';
import ModalComponent from '../ModalComponent';
import { useProfilesContext, withProfileContext } from '../../contexts/ProfilesContext';
import ProfilesFormComponent from '../profiles/forms/ProfilesFormsComponent';
import ListProfilesComponent from '../profiles/ListProfilesComponent';

function PatientsComponent() {
  const { setModalVisible, modalVisible, formType, getProfilesList, selectProfileFromList } = useProfilesContext();

  const onFormsClose = () => {
    getProfilesList({});
    selectProfileFromList(null);
  };

  const handleBackdropClick = useCallback(() => {
    setModalVisible(false, null);
  }, [setModalVisible]);

  return (
    <>
      <ModalComponent visible={modalVisible} handleBackdropClick={handleBackdropClick}>
        <ProfilesFormComponent formType={formType} handleOnClose={onFormsClose} />
      </ModalComponent>
      <ListProfilesComponent />
    </>
  );
}

export default withProfileContext(PatientsComponent);

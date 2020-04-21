import React from 'react';
import { usePatientsContext, withPatientsContextProvider } from '../../contexts/PatientsContext';
import PatientsListComponent from './PatientsListCompoent';
import ModalComponent from '../ModalComponent';
import PatientsFormComponent from './forms/PatientsFormComponent';

function PatientsComponent() {
  const { setModalVisible, modalVisible, formType, getListPatients } = usePatientsContext();

  const onModalClose = () => {
    getListPatients({});
  };

  const handleBackdropClick = () => {
    setModalVisible(false, null);
  };

  return (
    <>
      <ModalComponent visible={modalVisible} handleModalClose={onModalClose} handleBackdropClick={handleBackdropClick}>
        <PatientsFormComponent formType={formType} handleOnClose={onModalClose} />
      </ModalComponent>
      <PatientsListComponent />
    </>
  );
}

export default withPatientsContextProvider(PatientsComponent);

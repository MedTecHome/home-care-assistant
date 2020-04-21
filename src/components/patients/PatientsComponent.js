import React from 'react';
import { usePatientsContext, withPatientsContextProvider } from '../../contexts/PatientsContext';
import PatientsListComponent from './PatientsListCompoent';
import ModalComponent from '../ModalComponent';
import PatientsFormComponent from './forms/PatientsFormComponent';

function PatientsComponent() {
  const { modalVisible, formType, getListPatients } = usePatientsContext();

  const onModalClose = () => {
    getListPatients({});
  };

  return (
    <>
      <ModalComponent visible={modalVisible} handleModalClose={onModalClose}>
        <PatientsFormComponent formType={formType} handleOnClose={onModalClose} />
      </ModalComponent>
      <PatientsListComponent />
    </>
  );
}

export default withPatientsContextProvider(PatientsComponent);

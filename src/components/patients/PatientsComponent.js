import React, { useCallback } from 'react';
import { usePatientsContext, withPatientsContextProvider } from '../../contexts/PatientsContext';
import PatientsListComponent from './PatientsListCompoent';
import ModalComponent from '../ModalComponent';
import PatientsFormComponent from './forms/PatientsFormComponent';

function PatientsComponent() {
  const { setModalVisible, modalVisible, formType, getListPatients } = usePatientsContext();

  const onFormsClose = () => {
    getListPatients({});
  };

  const handleBackdropClick = useCallback(() => {
    setModalVisible(false, null);
  }, [setModalVisible]);

  return (
    <>
      <ModalComponent visible={modalVisible} handleBackdropClick={handleBackdropClick}>
        <PatientsFormComponent formType={formType} handleOnClose={onFormsClose} />
      </ModalComponent>
      <PatientsListComponent />
    </>
  );
}

export default withPatientsContextProvider(PatientsComponent);

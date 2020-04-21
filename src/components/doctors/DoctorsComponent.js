import React from 'react';
import { useDoctorsContext, withDoctorContext } from '../../contexts/DoctorsContext';
import DoctorsListComponent from './DoctorsListComponent';
import DoctorForms from './forms/DoctorForms';
import ModalComponent from '../ModalComponent';

function DoctorsComponent() {
  const { modalVisible, setModalVisible, formType, getListDoctors } = useDoctorsContext();
  const onModalClose = () => {
    getListDoctors({});
  };

  const onBackdropClick = () => {
    setModalVisible(false, null);
  };

  return (
    <>
      <ModalComponent visible={modalVisible} handleModalClose={onModalClose} handleBackdropClick={onBackdropClick}>
        <DoctorForms formType={formType} />
      </ModalComponent>
      <DoctorsListComponent />
    </>
  );
}

export default withDoctorContext(DoctorsComponent);

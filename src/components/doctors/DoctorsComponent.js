import React from 'react';
import { useDoctorsContext, withDoctorContext } from '../../contexts/DoctorsContext';
import DoctorsListComponent from './DoctorsListComponent';
import DoctorsFormComponent from './forms/DoctorsFormComponent';
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
      <ModalComponent visible={modalVisible} handleBackdropClick={onBackdropClick}>
        <DoctorsFormComponent formType={formType} handleOnClose={onModalClose} />
      </ModalComponent>
      <DoctorsListComponent />
    </>
  );
}

export default withDoctorContext(DoctorsComponent);

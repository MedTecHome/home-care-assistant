import React from 'react';
import { useDoctorsContext, withDoctorContext } from '../../contexts/DoctorsContext';
import DoctorsListComponent from './DoctorsListComponent';
import DoctorForms from './forms/DoctorForms';
import ModalComponent from '../ModalComponent';

function DoctorsComponent() {
  const { modalVisible, formType, getListDoctors } = useDoctorsContext();
  const onModalClose = () => {
    getListDoctors({});
  };

  return (
    <>
      <ModalComponent visible={modalVisible} handleModalClose={onModalClose}>
        <DoctorForms formType={formType} />
      </ModalComponent>
      <DoctorsListComponent />
    </>
  );
}

export default withDoctorContext(DoctorsComponent);

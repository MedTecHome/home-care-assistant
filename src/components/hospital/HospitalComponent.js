import React from 'react';
import { useHospitalContext, withHospitalContext } from '../../contexts/HospitalContext';
import HospitalListComponent from './HospitalListComponent';
import HospitalForms from './forms/HospitalForms';
import ModalComponent from '../ModalComponent';

function HospitalComponent() {
  const { modalVisible, setModalVisible, formType, getListHospitals, selectHospital } = useHospitalContext();
  const handleBackdrop = () => {
    setModalVisible(false, true);
  };

  const handleFormClose = () => {
    getListHospitals({});
    selectHospital(null);
  };

  return (
    <>
      <ModalComponent visible={modalVisible} handleBackdropClick={handleBackdrop}>
        <HospitalForms formType={formType} onFormClose={handleFormClose} />
      </ModalComponent>
      <HospitalListComponent />
    </>
  );
}

export default withHospitalContext(HospitalComponent);

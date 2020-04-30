import React, { useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { usePatientHistoryContext, withPatientHistoryContext } from './PatientHistoryContext';
import ListPatientHistoryComponent from './ListPatientHistoryComponent';
import FiltersPatientHistoryComponent from './FiltersPatientHistoryComponent';
import ModalComponent from '../../ModalComponent';
import DetailHistoryMedicalFormComponent from './DetailHistoryMedicalFormComponent';

function PatientHistoryComponent() {
  const { getPatientHistory, filters, modalVisible, setModalVisible } = usePatientHistoryContext();
  useEffect(() => {
    getPatientHistory({ filters });
  }, [getPatientHistory, filters]);

  const handleClose = () => {
    setModalVisible(false, null);
  };

  return (
    <>
      <ModalComponent visible={modalVisible} onBackdropClick={handleClose}>
        <DetailHistoryMedicalFormComponent />
      </ModalComponent>
      <Container maxWidth="md">
        <FiltersPatientHistoryComponent />
        <ListPatientHistoryComponent />
      </Container>
    </>
  );
}

export default withPatientHistoryContext(PatientHistoryComponent);

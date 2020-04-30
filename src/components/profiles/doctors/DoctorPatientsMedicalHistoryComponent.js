import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useLocation } from 'react-router-dom';
import FiltersPatientHistoryComponent from '../../medicalForms/history/FiltersPatientHistoryComponent';
import ListPatientHistoryComponent from '../../medicalForms/history/ListPatientHistoryComponent';
import { usePatientHistoryContext, withPatientHistoryContext } from '../../medicalForms/history/PatientHistoryContext';
import ModalComponent from '../../ModalComponent';
import DetailHistoryMedicalFormComponent from '../../medicalForms/history/DetailHistoryMedicalFormComponent';

function DoctorPatientsMedicalHistoryComponent() {
  const { search } = useLocation();
  const { getPatientHistory, modalVisible, setModalVisible } = usePatientHistoryContext();

  useEffect(() => {
    let filters = {};
    const urlSearchParams = new URLSearchParams(search);
    if (urlSearchParams.has('tipoPrueba')) {
      filters = { ...filters, type: urlSearchParams.get('tipoPrueba') };
    }
    if (urlSearchParams.has('pId')) {
      filters = { ...filters, 'user.id': urlSearchParams.get('pId') };
    }
    getPatientHistory({ filters });
  }, [getPatientHistory, search]);

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
export default withPatientHistoryContext(DoctorPatientsMedicalHistoryComponent);

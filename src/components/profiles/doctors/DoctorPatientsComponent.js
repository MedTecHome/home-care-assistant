import React from 'react';
import Container from '@material-ui/core/Container';
import FiltersPatientHistoryComponent from '../../medicalForms/history/FiltersPatientHistoryComponent';
import ListPatientHistoryComponent from '../../medicalForms/history/ListPatientHistoryComponent';

function DoctorPatientComponent() {
  return (
    <>
      <Container maxWidth="md">
        <FiltersPatientHistoryComponent />
        <ListPatientHistoryComponent />
      </Container>
    </>
  );
}
export default DoctorPatientComponent;

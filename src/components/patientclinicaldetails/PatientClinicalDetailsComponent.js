import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@material-ui/core';
import TreatmentsComponent from '../treatments/TreatmentsComponent';
import FiltersClinicalDetails from './FiltersClinicalDetailsComponent';
import { useTreatmentsContext, withTreatmentsContext } from '../treatments/TreatmentsContext';
import { usePatientHistoryContext, withPatientHistoryContext } from '../medicalForms/history/PatientHistoryContext';
import PatientHistoryComponent from '../medicalForms/history/PatientHistoryComponent';

function PatientClinicalDetailsComponent() {
  const [tab, setTab] = useState('treatments');
  const { state } = useLocation();
  const [patient, setPatient] = useState(state.profile || null);
  const { setFilters: setFiltersTreatments } = useTreatmentsContext();
  const { setFilters: setFiltersHistory } = usePatientHistoryContext();

  useEffect(() => {
    if (patient) {
      setFiltersTreatments({ 'patient.id': patient.id });
      setFiltersHistory({ 'patient.id': patient.id });
    }
  }, [setFiltersTreatments, patient]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handlePatient = id => {
    setPatient(id);
  };

  return (
    <>
      <FiltersClinicalDetails setPatient={handlePatient} patient={patient} />
      <Tabs value={tab} onChange={handleTabChange} scrollButtons="auto">
        <Tab label="Tratamientos" value="treatments" />
        <Tab label="Pruebas clinicas" value="clinictest" />
      </Tabs>
      {tab === 'treatments' && <TreatmentsComponent />}
      {tab === 'clinictest' && <PatientHistoryComponent />}
    </>
  );
}
export default withTreatmentsContext(withPatientHistoryContext(PatientClinicalDetailsComponent));

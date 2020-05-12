import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TreatmentsComponent from '../treatments/TreatmentsComponent';
import FiltersClinicalDetails from './FiltersClinicalDetailsComponent';
import { useTreatmentsContext, withTreatmentsContext } from '../treatments/TreatmentsContext';
import { usePatientHistoryContext, withPatientHistoryContext } from '../testsHistory/PatientHistoryContext';
import PatientHistoryComponent from '../testsHistory/PatientHistoryComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { getPropValue } from '../../helpers/utils';

function PatientClinicalDetailsComponent() {
  const [tab, setTab] = useState('clinictest');
  const { state } = useLocation();
  const { currentUserProfile, isDoctor } = useAuthContext();

  const [patient, setPatient] = useState(null);
  const { setFilters: setFiltersTreatments } = useTreatmentsContext();
  const { setFilters: setFiltersHistory } = usePatientHistoryContext();

  useEffect(() => {
    if (getPropValue(currentUserProfile, 'role.id') === 'patient') {
      setPatient(currentUserProfile);
    } else if (getPropValue(state, 'profile.role.id') === 'patient') {
      setPatient(state.profile);
    }
  }, [state, currentUserProfile]);

  useEffect(() => {
    if (patient) {
      setFiltersTreatments({ 'patient.id': patient.id });
      setFiltersHistory({ 'patient.id': patient.id });
    }
  }, [setFiltersTreatments, patient, setFiltersHistory]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handlePatient = id => {
    setPatient(id);
  };

  return (
    <>
      {isDoctor && <FiltersClinicalDetails setPatient={handlePatient} patient={patient} />}
      <div
        style={{
          backgroundColor: '#fff'
        }}
      >
        <Paper square>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Tratamientos" value="treatments" />
            <Tab label="Pruebas clinicas" value="clinictest" />
          </Tabs>
        </Paper>

        {tab === 'treatments' && <TreatmentsComponent />}
        {tab === 'clinictest' && <PatientHistoryComponent />}
      </div>
    </>
  );
}
export default withTreatmentsContext(withPatientHistoryContext(PatientClinicalDetailsComponent));

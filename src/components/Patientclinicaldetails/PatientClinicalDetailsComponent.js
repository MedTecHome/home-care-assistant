import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TreatmentsComponent from '../Treatments/TreatmentsComponent';
import FiltersClinicalDetails from './FiltersClinicalDetailsComponent';
import { useTreatmentsContext, withTreatmentsContext } from '../Treatments/TreatmentsContext';
import { usePatientHistoryContext, withPatientHistoryContext } from '../ClinicalHistory/PatientHistoryContext';
import PatientHistoryComponent from '../ClinicalHistory/PatientHistoryComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { getPropValue } from '../../helpers/utils';
import EvolutionComponent from '../evolution/EvolutionComponent';
import { withEvolutionContext, useEvolutionContext } from '../evolution/EvolutionContext';

function PatientClinicalDetailsComponent() {
  const { state } = useLocation();
  const { currentUserProfile, isDoctor } = useAuthContext();
  const [tab, setTab] = useState(isDoctor ? 'evolution' : 'clinictest');

  const [patient, setPatient] = useState(null);
  const { setFilters: setFiltersTreatments } = useTreatmentsContext();
  const { setFilters: setFiltersHistory, filters: historyFilters } = usePatientHistoryContext();
  const { setFilters: setFiltersEvolution } = useEvolutionContext();

  useEffect(() => {
    if (getPropValue(currentUserProfile, 'role.id') === 'patient') {
      setPatient(currentUserProfile);
    } else if (getPropValue(state, 'profile.role.id') === 'patient') {
      setPatient(state.profile);
    }
  }, [state, currentUserProfile]);

  useEffect(() => {
    setFiltersTreatments({ 'user.id': getPropValue(patient, 'id') || '' });
    setFiltersHistory({ 'user.id': getPropValue(patient, 'id') || '' });
    setFiltersEvolution({ 'user.id': getPropValue(patient, 'id') || '' });
  }, [setFiltersTreatments, patient, setFiltersHistory, setFiltersEvolution]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handlePatient = id => {
    setPatient(id);
  };

  const handleTabFromEvolution = (tb, filter) => {
    setTab(tb);
    setFiltersHistory({ ...historyFilters, type: filter });
  };

  return (
    <>
      {isDoctor && (
        <FiltersClinicalDetails setPatient={handlePatient} patient={patient} doctor={currentUserProfile.id} />
      )}
      <Typography
        style={{
          color: '#666'
        }}
      >
        Nombre: <strong>{getPropValue(patient, 'fullname') || ' - '}</strong>
      </Typography>
      <div>
        <Paper square color="inherit">
          <Tabs
            value={tab}
            onChange={handleTabChange}
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
          >
            {isDoctor && <Tab label="Evolución" value="evolution" />}
            <Tab label="Pruebas clínicas" value="clinictest" />
            {isDoctor && <Tab label="Tratamientos" value="treatments" />}
          </Tabs>
        </Paper>

        {tab === 'treatments' && <TreatmentsComponent />}
        {tab === 'clinictest' && <PatientHistoryComponent />}
        {tab === 'evolution' && isDoctor && <EvolutionComponent setTab={handleTabFromEvolution} />}
      </div>
    </>
  );
}
export default withTreatmentsContext(withPatientHistoryContext(withEvolutionContext(PatientClinicalDetailsComponent)));

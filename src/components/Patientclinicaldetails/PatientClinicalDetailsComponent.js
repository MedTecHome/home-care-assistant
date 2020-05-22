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
import EvolutionComponent from './EvolutionComponent';
import { withEvolutionContext, useEvolutionContext } from './EvolutionContext';

function PatientClinicalDetailsComponent() {
  const [tab, setTab] = useState('treatments');
  const { state } = useLocation();
  const { currentUserProfile, isDoctor } = useAuthContext();

  const [patient, setPatient] = useState(null);
  const { setFilters: setFiltersTreatments } = useTreatmentsContext();
  const { setFilters: setFiltersHistory } = usePatientHistoryContext();
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
            <Tab label="Tratamientos" value="treatments" />
            <Tab label="Pruebas clínicas" value="clinictest" />
            {isDoctor && <Tab label="Evolución" value="evolution" />}
          </Tabs>
        </Paper>

        {tab === 'treatments' && <TreatmentsComponent />}
        {tab === 'clinictest' && <PatientHistoryComponent />}
        {tab === 'evolution' && isDoctor && <EvolutionComponent />}
      </div>
    </>
  );
}
export default withTreatmentsContext(withPatientHistoryContext(withEvolutionContext(PatientClinicalDetailsComponent)));

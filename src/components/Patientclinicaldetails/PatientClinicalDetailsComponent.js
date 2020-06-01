import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TreatmentsComponent from '../Treatments/TreatmentsComponent';
import FiltersClinicalDetails from './FiltersClinicalDetailsComponent';
import PatientHistoryComponent from '../ClinicalHistory/PatientHistoryComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { getPropValue } from '../../helpers/utils';
import EvolutionComponent from '../Evolution/EvolutionComponent';

function PatientClinicalDetailsComponent() {
  const { state } = useLocation();
  const { currentUserProfile, isDoctor } = useAuthContext();
  const [tab, setTab] = useState(isDoctor ? 'evolution' : 'clinictest');
  const [defaultTest, setDefaultTest] = useState('');
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    if (getPropValue(currentUserProfile, 'role.id') === 'patient') {
      setPatient(currentUserProfile);
    } else if (getPropValue(state, 'profile.role.id') === 'patient') {
      setPatient(state.profile);
    }
  }, [state, currentUserProfile]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handlePatient = id => {
    setPatient(id);
  };

  const handleTabFromEvolution = (tb, filter) => {
    setTab(tb);
    setDefaultTest(filter);
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
        {tab === 'treatments' && <TreatmentsComponent patient={patient} />}
        {tab === 'clinictest' && <PatientHistoryComponent patient={patient} defaultTest={defaultTest} />}
        {tab === 'evolution' && isDoctor && <EvolutionComponent patient={patient} setTab={handleTabFromEvolution} />}
      </div>
    </>
  );
}
export default PatientClinicalDetailsComponent;

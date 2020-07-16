import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, Tab, Divider } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TreatmentsComponent from '../Treatments/TreatmentsComponent';
import FiltersClinicalDetails from './FiltersClinicalDetailsComponent';
import PatientHistoryComponent from '../ClinicalHistory/PatientHistoryComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { getPropValue } from '../../helpers/utils';
import EvolutionComponent from '../Evolution/EvolutionComponent';
import TitlePagesComponent from '../text/TitlePagesComponent';

function PatientClinicalDetailsComponent() {
  const { state } = useLocation();
  const { currentUserProfile, isDoctor } = useAuthContext();
  const [tab, setTab] = useState(isDoctor ? 'evolution' : 'clinictest');
  const [defaultTest, setDefaultTest] = useState('');
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    if (getPropValue(currentUserProfile, 'role') === 'patient') {
      setPatient(currentUserProfile);
    } else if (getPropValue(state, 'profile.role') === 'patient') {
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
      <TitlePagesComponent text="Detalles clínicos" />
      <Paper>
        {isDoctor ? (
          <FiltersClinicalDetails setPatient={handlePatient} patient={patient} doctor={currentUserProfile.id} />
        ) : null}
        <div>
          <Divider />
          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            {isDoctor && <Tab label="Evolución" value="evolution" />}
            <Tab label="Parámetros clínicos" value="clinictest" />
            {isDoctor && <Tab label="Tratamientos" value="treatments" />}
          </Tabs>
          <Divider />
          {(tab === 'treatments' && <TreatmentsComponent patient={patient} fromDoctor={isDoctor} />) ||
            (tab === 'clinictest' && (
              <PatientHistoryComponent patient={patient} defaultTest={defaultTest} fromDoctor={isDoctor} />
            )) ||
            (tab === 'evolution' && isDoctor && (
              <EvolutionComponent patient={patient} setTab={handleTabFromEvolution} />
            )) ||
            null}
        </div>
      </Paper>
    </>
  );
}
export default PatientClinicalDetailsComponent;

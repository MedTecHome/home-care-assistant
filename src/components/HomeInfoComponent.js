import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { getPropValue } from '../helpers/utils';
import { getProfileByIdAction } from './Profiles/reducers/ProfileActions';
import DetailTextComponent from './DetailTextComponent';

function PaperDetailComponent({ title, children }) {
  return (
    <Grid item xs={12} sm={10} md={8} container>
      <Grid item xs={4} container justify="center" alignItems="center">
        <Typography variant="h5">{title}</Typography>
      </Grid>
      <Grid
        item
        xs={8}
        style={{
          padding: 10,
          borderLeft: '1px solid #ccc'
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
}

function PaperHospitalInfoComponent({ hospital }) {
  return (
    <PaperDetailComponent title="Hospital">
      <DetailTextComponent label="Nombre" value={getPropValue(hospital, 'name') || ' - '} />
      <DetailTextComponent label="Correo" value={getPropValue(hospital, 'email') || ' - '} />
      <DetailTextComponent label="Teléfono" value={getPropValue(hospital, 'phone') || ' - '} />
      <DetailTextComponent label="Dirección" value={getPropValue(hospital, 'address') || ' - '} />
    </PaperDetailComponent>
  );
}

function PatientHomeComponent({ patient }) {
  const [doctor, setDoctor] = useState(null);
  const [hospital, setHospital] = useState(null);
  const doctorId = getPropValue(patient, 'parent.id');
  const hospitalId = getPropValue(patient, 'hospital.id');

  useEffect(() => {
    if (doctorId)
      getProfileByIdAction(doctorId).then(d => {
        setDoctor(d);
      });
  }, [doctorId]);

  useEffect(() => {
    if (hospitalId) setHospital(hospitalId);
  }, [hospitalId]);

  return (
    <>
      <PaperHospitalInfoComponent hospital={hospital} />
      <PaperDetailComponent title="Doctor">
        <DetailTextComponent label="Nombre" value={getPropValue(doctor, 'fullname') || ' - '} />
        <DetailTextComponent label="Correo" value={getPropValue(doctor, 'email') || ' - '} />
        <DetailTextComponent label="Teléfono" value={getPropValue(doctor, 'phone') || ' - '} />
        <DetailTextComponent label="Dirección" value={getPropValue(doctor, 'address') || ' - '} />
      </PaperDetailComponent>
    </>
  );
}

function HomeInfoComponent() {
  const { currentUserProfile, isDoctor, isPatient, isClinic } = useAuthContext();
  return (
    <>
      <Grid container spacing={3}>
        {isPatient && <PatientHomeComponent patient={currentUserProfile} />}
        {isDoctor && <Redirect to="/monitorear" />}
        {isClinic && <Redirect to="/doctores" />}
      </Grid>
    </>
  );
}

export default HomeInfoComponent;

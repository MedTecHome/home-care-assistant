import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useAuthContext } from '../contexts/AuthContext';
import { getPropValue } from '../helpers/utils';
import { getHospitalByIdAction } from './Hospital/reducers/HospitalActions';
import DetailTextComponent from './DetailTextComponent';
import { getProfileByIdAction } from './Profiles/reducers/ProfileActions';

function PatientHomeComponent({ patient }) {
  const [doctor, setDoctor] = useState(null);
  const [hospital, setHospital] = useState(null);
  const doctorId = getPropValue(patient, 'doctor.id');
  const hospitalId = getPropValue(patient, 'Hospital.id');

  useEffect(() => {
    if (doctorId)
      getProfileByIdAction(doctorId).then(d => {
        setDoctor(d);
      });
  }, [doctorId]);

  useEffect(() => {
    if (hospitalId)
      getHospitalByIdAction(hospitalId).then(h => {
        setHospital(h);
      });
  }, [hospitalId]);

  return (
    <>
      <Grid item xs={6} container spacing={3}>
        <DetailTextComponent
          disabledAlignContent
          label="Nombre doctor"
          value={getPropValue(doctor, 'fullname') || '-'}
        />
        {getPropValue(doctor, 'phoneVisible') === true && (
          <DetailTextComponent label="Teléfono doctor" value={getPropValue(doctor, 'phone') || '-'} />
        )}
        {getPropValue(doctor, 'emailVisible') === true && (
          <DetailTextComponent label="Correo doctor" value={getPropValue(doctor, 'user.email') || '-'} />
        )}
      </Grid>
      <Grid item xs={6} container spacing={3}>
        <DetailTextComponent label="Nombre hospital" value={getPropValue(hospital, 'name') || '-'} />
        <DetailTextComponent label="Teléfono hospital" value={getPropValue(hospital, 'phone') || '-'} />
        <DetailTextComponent label="Correo hospital" value={getPropValue(hospital, 'email') || '-'} />
        <DetailTextComponent label="Dirección hospital" value={getPropValue(hospital, 'address') || '-'} />
      </Grid>
    </>
  );
}

function DoctorHomeComponent({ doctor }) {
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(false);
  const hospitalId = getPropValue(doctor, 'Hospital.id');

  useEffect(() => {
    async function getById() {
      if (hospitalId) {
        setLoading(true);
        const result = await getHospitalByIdAction(hospitalId);
        setHospital(result);
        setLoading(false);
      }
    }
    getById();
  }, [hospitalId]);

  return (
    <>
      {!loading && (
        <Grid container item xs={6} spacing={3}>
          <DetailTextComponent label="Nombre hospital" value={getPropValue(hospital, 'name') || '-'} />
          <DetailTextComponent label="Teléfono hospital" value={getPropValue(hospital, 'phone') || '-'} />
          <DetailTextComponent label="Correo hospital" value={getPropValue(hospital, 'email') || '-'} />
          <DetailTextComponent label="Dirección hospital" value={getPropValue(hospital, 'address') || '-'} />
        </Grid>
      )}
    </>
  );
}

function HomeInfoComponent() {
  const { currentUserProfile, isDoctor, isPatient } = useAuthContext();
  return (
    <Grid container spacing={3} component={Container} maxWidth="lg">
      {isPatient && <PatientHomeComponent patient={currentUserProfile} />}
      {isDoctor && <DoctorHomeComponent doctor={currentUserProfile} />}
    </Grid>
  );
}

export default HomeInfoComponent;

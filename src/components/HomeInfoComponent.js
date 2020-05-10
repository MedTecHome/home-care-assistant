import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useAuthContext } from '../contexts/AuthContext';
import { getPropValue } from '../helpers/utils';
import { getHospitalByIdAction } from './hospital/reducers/HospitalActions';
import DetailTextComponent from './DetailTextComponent';
import { getProfileByIdAction } from './profiles/reducers/ProfileActions';

function PatientHomeComponent({ doctorId }) {
  const [doctor, setDoctor] = useState();
  const [hospital, setHospital] = useState();

  useEffect(() => {
    async function getById() {
      const d = await getProfileByIdAction(doctorId);
      setDoctor(d);
      const h = await getHospitalByIdAction(d.hospital.id);
      setHospital(h);
    }
    getById();
  }, [doctorId]);
  useEffect(() => {}, [doctor]);

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

function DoctorHomeComponent({ hospitalId }) {
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(false);

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
  const { currentUserProfile } = useAuthContext();
  return (
    <Grid container spacing={3} component={Container} maxWidth="lg">
      {getPropValue(currentUserProfile, 'role.id') === 'patient' && (
        <PatientHomeComponent doctorId={getPropValue(currentUserProfile, 'doctor.id')} />
      )}
      {getPropValue(currentUserProfile, 'role.id') === 'doctor' && (
        <DoctorHomeComponent hospitalId={getPropValue(currentUserProfile, 'hospital.id')} />
      )}
    </Grid>
  );
}

export default HomeInfoComponent;

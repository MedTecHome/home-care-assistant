import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useAuthContext } from '../contexts/AuthContext';
import { getPropValue } from '../helpers/utils';
import { getHospitalByIdAction } from './Hospital/reducers/HospitalActions';
import { getProfileByIdAction } from './Profiles/reducers/ProfileActions';
import useCustomStyles from '../jss/globalStyles';

function PaperDetailComponent({ title, children }) {
  const classes = useCustomStyles();
  return (
    <Paper variant="outlined" className={classes.paperDetails}>
      <List>
        <ListItem divider>
          <ListItemText primary={<Typography variant="h5">{title}</Typography>} />
        </ListItem>
        {children}
        <ListItem />
      </List>
    </Paper>
  );
}

function PaperHospitalInfoComponent({ hospital }) {
  const classes = useCustomStyles();
  return (
    <PaperDetailComponent title="Hospital">
      <ListItem divider>
        <ListItemText
          primary={
            <Typography className={classes.textLabel} variant="subtitle1">
              Nombre hospital
            </Typography>
          }
        />
        <ListItemText primary={getPropValue(hospital, 'name') || '-'} />
      </ListItem>
      <ListItem divider>
        <ListItemText
          primary={
            <Typography className={classes.textLabel} variant="subtitle1">
              Teléfono hospital
            </Typography>
          }
        />
        <ListItemText primary={getPropValue(hospital, 'phone') || '-'} />
      </ListItem>
      <ListItem divider>
        <ListItemText
          primary={
            <Typography className={classes.textLabel} variant="subtitle1">
              Correo hospital
            </Typography>
          }
        />
        <ListItemText primary={getPropValue(hospital, 'email') || '-'} />
      </ListItem>
      <ListItem divider>
        <ListItemText
          primary={
            <Typography className={classes.textLabel} variant="subtitle1">
              Dirección hospital
            </Typography>
          }
        />
        <ListItemText primary={getPropValue(hospital, 'address') || '-'} />
      </ListItem>
    </PaperDetailComponent>
  );
}

function PatientHomeComponent({ patient }) {
  const [doctor, setDoctor] = useState(null);
  const [hospital, setHospital] = useState(null);
  const doctorId = getPropValue(patient, 'doctor.id');
  const hospitalId = getPropValue(patient, 'hospital.id');
  const classes = useCustomStyles();

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
      <Grid item xs={12} sm={6}>
        <PaperHospitalInfoComponent hospital={hospital} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PaperDetailComponent title="Doctor">
          <ListItem divider>
            <ListItemText
              primary={
                <Typography className={classes.textLabel} variant="subtitle1">
                  Nombre doctor
                </Typography>
              }
            />
            <ListItemText primary={getPropValue(doctor, 'fullname') || '-'} />
          </ListItem>
          <ListItem divider>
            <ListItemText
              primary={
                <Typography className={classes.textLabel} variant="subtitle1">
                  Teléfono doctor
                </Typography>
              }
            />
            <ListItemText
              primary={(getPropValue(doctor, 'phoneVisible') === true && getPropValue(doctor, 'phone')) || '-'}
            />
          </ListItem>
          <ListItem divider>
            <ListItemText
              primary={
                <Typography className={classes.textLabel} variant="subtitle1">
                  Correo doctor
                </Typography>
              }
            />
            <ListItemText
              primary={(getPropValue(doctor, 'emailVisible') === true && getPropValue(doctor, 'user.email')) || '-'}
            />
          </ListItem>
        </PaperDetailComponent>
      </Grid>
    </>
  );
}

function DoctorHomeComponent({ doctor }) {
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(false);
  const hospitalId = getPropValue(doctor, 'hospital.id');

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
        <Grid item xs={12} sm={6}>
          <PaperHospitalInfoComponent hospital={hospital} />
        </Grid>
      )}
    </>
  );
}

function HomeInfoComponent() {
  const { currentUserProfile, isDoctor, isPatient } = useAuthContext();
  return (
    <>
      <Grid container spacing={3}>
        {isPatient && <PatientHomeComponent patient={currentUserProfile} />}
        {isDoctor && <DoctorHomeComponent doctor={currentUserProfile} />}
      </Grid>
    </>
  );
}

export default HomeInfoComponent;

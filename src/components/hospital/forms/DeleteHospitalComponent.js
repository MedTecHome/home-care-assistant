import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { HospitalContext } from '../../../contexts/HospitalContext';

const useStyles = makeStyles(theme => ({
  buttonActions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

export default function DeleteHospitalComponent() {
  const {
    hospitalFormType,
    hospitalsSelected,
    saveHospitalValues,
    setHospitalModalVisible,
    fetchHospitals,
  } = useContext(HospitalContext);
  const classes = useStyles();

  useEffect(() => {
    return () => {
      fetchHospitals({});
    };
  }, []);

  const handleCancel = () => {
    setHospitalModalVisible(false, null);
  };

  const onDelete = () => {
    saveHospitalValues({ id: hospitalsSelected }, hospitalFormType);
    handleCancel();
  };

  return (
    <div>
      <h3>Eliminar Hopital</h3>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography>
            {`Esta seguro que desea eliminar ${hospitalsSelected.length > 1 ? 'los' : 'el'} elemento${
              hospitalsSelected.length > 1 ? 's' : ''
            } seleccionado${hospitalsSelected.length > 1 ? 's' : ''}`}
          </Typography>
        </Grid>
        <Grid item className={classes.buttonActions} xs={12}>
          <Button variant="contained" size="small" onClick={handleCancel}>
            cancelar
          </Button>
          <Button size="small" variant="contained" color="secondary" onClick={onDelete}>
            eliminar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Image from 'material-ui-image';
import { makeStyles } from '@material-ui/core/styles';
import { useHospitalContext } from '../HospitalContext';
import { DialogTitleComponent } from '../../ModalComponent';

const useStyles = makeStyles({
  textStyle: {
    '&>*': {
      fontSize: 12,
      lineHeight: '200%',
      fontWeight: 400,
      color: '#000',
    },
  },
});

function DetailsHospitalComponent() {
  const { hospitalSelected, setModalVisible } = useHospitalContext();
  const classes = useStyles();

  const handleCloseForm = () => {
    setModalVisible(false, null);
  };
  return (
    <>
      <DialogTitleComponent onClose={handleCloseForm}>Detalles del hospital</DialogTitleComponent>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} container justify="center" alignItems="center">
            <Image src="#" aspectRatio={4 / 3} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.textStyle}>
            <Typography>
              Nombre: {hospitalSelected ? <strong>{hospitalSelected.name}</strong> : <CircularProgress />}
            </Typography>
            <Typography>Direccion: {hospitalSelected ? <strong>{hospitalSelected.address}</strong> : '?'}</Typography>
            <Typography>
              Telefono:
              {hospitalSelected ? <strong>{hospitalSelected.phone}</strong> : '?'}
            </Typography>
            <Typography>
              Limite de doctores:{' '}
              {hospitalSelected ? (
                <strong>{`${hospitalSelected.totalDoctors || 0} / ${hospitalSelected.maxDoctors}`}</strong>
              ) : (
                '?'
              )}
            </Typography>
            <Typography>
              Limite de pacientes:{' '}
              {hospitalSelected ? (
                <strong>{`${hospitalSelected.totalPatients || 0} / ${hospitalSelected.maxPatients}`}</strong>
              ) : (
                '?'
              )}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" disableElevation onClick={handleCloseForm}>
          aceptar
        </Button>
      </DialogActions>
    </>
  );
}
export default DetailsHospitalComponent;

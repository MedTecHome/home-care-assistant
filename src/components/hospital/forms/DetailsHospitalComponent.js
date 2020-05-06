import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Image from 'material-ui-image';
import { useHospitalContext } from '../HospitalContext';
import { DialogTitleComponent } from '../../ModalComponent';
import useCustomStyles from '../../../jss/globalStyles';

function DetailsHospitalComponent() {
  const { selected, setModalVisible } = useHospitalContext();
  const classes = useCustomStyles();

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
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.textDetailStyle}>
            <Typography>Nombre: {selected ? <strong>{selected.name}</strong> : '?'}</Typography>
            <Typography>Direccion: {selected ? <strong>{selected.address}</strong> : '?'}</Typography>
            <Typography>
              Telefono:
              {selected ? <strong>{selected.phone}</strong> : '?'}
            </Typography>
            <Typography>
              Limite de doctores:{' '}
              {selected ? <strong>{`${selected.totalDoctors || 0} / ${selected.maxDoctors}`}</strong> : '?'}
            </Typography>
            <Typography>
              Limite de pacientes:{' '}
              {selected ? <strong>{`${selected.totalPatients || 0} / ${selected.maxPatients}`}</strong> : '?'}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleCloseForm} size="small">
          aceptar
        </Button>
      </DialogActions>
    </>
  );
}
export default DetailsHospitalComponent;

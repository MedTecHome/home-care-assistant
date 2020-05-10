import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Image from 'material-ui-image';
import { useMedicinesContext } from '../MedicinesContext';
import { DialogTitleComponent } from '../../ModalComponent';
import useCustomStyles from '../../../jss/globalStyles';
import { getPropValue } from '../../../helpers/utils';

function DetailsMedicineComponent() {
  const { selected, setModalVisible } = useMedicinesContext();
  const classes = useCustomStyles();

  const handleCloseForm = () => {
    setModalVisible(false, null);
  };
  return (
    <>
      <DialogTitleComponent onClose={handleCloseForm}>Detalles del medicamento</DialogTitleComponent>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} container justify="center" alignItems="center">
            <Image src="#" aspectRatio={4 / 3} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.textDetailStyle}>
            <Typography>
              {`Nombre: `}
              <strong>{getPropValue(selected, 'name') || '?'}</strong>
            </Typography>
            <Typography>
              {`Cantidad Concentracion: `}
              <strong>{getPropValue(selected, 'oncentrationCant') || '?'}</strong>
            </Typography>
            <Typography>
              {`Tipo Concentracion: `}
              <strong>{getPropValue(selected, 'concentrationType.name') || '?'}</strong>
            </Typography>
            <Typography>
              {`Dosis: `}
              <strong>{getPropValue(selected, 'dose') || '?'}</strong>
            </Typography>
            <Typography>
              {`Tipo dosis: `}
              <strong>{getPropValue(selected, 'doseType.name') || '?'}</strong>
            </Typography>
            <Typography>
              {`Via administracion: `}
              <strong>{getPropValue(selected, 'administrationType.name') || '?'}</strong>
            </Typography>
            <Typography>
              {`Motivo administracion: `}
              <strong>{getPropValue(selected, 'administrationReason') || '?'}</strong>
            </Typography>
            <Typography>
              {`Frecuencia: `}
              <strong>{getPropValue(selected, 'frequency') || '?'}</strong>
            </Typography>
            <Typography>
              {`Observaciones: `}
              <strong>{getPropValue(selected, 'observations') || '?'}</strong>
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
export default DetailsMedicineComponent;

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

export function DetailsContentMedicineComponent({ data, classes }) {
  return (
    <Grid item xs={12} className={classes.contentDetail}>
      <Typography component="div">
        <strong>{`Nombre: `}</strong>
        {getPropValue(data, 'name') || '?'}
      </Typography>
      <Typography component="div">
        <strong>{`Cantidad Concentración: `}</strong>
        {getPropValue(data, 'oncentrationCant') || '?'}
      </Typography>
      <Typography component="div">
        <strong>{`Tipo Concentración: `}</strong>
        {getPropValue(data, 'concentrationType.name') || '?'}
      </Typography>
      <Typography component="div">
        <strong>{`Dosis: `}</strong>
        {getPropValue(data, 'dose') || '?'}
      </Typography>
      <Typography component="div">
        <strong>{`Tipo dosis: `}</strong>
        {getPropValue(data, 'doseType.name') || '?'}
      </Typography>
      <Typography component="div">
        <strong> {`Via Administración: `}</strong>
        {getPropValue(data, 'administrationType.name') || '?'}
      </Typography>
      <Typography component="div">
        <strong> {`Motivo Administración: `}</strong>
        {getPropValue(data, 'administrationReason') || '?'}
      </Typography>
      <Typography component="div">
        <strong>{`Frecuencia: `}</strong>
        {getPropValue(data, 'frequency') || '?'}
      </Typography>
      <Typography component="div">
        <strong> {`Observaciones: `}</strong>
        {getPropValue(data, 'observations') || '?'}
      </Typography>
    </Grid>
  );
}

function DetailsMedicineComponent() {
  const { selected, setModalVisible } = useMedicinesContext();
  const classes = useCustomStyles();

  const handleCloseForm = () => {
    setModalVisible(false, null);
  };
  return (
    <>
      <DialogTitleComponent onClose={handleCloseForm}>Detalles del medicamento</DialogTitleComponent>
      <DialogContent
        dividers
        style={{
          maxWidth: 400
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} container justify="center" alignItems="center">
            <Image src="#" aspectRatio={4 / 3} />
          </Grid>
          <DetailsContentMedicineComponent classes={classes} data={selected} />
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

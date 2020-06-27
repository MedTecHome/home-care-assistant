import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { DialogTitleComponent } from '../../ModalComponent';
import useCustomStyles from '../../../jss/globalStyles';
import { getPropValue } from '../../../helpers/utils';
import GenericAsyncNomenclator from '../../text/AsyncNomenclatorText';

export function DetailsContentMedicineComponent({ data, classes }) {
  return (
    <Grid item xs={12} className={classes.contentDetail}>
      <Typography component="div">
        <strong>{`Nombre: `}</strong>
        {getPropValue(data, 'name') || '-'}
      </Typography>
      <Typography component="div">
        <strong>{`Concentración: `}</strong>
        {`${getPropValue(data, 'concentrationCant') || '-'}`}
        <GenericAsyncNomenclator id={getPropValue(data, 'concentrationType')} nomenclator="concentrations" />
      </Typography>
      <Typography component="div">
        <strong>{`Dosis: `}</strong>
        {`${getPropValue(data, 'doseCant') || '-'}`}
        <GenericAsyncNomenclator id={getPropValue(data, 'doseType')} nomenclator="dosis" />
      </Typography>
      <Typography component="div">
        <strong>{`Frecuencia: `}</strong>
        {getPropValue(data, 'frequency') || '-'}
      </Typography>
      <Typography component="div">
        <strong> {`Vía Administración: `}</strong>
        <GenericAsyncNomenclator id={getPropValue(data, 'administrationType')} nomenclator="administrationroute" />
      </Typography>
      <Typography component="div">
        <strong> {`Motivo Administración: `}</strong>
        {getPropValue(data, 'administrationReason') || '-'}
      </Typography>
      <Typography component="div">
        <strong> {`Observaciones: `}</strong>
        {getPropValue(data, 'observations') || '-'}
      </Typography>
    </Grid>
  );
}

function DetailsMedicineComponent({ selected, setModalVisible }) {
  const classes = useCustomStyles();

  const handleCloseForm = () => {
    setModalVisible(false, null);
  };
  return (
    <>
      <DialogTitleComponent onClose={handleCloseForm}>Detalles del medicamento</DialogTitleComponent>
      <DialogContent dividers className={classes.contentDialog}>
        <DetailsContentMedicineComponent classes={classes} data={selected} />
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

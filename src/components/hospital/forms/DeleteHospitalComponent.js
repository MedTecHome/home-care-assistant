import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { useHospitalContext } from '../HospitalContext';
import { DialogTitleComponent } from '../../ModalComponent';

export default function DeleteHospitalComponent() {
  const { setModalVisible, hospitalSelected, saveHospitalValues, formType } = useHospitalContext();

  const handleCancel = () => {
    setModalVisible(false, null);
  };

  const onDelete = () => {
    saveHospitalValues(hospitalSelected, formType);
    handleCancel();
  };

  return (
    <>
      <DialogTitleComponent onClose={handleCancel}>Eliminar Hopital</DialogTitleComponent>
      <DialogContent dividers>
        <Typography>Esta seguro que desea eliminar el hospital seleccionado.</Typography>
      </DialogContent>
      <DialogActions>
        <Button disableElevation variant="contained" size="small" onClick={handleCancel}>
          cancelar
        </Button>
        <Button disableElevation size="small" variant="contained" color="secondary" onClick={onDelete}>
          eliminar
        </Button>
      </DialogActions>
    </>
  );
}

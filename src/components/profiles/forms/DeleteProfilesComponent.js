import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useProfilesContext } from '../ProfilesContext';
import { DialogTitleComponent } from '../../ModalComponent';

const useStyles = makeStyles({
  buttonActions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});

export default function DeleteProfilesComponent() {
  const { setModalVisible, profileSelected, saveProfileValues, formType } = useProfilesContext();
  const classes = useStyles();

  const handleCancel = () => {
    setModalVisible(false, null);
  };

  const onDelete = () => {
    saveProfileValues(profileSelected, formType);
    handleCancel();
  };

  return (
    <>
      <DialogTitleComponent onClose={handleCancel}>Eliminar</DialogTitleComponent>
      <DialogContent dividers>
        <Typography>Esta seguro que desea eliminar el perfile seleccionado.</Typography>
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

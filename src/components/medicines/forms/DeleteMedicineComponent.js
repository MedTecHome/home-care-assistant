import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DialogTitleComponent } from '../../ModalComponent';
import { useMedicinesContext } from '../MedicinesContext';

const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

function DeleteMedicineComponent() {
  const { setModalVisible, selected, saveMedicineValues, formType } = useMedicinesContext();
  const [saving, setSaving] = useState(false);
  const classes = useStyles();

  const handleCancel = () => {
    setModalVisible(false, null);
  };

  const onDelete = async () => {
    setSaving(true);
    await saveMedicineValues(selected, formType);
    setSaving(false);
    handleCancel();
  };

  return (
    <>
      <DialogTitleComponent onClose={handleCancel}>Eliminar medicamento</DialogTitleComponent>
      <DialogContent dividers>
        <Typography>
          Esta seguro que desea eliminar el medicamento:<strong> {selected.name}</strong>.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button disableElevation variant="contained" size="small" onClick={handleCancel}>
          cancelar
        </Button>
        <div className={classes.wrapper}>
          <Button
            disabled={saving}
            disableElevation
            size="small"
            variant="contained"
            color="secondary"
            onClick={onDelete}
          >
            eliminar
          </Button>
          {saving && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </DialogActions>
    </>
  );
}
export default DeleteMedicineComponent;

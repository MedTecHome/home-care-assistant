import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DialogTitleComponent } from '../../ModalComponent';
import { useTreatmentsContext } from '../TreatmentsContext';
import useCustomStyles from '../../../jss/globalStyles';

function DeleteTreatmentComponent() {
  const { setModalVisible, selected, saveValues, formType } = useTreatmentsContext();
  const [saving, setSaving] = useState(false);
  const classes = useCustomStyles();

  const handleCancel = () => {
    setModalVisible(false, null);
  };

  const onDelete = async () => {
    setSaving(true);
    await saveValues(selected, formType);
    setSaving(false);
    handleCancel();
  };

  return (
    <>
      <DialogTitleComponent onClose={handleCancel}>Eliminar Tratamiento</DialogTitleComponent>
      <DialogContent dividers>
        <Typography>Esta seguro que desea eliminar el tratamiento.</Typography>
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
export default DeleteTreatmentComponent;

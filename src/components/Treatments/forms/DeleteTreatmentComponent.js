import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { DialogTitleComponent } from '../../ModalComponent';
import { useTreatmentsContext } from '../TreatmentsContext';
import SaveButton from '../../buttons/SaveButton';
import { useMessageContext } from '../../../MessageHandle/MessageContext';
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../../commons/globalText';

const useStyles = makeStyles({
  contentStyle: {
    maxWidth: 400
  }
});

function DeleteTreatmentComponent() {
  const { RegisterMessage } = useMessageContext();
  const { setModalVisible, selected, saveValues, formType } = useTreatmentsContext();
  const [saving, setSaving] = useState(false);
  const classes = useStyles();

  const handleCancel = () => {
    setModalVisible(false, null);
  };

  const onDelete = async () => {
    const itemToDelete = selected;
    setSaving(true);
    try {
      await saveValues(itemToDelete, formType);
      RegisterMessage(SUCCESS_MESSAGE, 'Tratamiento eliminado.', `Treatment-delete-${formType}`);
      setModalVisible(false, null);
    } catch (e) {
      RegisterMessage(ERROR_MESSAGE, e, `Treatment-delete-${formType}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <DialogTitleComponent onClose={handleCancel}>Eliminar Tratamiento</DialogTitleComponent>
      <DialogContent dividers className={classes.contentStyle}>
        <Typography>Esta seguro que desea eliminar el tratamiento.</Typography>
      </DialogContent>
      <DialogActions>
        <Button disableElevation variant="contained" size="small" onClick={handleCancel}>
          cancelar
        </Button>
        <SaveButton
          onClick={onDelete}
          size="small"
          color="secondary"
          pristine={false}
          submitting={saving}
          invalid={false}
          title="eliminar"
        />
      </DialogActions>
    </>
  );
}
export default DeleteTreatmentComponent;

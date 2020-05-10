import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { DialogTitleComponent } from '../../ModalComponent';
import { useTreatmentsContext } from '../TreatmentsContext';
import SaveButton from '../../buttons/SaveButton';
import { CANCEL_FORM_TEXT } from '../../../commons/globalText';

function DeleteTreatmentComponent() {
  const { setModalVisible, selected, saveValues, formType } = useTreatmentsContext();
  const [saving, setSaving] = useState(false);

  const handleCancel = () => {
    setModalVisible(false, CANCEL_FORM_TEXT);
  };

  const onDelete = async () => {
    setSaving(true);
    await saveValues({ ...selected, patient: selected.patient.id, medicine: selected.medicine.id }, formType);
    setSaving(false);
    setModalVisible(false, null);
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

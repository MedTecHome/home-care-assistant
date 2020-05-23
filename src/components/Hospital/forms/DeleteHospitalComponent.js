import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { useHospitalContext } from '../HospitalContext';
import { DialogTitleComponent } from '../../ModalComponent';
import SaveButton from '../../buttons/SaveButton';
import { CANCEL_FORM_TEXT } from '../../../commons/globalText';

export default function DeleteHospitalComponent() {
  const { setModalVisible, selected, saveHospitalValues, formType } = useHospitalContext();
  const [saving, setSaving] = useState(false);

  const handleCancel = () => {
    setModalVisible(false, CANCEL_FORM_TEXT);
  };

  const onDelete = async () => {
    const itemToDelete = selected;
    setSaving(true);
    await saveHospitalValues(itemToDelete, formType);
    setSaving(false);
    setModalVisible(false, null);
  };

  return (
    <>
      <DialogTitleComponent onClose={handleCancel}>Eliminar Hopital</DialogTitleComponent>
      <DialogContent
        dividers
        style={{
          maxWidth: 400
        }}
      >
        <Typography>Esta seguro que desea eliminar el hospital seleccionado.</Typography>
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

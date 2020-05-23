import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { DialogTitleComponent } from '../../ModalComponent';
import { useMedicinesContext } from '../MedicinesContext';
import SaveButton from '../../buttons/SaveButton';
import { CANCEL_FORM_TEXT } from '../../../commons/globalText';

function DeleteMedicineComponent() {
  const { setModalVisible, selected, saveMedicineValues, formType } = useMedicinesContext();
  const [saving, setSaving] = useState(false);

  const handleCancel = () => {
    setModalVisible(false, CANCEL_FORM_TEXT);
  };

  const onDelete = async () => {
    const itemToDelete = selected;
    setSaving(true);
    await saveMedicineValues(itemToDelete, formType);
    setSaving(false);
    setModalVisible(false, null);
  };

  return (
    <>
      <DialogTitleComponent onClose={handleCancel}>Eliminar medicamento</DialogTitleComponent>
      <DialogContent
        dividers
        style={{
          maxWidth: 400
        }}
      >
        <Typography>
          Esta seguro que desea eliminar el medicamento:<strong> {selected.name}</strong>.
        </Typography>
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
export default DeleteMedicineComponent;

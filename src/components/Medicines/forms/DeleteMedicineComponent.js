import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { DialogTitleComponent } from '../../ModalComponent';
import SaveButton from '../../buttons/SaveButton';
import useCustomStyles from '../../../jss/globalStyles';
import { useMessageContext } from '../../../MessageHandle/MessageContext';
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../../commons/globalText';

function DeleteMedicineComponent({ setModalVisible, selected, saveMedicineValues, formType }) {
  const { RegisterMessage } = useMessageContext();
  const [saving, setSaving] = useState(false);
  const classes = useCustomStyles();

  const handleCancel = () => {
    setModalVisible(false, null);
  };

  const onDelete = async () => {
    const itemToDelete = selected;
    setSaving(true);
    try {
      await saveMedicineValues(itemToDelete, formType);
      RegisterMessage(SUCCESS_MESSAGE, 'Medicamento eliminado.', `Medicine-delete-${formType}`);
      setModalVisible(false, null);
    } catch (e) {
      RegisterMessage(ERROR_MESSAGE, e, `Medicine-delete-${formType}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <DialogTitleComponent onClose={handleCancel}>Eliminar medicamento</DialogTitleComponent>
      <DialogContent dividers className={classes.contentDialog}>
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

import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useProfilesContext } from '../ProfilesContext';
import { DialogTitleComponent } from '../../ModalComponent';
import SaveButton from '../../buttons/SaveButton';
import useCustomStyles from '../../../jss/globalStyles';
import { useMessageContext } from '../../../MessageHandle/MessageContext';
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../../commons/globalText';

export default function DeleteProfilesComponent() {
  const { RegisterMessage } = useMessageContext();
  const [saving, setSaving] = useState(false);
  const { setModalVisible, selected, saveProfileValues, formType } = useProfilesContext();
  const classes = useCustomStyles();

  const handleCancel = () => {
    setModalVisible(false, null);
  };

  const onDelete = async () => {
    const itemToDelete = selected;
    setSaving(true);
    try {
      await saveProfileValues(itemToDelete, formType);
      RegisterMessage(SUCCESS_MESSAGE, 'Perfil eliminado.', `Profile-delete-${formType}`);
      setModalVisible(false, null);
    } catch (e) {
      RegisterMessage(ERROR_MESSAGE, e, `Profile-delete-${formType}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <DialogTitleComponent onClose={handleCancel}>Eliminar</DialogTitleComponent>
      <DialogContent dividers className={classes.contentDialog}>
        <Typography>Esta seguro que desea eliminar el perfil seleccionado.</Typography>
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

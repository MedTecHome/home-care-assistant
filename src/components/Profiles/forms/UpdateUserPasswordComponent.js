import React from 'react';
import { Form } from 'react-final-form';
import { DialogContent, Grid, DialogActions, Button } from '@material-ui/core';
import { DialogTitleComponent } from '../../ModalComponent';
import CustomTextFieldComponent from '../../inputs/CustomTextFieldComponent';
import useCustomStyles from '../../../jss/globalStyles';
import SaveButton from '../../buttons/SaveButton';
import { useMessageContext } from '../../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../../commons/globalText';
import { validateEditUserPassword } from './validateProfile';

function UpdateUserPasswordComponent({ selected, setModalVisible, onEditUserPassword }) {
  const { RegisterMessage } = useMessageContext();
  const classes = useCustomStyles();

  const handleClose = () => {
    setModalVisible(false, null);
  };

  const onSubmit = async ({ password }, form) => {
    try {
      await onEditUserPassword({ password, id: selected.id });
      setTimeout(form.reset);
      handleClose();
    } catch (e) {
      RegisterMessage(ERROR_MESSAGE, e, 'UpdateUserPasswordComponent');
    }
  };
  return (
    <>
      <DialogTitleComponent onClose={handleClose}>Cambiar contraseña</DialogTitleComponent>
      <Form
        validate={validateEditUserPassword}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, invalid, submitting, pristine }) => (
          <DialogContent dividers className={classes.contentDialog}>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomTextFieldComponent type="password" name="password" label="Nueva Contraseña" />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextFieldComponent type="password" name="confirmPassword" label="Confirmar Nueva Contraseña" />
                </Grid>
              </Grid>
              <DialogActions>
                <Button disableElevation variant="contained" size="small" onClick={handleClose}>
                  cancelar
                </Button>
                <SaveButton size="small" pristine={pristine} submitting={submitting} invalid={invalid} />
              </DialogActions>
            </form>
          </DialogContent>
        )}
      />
    </>
  );
}

export default UpdateUserPasswordComponent;

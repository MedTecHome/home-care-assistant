import React, { useState, useEffect } from 'react';
import moment from 'moment';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useMediaQuery, makeStyles } from '@material-ui/core';
import { Form } from 'react-final-form';
import { DialogTitleComponent } from '../../ModalComponent';
import DateFieldComponent from '../../fields/DateFieldComponent';
import SaveButton from '../../buttons/SaveButton';
import ProfileFieldComponent from '../../fields/ProfileFieldComponent';
import MedicinesFieldComponent from '../../fields/MedicinesFieldComponent';
import { validateDoctor } from '../../Profiles/forms/validateProfile';
import { ADD_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import useCustomStyles from '../../../jss/globalStyles';
import CustomTextFieldComponent from '../../inputs/CustomTextFieldComponent';
import validateForm from './validateForm';
import EditButtonIcon from '../../buttons/EditButtonIcon';
import { medicineModel } from '../../Medicines/actions/MedicinesActions';
import { AddOrEditMedicineFormComponent } from '../../Medicines/forms/AddOrEditMedicineComponent';
import { getPropValue } from '../../../helpers/utils';
import { getMedicineById } from '../../../services/medicines';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f5f5f6',
    borderRadius: 4
  }
});

function AddOrEditMedicineForm({ selectedId, defaultValue, onSubmit, onFormCancel }) {
  const [selected, setSelected] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    getMedicineById(selectedId).then(result => {
      setSelected(result);
    });
  }, [selectedId, onSubmit]);

  const handleSubmit = values => {
    onSubmit(medicineModel(values));
  };

  console.log(selected);

  return (
    <div className={classes.root}>
      <AddOrEditMedicineFormComponent
        formType={EDIT_FORM_TEXT}
        selected={{ ...selected, ...defaultValue }}
        onSubmit={handleSubmit}
        handleCloseForm={onFormCancel}
      />
    </div>
  );
}

function AddOrEditFormComponent({ clinic, title, setModalVisible, selected, saveValues, formType, params }) {
  const [medicineSelected, setSelectedMedicine] = useState(null);
  const [medicineEdited, setMedicineEdited] = useState('{}');
  const classes = useCustomStyles();
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));

  useEffect(() => {
    if (getPropValue(selected, 'medicineSetting')) {
      setMedicineEdited(getPropValue(selected, 'medicineSetting'));
    }
  }, [selected]);

  const handleCloseModal = () => {
    setModalVisible(false, null);
  };

  const onSubmit = async (values, form) => {
    await saveValues({ ...values, medicineSetting: medicineEdited }, formType);
    setTimeout(form.reset);
    setModalVisible(false, null);
  };

  const changed = getPropValue(selected, 'medicineSetting') !== medicineEdited;
  return (
    <div>
      <DialogTitleComponent onClose={handleCloseModal}>{title}</DialogTitleComponent>
      <DialogContent
        dividers
        style={{
          maxWidth: medicineSelected && !match ? 780 : 400
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={medicineSelected ? 6 : 12}>
            <Form
              validate={validateForm}
              initialValues={{
                ...(formType === EDIT_FORM_TEXT &&
                  selected && {
                    ...selected,
                    startDate: moment.unix(selected.startDate),
                    endDate: moment.unix(selected.endDate)
                  }),
                ...(formType === ADD_FORM_TEXT && params && params.user && { user: params.user })
              }}
              onSubmit={onSubmit}
              render={({ handleSubmit, form, submitting, pristine, invalid, values }) => {
                return (
                  <form
                    noValidate
                    autoComplete="off"
                    onSubmit={event => {
                      if (!invalid) handleSubmit(event);
                    }}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <ProfileFieldComponent
                          required
                          disabled={!!form.getState().initialValues.user}
                          label="Paciente"
                          name="user"
                          filterRole="patient"
                          userRole="doctor"
                          classes={classes}
                          validate={validateDoctor}
                        />
                      </Grid>
                      <DateFieldComponent label="Fecha inicio" name="startDate" classes={classes} />
                      <DateFieldComponent
                        label="Fecha fin"
                        name="endDate"
                        classes={classes}
                        minDate={values.startDate}
                      />
                      <Grid item xs={10}>
                        <MedicinesFieldComponent required clinic={clinic} name="medicines" label="Medicamento" />
                      </Grid>
                      <Grid item xs={2}>
                        <EditButtonIcon
                          onClick={() => setSelectedMedicine(values.medicines)}
                          buttonColor={values.medicines ? 'primary' : 'default'}
                          disabled={!values.medicines}
                        />
                      </Grid>
                    </Grid>
                    <DialogActions>
                      <Button disableElevation variant="contained" onClick={handleCloseModal} size="small">
                        cancelar
                      </Button>
                      <SaveButton submitting={submitting} pristine={pristine && !changed} invalid={invalid} />
                    </DialogActions>
                  </form>
                );
              }}
            />
          </Grid>
          {!match && (
            <Grid item xs={12} sm={6}>
              {medicineSelected && (
                <AddOrEditMedicineForm
                  defaultValue={JSON.parse(medicineEdited)}
                  selectedId={medicineSelected}
                  onSubmit={values => setMedicineEdited(JSON.stringify(values))}
                  onFormCancel={() => setSelectedMedicine(null)}
                />
              )}
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </div>
  );
}
export default AddOrEditFormComponent;

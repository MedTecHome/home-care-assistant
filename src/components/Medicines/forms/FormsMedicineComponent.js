import React from 'react';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, DETAILS_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import AddOrEditMedicineComponent from './AddOrEditMedicineComponent';
import DeleteMedicineComponent from './DeleteMedicineComponent';
import DetailsMedicineComponent from './DetailsMedicineComponent';

function FormsMedicineComponent({ formType }) {
  return (
    <>
      {formType === ADD_FORM_TEXT && <AddOrEditMedicineComponent title="Adicionar medicamento" />}
      {formType === EDIT_FORM_TEXT && <AddOrEditMedicineComponent title="Editar medicamento" />}
      {formType === DELETE_FORM_TEXT && <DeleteMedicineComponent />}
      {formType === DETAILS_FORM_TEXT && <DetailsMedicineComponent />}
    </>
  );
}
export default FormsMedicineComponent;

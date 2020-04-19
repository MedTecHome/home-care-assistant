import React from 'react';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import DelPatiensComponent from './DelPatientsComponent';
import AddOrEditPatienstComponent from './AddOrEditPatienstComponent';

function PatientsFormComponent({ formType }) {
  return (
    <>
      {formType === ADD_FORM_TEXT && <AddOrEditPatienstComponent title="Adicionar" />}
      {formType === EDIT_FORM_TEXT && <AddOrEditPatienstComponent title="Editar" />}
      {formType === DELETE_FORM_TEXT && <DelPatiensComponent />}
    </>
  );
}

export default PatientsFormComponent;

import React, { useEffect } from 'react';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import DelPatiensComponent from './DelPatientsComponent';
import AddOrEditPatientsComponent from './AddOrEditPatientsComponent';

function PatientsFormComponent({ formType, handleOnClose }) {
  useEffect(() => {
    return () => {
      handleOnClose();
    };
  }, [handleOnClose]);

  return (
    <>
      {formType === ADD_FORM_TEXT && <AddOrEditPatientsComponent title="Adicionar" />}
      {formType === EDIT_FORM_TEXT && <AddOrEditPatientsComponent title="Editar" />}
      {formType === DELETE_FORM_TEXT && <DelPatiensComponent />}
    </>
  );
}

export default PatientsFormComponent;

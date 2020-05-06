import React, { useEffect } from 'react';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, DETAILS_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import AddOrEditFormComponent from './AddOrEditFormComponent';
import DeleteTreatmentComponent from './DeleteTreatmentComponent';
import DetailsTreatmentComponent from './DetailsTreatmentComponent';

function TreatmentsFormComponent({ formType, onCloseForms }) {
  useEffect(() => {
    return () => {
      onCloseForms();
    };
  }, [onCloseForms]);
  return (
    <>
      {formType === ADD_FORM_TEXT && <AddOrEditFormComponent title="Adicionar tratamiento" />}
      {formType === EDIT_FORM_TEXT && <AddOrEditFormComponent title="Editar tratamiento" />}
      {formType === DELETE_FORM_TEXT && <DeleteTreatmentComponent />}
      {formType === DETAILS_FORM_TEXT && <DetailsTreatmentComponent />}
    </>
  );
}
export default TreatmentsFormComponent;

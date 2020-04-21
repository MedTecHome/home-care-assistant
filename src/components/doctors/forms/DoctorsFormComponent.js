import React, { useEffect } from 'react';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import DelDoctorComponent from './DelDoctorComponent';
import AddOrEditDoctorComponent from './AddOrEditDoctorComponent';

export default function DoctorsFormComponent({ formType, handleOnClose }) {
  useEffect(() => {
    return () => {
      handleOnClose();
    };
  }, [handleOnClose]);
  return (
    <>
      {formType === ADD_FORM_TEXT && <AddOrEditDoctorComponent title="Adicionar" />}
      {formType === EDIT_FORM_TEXT && <AddOrEditDoctorComponent title="Editar" />}
      {formType === DELETE_FORM_TEXT && <DelDoctorComponent />}
    </>
  );
}

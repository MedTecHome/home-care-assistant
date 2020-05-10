import React from 'react';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, DETAILS_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import AddOrEditHospitalComponent from './AddOrEditHospitalComponent';
import DeleteHospitalComponent from './DeleteHospitalComponent';
import DetailsHospitalComponent from './DetailsHospitalComponent';

function HospitalForms({ formType }) {
  return (
    <>
      {formType === ADD_FORM_TEXT && <AddOrEditHospitalComponent />}
      {formType === EDIT_FORM_TEXT && <AddOrEditHospitalComponent />}
      {formType === DELETE_FORM_TEXT && <DeleteHospitalComponent />}
      {formType === DETAILS_FORM_TEXT && <DetailsHospitalComponent />}
    </>
  );
}

export default HospitalForms;

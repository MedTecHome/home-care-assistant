import React, { useContext } from 'react';
import { HospitalContext } from '../../../contexts/HospitalContext';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, DETAILS_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import AddOrEditHospitalComponent from './AddOrEditHospitalComponent';

function HospitalForms() {
  const { hospitalFormType } = useContext(HospitalContext);
  return (
    <>
      {hospitalFormType === ADD_FORM_TEXT && <AddOrEditHospitalComponent />}
      {hospitalFormType === EDIT_FORM_TEXT && <AddOrEditHospitalComponent />}
      {hospitalFormType === DELETE_FORM_TEXT && <div>DELE</div>}
      {hospitalFormType === DETAILS_FORM_TEXT && <div>DETAILS</div>}
    </>
  );
}

export default HospitalForms;

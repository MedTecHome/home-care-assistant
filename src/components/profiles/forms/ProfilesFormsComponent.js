import React from 'react';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import AddOrEditProfilesComponent from './AddOrEditProfilesComponent';
import DeleteProfilesComponent from './DeleteProfilesComponent';

function ProfilesFormComponent({ formType }) {
  return (
    <>
      {formType === ADD_FORM_TEXT && <AddOrEditProfilesComponent title="Adicionar" />}
      {formType === EDIT_FORM_TEXT && <AddOrEditProfilesComponent title="Editar" />}
      {formType === DELETE_FORM_TEXT && <DeleteProfilesComponent />}
    </>
  );
}

export default ProfilesFormComponent;

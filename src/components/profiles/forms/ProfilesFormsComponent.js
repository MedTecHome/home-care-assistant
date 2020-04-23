import React, { useEffect } from 'react';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import AddOrEditProfilesComponent from './AddOrEditProfilesComponent';
import DeleteProfilesComponent from './DeleteProfilesComponent';

function ProfilesFormComponent({ formType, onFormsClosed }) {
  useEffect(() => {
    return () => {
      onFormsClosed();
    };
  }, []);

  console.log('renderin form ProfilesFormComponent');

  return (
    <>
      {formType === ADD_FORM_TEXT && <AddOrEditProfilesComponent />}
      {formType === EDIT_FORM_TEXT && <AddOrEditProfilesComponent />}
      {formType === DELETE_FORM_TEXT && <DeleteProfilesComponent />}
    </>
  );
}

export default ProfilesFormComponent;

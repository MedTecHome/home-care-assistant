import React from 'react';
import { usePatientsContext, withPatientsContextProvider } from '../../../contexts/PatientsContext';
import { ADD_FORM_TEXT } from '../../../commons/globalText';
import FormPatientsComponent from './FormPatienstComponent';

function AddPatiensComponent({ history }) {
  const { savePatientsData } = usePatientsContext();

  const handleSubmit = values => {
    savePatientsData(values, ADD_FORM_TEXT);
  };

  const handleCancel = () => {
    history.push('/patients');
  };

  return <FormPatientsComponent formType={ADD_FORM_TEXT} onSubmit={handleSubmit} onCancel={handleCancel} />;
}

export default withPatientsContextProvider(AddPatiensComponent);

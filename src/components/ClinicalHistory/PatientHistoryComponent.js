import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useMediaQuery } from '@material-ui/core';
import { usePatientHistoryContext, withPatientHistoryContext } from './PatientHistoryContext';
import ListPatientHistoryComponent from './ListPatientHistoryComponent';
import FiltersPatientHistoryComponent from './FiltersPatientHistoryComponent';
import ModalComponent from '../ModalComponent';
import DetailHistoryMedicalFormComponent from './DetailHistoryMedicalFormComponent';
import FilterPatientHistoryGraficsComponent from './FilterPatientHistoryGraficsComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { withCustomPaginationContext, useCustomPaginationContext } from '../pagination/PaginationContext';
import { getPropValue } from '../../helpers/utils';

function PatientHistoryComponent({ patient }) {
  const { resetPagination } = useCustomPaginationContext();
  const { modalVisible, params, setParams } = usePatientHistoryContext();
  const { isDoctor } = useAuthContext();
  const match = useMediaQuery(theme => theme.breakpoints.down('sm'));

  useEffect(() => {
    setParams({ 'user.id': getPropValue(patient, 'id') || null });
  }, [patient, setParams]);

  const handleSelectDate = date => {
    setParams({ ...params, clinicalDate: date });
    resetPagination();
  };

  const handleSelectType = type => {
    setParams({ ...params, type });
    resetPagination();
  };

  return (
    <>
      <ModalComponent visible={modalVisible}>
        <DetailHistoryMedicalFormComponent />
      </ModalComponent>
      <Grid container>
        <Grid item xs={11} sm={isDoctor ? 11 : 12} md={isDoctor ? 5 : 12}>
          <FiltersPatientHistoryComponent onSelectDate={handleSelectDate} onSelectType={handleSelectType} />
          <ListPatientHistoryComponent />
        </Grid>
        {isDoctor && !match && (
          <Grid item xs={12} sm={7} container>
            <FilterPatientHistoryGraficsComponent />
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default withCustomPaginationContext(withPatientHistoryContext(PatientHistoryComponent));

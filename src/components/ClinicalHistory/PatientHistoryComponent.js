import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useMediaQuery } from '@material-ui/core';
import { usePatientHistoryContext } from './PatientHistoryContext';
import ListPatientHistoryComponent from './ListPatientHistoryComponent';
import FiltersPatientHistoryComponent from './FiltersPatientHistoryComponent';
import ModalComponent from '../ModalComponent';
import DetailHistoryMedicalFormComponent from './DetailHistoryMedicalFormComponent';
import FilterPatientHistoryGraficsComponent from './FilterPatientHistoryGraficsComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { withCustomPaginationContext, useCustomPaginationContext } from '../pagination/PaginationContext';
import PaginationComponent from '../pagination/PaginationComponent';

function PatientHistoryComponent() {
  const { pageSize, offset } = useCustomPaginationContext();
  const { setParams, modalVisible, total } = usePatientHistoryContext();
  const { isDoctor } = useAuthContext();
  const match = useMediaQuery(theme => theme.breakpoints.down('sm'));

  useEffect(() => {
    setParams({});
  }, [setParams, pageSize, offset]);

  return (
    <>
      <ModalComponent visible={modalVisible}>
        <DetailHistoryMedicalFormComponent />
      </ModalComponent>
      <Grid container>
        <Grid item xs={11} sm={isDoctor ? 11 : 12} md={isDoctor ? 5 : 12}>
          <FiltersPatientHistoryComponent />
          <ListPatientHistoryComponent />
          <PaginationComponent total={total} />
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

export default withCustomPaginationContext(PatientHistoryComponent);

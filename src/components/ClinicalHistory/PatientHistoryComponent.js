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
import { withCustomPaginationContext } from '../pagination/PaginationContext';
import { getPropValue } from '../../helpers/utils';

function PatientHistoryComponent({ patient, defaultTest }) {
  const {
    historyList,
    loadingList,
    modalVisible,
    params,
    setParams,
    setModalVisible,
    selectMedicalForm,
    selected,
    total,
    resetPagination
  } = usePatientHistoryContext();

  const { isDoctor } = useAuthContext();
  const match = useMediaQuery(theme => theme.breakpoints.down('sm'));

  useEffect(() => {
    setParams({ user: getPropValue(patient, 'id') || null, type: defaultTest });
  }, [patient, defaultTest, setParams]);

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
          <FiltersPatientHistoryComponent
            defaultType={defaultTest}
            onSelectDate={handleSelectDate}
            onSelectType={handleSelectType}
          />
          <ListPatientHistoryComponent
            defaultType={params.type}
            historyList={historyList}
            loadingList={loadingList}
            selectMedicalForm={selectMedicalForm}
            selected={selected}
            setModalVisible={setModalVisible}
            total={total}
          />
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

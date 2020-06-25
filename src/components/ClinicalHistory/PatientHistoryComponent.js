import React, { useEffect, useCallback } from 'react';
import { Paper, Divider } from '@material-ui/core';
import { usePatientHistoryContext, withPatientHistoryContext } from './PatientHistoryContext';
import ListPatientHistoryComponent from './ListPatientHistoryComponent';
import FiltersPatientHistoryComponent from './FiltersPatientHistoryComponent';
import ModalComponent from '../ModalComponent';
import DetailHistoryMedicalFormComponent from './DetailHistoryMedicalFormComponent';
import { withCustomPaginationContext, useCustomPaginationContext } from '../pagination/PaginationContext';
import { getPropValue } from '../../helpers/utils';
import ListPatientHistoryGraphicComponent from './ListPatientHistoryGraphicComponent';
import TitlePagesComponent from '../text/TitlePagesComponent';

function PatientHistoryComponent({ patient, fromDoctor, defaultTest }) {
  const { pageSize, page, resetPagination } = useCustomPaginationContext();
  const {
    historyList,
    loadingList,
    modalVisible,
    testFilter,
    rangeDate,
    setTestFilter,
    setRangeDate,
    setModalVisible,
    selectMedicalForm,
    selected,
    total,
    fetchList
  } = usePatientHistoryContext();

  useEffect(() => {
    const pS = fromDoctor || !['recently', undefined, ''].includes(testFilter) ? pageSize : 1;
    // const pS = !['recently', undefined, ''].includes(testFilter) ? pageSize : 1;
    fetchList(pS, page, getPropValue(patient, 'id'), rangeDate, testFilter);
  }, [fromDoctor, pageSize, page, patient, rangeDate, testFilter, fetchList]);

  useEffect(() => {
    setTestFilter(defaultTest);
  }, [defaultTest, setTestFilter]);

  const handleSelectDate = useCallback(
    values => {
      setRangeDate(values);
      resetPagination();
    },
    [setRangeDate, resetPagination]
  );

  const handleSelectType = type => {
    setTestFilter(type);
    resetPagination();
  };

  return (
    <>
      <ModalComponent visible={modalVisible}>
        <DetailHistoryMedicalFormComponent />
      </ModalComponent>
      {!fromDoctor ? <TitlePagesComponent text="Pruebas clínicas" /> : null}
      <Paper>
        <FiltersPatientHistoryComponent
          defaultType={defaultTest}
          onSelectDate={handleSelectDate}
          onSelectType={handleSelectType}
        />
        <Divider />
        {fromDoctor ? (
          <ListPatientHistoryGraphicComponent
            historyList={historyList}
            loadingList={loadingList}
            selectMedicalForm={selectMedicalForm}
            selected={selected}
            setModalVisible={setModalVisible}
          />
        ) : (
          <ListPatientHistoryComponent
            defaultType={testFilter}
            historyList={historyList}
            loadingList={loadingList}
            selectMedicalForm={selectMedicalForm}
            selected={selected}
            setModalVisible={setModalVisible}
            total={total}
          />
        )}
      </Paper>
    </>
  );
}

export default withCustomPaginationContext(withPatientHistoryContext(PatientHistoryComponent));

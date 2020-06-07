import React, { useEffect, useCallback } from 'react';
import { usePatientHistoryContext, withPatientHistoryContext } from './PatientHistoryContext';
import ListPatientHistoryComponent from './ListPatientHistoryComponent';
import FiltersPatientHistoryComponent from './FiltersPatientHistoryComponent';
import ModalComponent from '../ModalComponent';
import DetailHistoryMedicalFormComponent from './DetailHistoryMedicalFormComponent';
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

  useEffect(() => {
    setParams({ user: getPropValue(patient, 'id') || null, type: defaultTest });
  }, [patient, defaultTest, setParams]);

  const handleSelectDate = useCallback(
    values => {
      if (!params.rangeDate || (params.rangeDate[0] !== values[0] && params.rangeDate[1] !== values[1])) {
        setParams({ ...params, rangeDate: values });
        resetPagination();
      }
    },
    [params, setParams, resetPagination]
  );

  const handleSelectType = type => {
    setParams({ ...params, type });
    resetPagination();
  };

  return (
    <>
      <ModalComponent visible={modalVisible}>
        <DetailHistoryMedicalFormComponent />
      </ModalComponent>
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
    </>
  );
}

export default withCustomPaginationContext(withPatientHistoryContext(PatientHistoryComponent));

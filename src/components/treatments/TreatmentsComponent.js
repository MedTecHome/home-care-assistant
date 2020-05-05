import React, { useCallback, useEffect } from 'react';
import uuid from 'uuid4';
import { useTreatmentsContext, withTreatmentsContext } from './TreatmentsContext';
import TableComponent from '../table/TableComponent';
import treatmentsHeadCells from './treatmentsHeadCells';
import ModalComponent from '../ModalComponent';
import TreatmentsFormComponent from './forms/TreatmentsFormComponent';
import RowListTreatmentsComponent from './RowListTreatmentsComponent';

function TreatmentsComponent() {
  const {
    listTreatments,
    modalVisible,
    getListOfTreatments,
    loadingList,
    selected,
    setModalVisible,
    formType,
    selectFromList,
  } = useTreatmentsContext();

  const handleLoadList = useCallback(() => {
    getListOfTreatments({});
  }, [getListOfTreatments]);

  useEffect(() => {
    handleLoadList();
  }, [handleLoadList]);

  const handleModalVisible = fType => {
    setModalVisible(true, fType);
  };

  return (
    <>
      <ModalComponent visible={modalVisible}>
        <TreatmentsFormComponent formType={formType} onCloseForms={handleLoadList} />
      </ModalComponent>
      <TableComponent
        title="listado de tratamientos"
        headCells={treatmentsHeadCells}
        loadingList={loadingList}
        list={listTreatments}
        setModalVisible={setModalVisible}
        selected={selected}
        render={(row, index) => (
          <RowListTreatmentsComponent
            key={uuid()}
            row={row}
            index={index}
            selected={selected}
            selectRow={selectFromList}
            onModalVisible={handleModalVisible}
          />
        )}
      />
    </>
  );
}

export default withTreatmentsContext(TreatmentsComponent);

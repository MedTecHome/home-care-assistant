import React, { useCallback, useEffect } from 'react';
import uuid from 'uuid4';
import { useHospitalContext, withHospitalContext } from './HospitalContext';
import HospitalForms from './forms/HospitalForms';
import ModalComponent from '../ModalComponent';
import TableComponent from '../table/TableComponent';
import hospitalHeadCells from './hospitalHeadCells';
import RowTableHospitalComponent from './RowTableHospitalComponent';

function HospitalComponent() {
  const {
    hospitalSelected,
    listLoading,
    hospitals,
    modalVisible,
    setModalVisible,
    formType,
    getListHospitals,
    selectHospital,
  } = useHospitalContext();

  const handleReloadList = useCallback(() => {
    getListHospitals({});
  }, [getListHospitals]);

  useEffect(() => {
    handleReloadList();
  }, [handleReloadList]);

  const handleBackdrop = () => {
    setModalVisible(false, null);
  };

  const handleFormClose = useCallback(() => {
    handleReloadList();
    selectHospital(null);
  }, [handleReloadList, selectHospital]);

  const handleShowModal = fType => {
    setModalVisible(true, fType);
  };

  return (
    <>
      <ModalComponent visible={modalVisible} handleBackdropClick={handleBackdrop}>
        <HospitalForms formType={formType} onFormClose={handleFormClose} />
      </ModalComponent>
      <TableComponent
        filters={<></>}
        title="Lista de hospitales"
        selected={hospitalSelected}
        headCells={hospitalHeadCells}
        loadingList={listLoading}
        list={hospitals}
        setModalVisible={setModalVisible}
        render={(row, index) => (
          <RowTableHospitalComponent
            key={uuid()}
            row={row}
            index={index}
            selected={hospitalSelected}
            selectRow={selectHospital}
            onModalVisible={handleShowModal}
          />
        )}
      />
    </>
  );
}

export default withHospitalContext(HospitalComponent);

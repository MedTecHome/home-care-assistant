import React, { useCallback, useEffect } from 'react';
import uuid from 'uuid4';
import { useMediaQuery } from '@material-ui/core';
import { useHospitalContext, withHospitalContext } from './HospitalContext';
import HospitalForms from './forms/HospitalForms';
import ModalComponent from '../ModalComponent';
import TableComponent from '../table/TableComponent';
import hospitalHeadCells from './hospitalHeadCells';
import RowTableHospitalComponent from './RowTableHospitalComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { withCustomPaginationContext, useCustomPaginationContext } from '../pagination/PaginationContext';
import PaginationComponent from '../pagination/PaginationComponet';
import FiltersHospitalComponent from './FilterHospitalComponent';

function HospitalComponent() {
  const { offset, pageSize } = useCustomPaginationContext();
  const {
    selected,
    loadingList,
    hospitalsList,
    total,
    modalVisible,
    setModalVisible,
    formType,
    getListHospitals,
    selectHospital
  } = useHospitalContext();
  const { currentUserProfile } = useAuthContext();
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const cells = match ? [hospitalHeadCells[0]] : hospitalHeadCells;

  const handleReloadList = useCallback(() => {
    getListHospitals({ limit: pageSize, offset });
  }, [getListHospitals, offset, pageSize]);

  useEffect(() => {
    if (formType === null) handleReloadList();
  }, [formType, handleReloadList]);

  const handleFormClose = useCallback(() => {
    handleReloadList();
    selectHospital(null);
  }, [handleReloadList, selectHospital]);

  const handleShowModal = fType => {
    setModalVisible(true, fType);
  };

  return (
    <>
      <ModalComponent visible={modalVisible}>
        <HospitalForms formType={formType} onFormClose={handleFormClose} />
      </ModalComponent>
      <TableComponent
        filters={<FiltersHospitalComponent />}
        addRole={currentUserProfile && currentUserProfile.role.id === 'admin'}
        title="Lista de hospitales"
        selected={selected}
        headCells={cells}
        loadingList={loadingList}
        list={hospitalsList}
        setModalVisible={setModalVisible}
        render={(row, index) => (
          <RowTableHospitalComponent
            key={uuid()}
            cells={cells}
            row={row}
            index={index}
            selected={selected}
            selectRow={selectHospital}
            onModalVisible={handleShowModal}
          />
        )}
      />
      <PaginationComponent total={total} />
    </>
  );
}

export default withHospitalContext(withCustomPaginationContext(HospitalComponent));
